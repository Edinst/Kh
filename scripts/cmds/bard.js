const axios = require("axios");
const { getStreamFromURL } = global.utils;
const fs = require("fs");

module.exports = {
  config: {
    name: "bard",
    aliases: ["heygoogle", "bard"],
    version: "1.0",
    author: "SiAM | @Siam.The.Fox",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate AI response Bard support image reply",
    },
    longDescription: {
      en: "Generate AI response Bard support image reply",
    },
    category: "AI",
    guide: {
      en: "{pn} 'prompt' you reply with an image then that image will be an attachment in bard question",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply("Please provide a prompt. Usage: /bard 'prompt'");
      return;
    }

    const cookie = "cwh45-ORRxGijh1_bjdr_MXQ-prYlwMDwkt5rj_a-Y1LAeTlS6gySiHQw-k_Hco1-tAA6A."; // Jika tidak tahu cara mendapatkan cookie dari cookies editor, abaikan saja pengaturan cookie dengan parameter api (akan menggunakan cookie default saya), namun disarankan untuk menambahkan cookie Anda sendiri untuk mengurangi kesalahan.
    const key = "SiAMxPublic"; // Tambahkan kunci API Anda di sini (dapatkan dari SiAM)

    let params = {
      prompt: encodeURIComponent(prompt),
      cookie: encodeURIComponent(cookie), // Jika Anda menambahkan cookie, jangan mengkodek cookie. Sama persis dengan nilai " __Secure-1PSID " pada editor cookie.
      apiKey: encodeURIComponent(key),
      attImage: "",
    };

    if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
      params.attImage = encodeURIComponent(event.messageReply.attachments[0].url); // Memasukkan attImage (diperlukan agar tautan Facebook tidak menghasilkan kesalahan)
    }

    let balanceJson = {};
    try {
      const balanceData = fs.readFileSync("data/bal.json");
      balanceJson = JSON.parse(balanceData);
    } catch (error) {
      console.error("Error reading balance file:", error);
      message.reply("An error occurred while reading the balance file.");
      return;
    }

    const senderId = event.senderID || event.threadID; // Gunakan event.senderID jika tersedia, jika tidak gunakan message.threadID
    let balance = balanceJson[senderId?.toString()] || 0;

    let userBard = {};
    try {
      const userBardData = fs.readFileSync("data/userbard.json");
      userBard = JSON.parse(userBardData);
    } catch (error) {
      console.error("Bard is a paid command. You can use it by typing '/bard pay' followed by the number of free uses you want.", error);
      message.reply("Bard is a paid command. You can use it by typing '/buy cmd bard pay (count)' followed by the number of free uses you want.");
      return;
    }

    let count = userBard[senderId?.toString()]?.count || 0;

    if (args[0] === "pay") {
      const payAmount = parseInt(args[1] || 1);
      const deductBalance = payAmount * 100;

      if (balance < deductBalance) {
        message.reply("Your balance is not enough. Please check your balance.");
        return;
      }

      balance -= deductBalance;
      count += payAmount;

      balanceJson[senderId] = balance;
      fs.writeFileSync("data/bal.json", JSON.stringify(balanceJson));

      userBard[senderId] = { count: count };
      fs.writeFileSync("data/userbard.json", JSON.stringify(userBard));

      message.reply(`You have successfully used Bard ${payAmount} time(s). Your current balance is ${balance}.`);
      return;
    }

    if (count === 0) {
      message.reply("Bard is a paid command. You can use it by typing '/buy cmd bard pay (count)' followed by the number of free uses you want.");
      return;
    }

    try {
      const response = await axios.get("https://api.siambardproject.repl.co/getBard", { params });
      const result = response.data;

      let content = result.answer;
      let attachment = [];

      if (result.attachment && result.attachment.length > 0) {
        const noSpam = result.attachment.slice(0, 6);

        for (let url of noSpam) {
          try {
            const stream = await getStreamFromURL(url);
            if (stream) {
              attachment.push(stream);
            }
          } catch (error) {
            console.error(`error: ${url}`);
          }
        }
      }

      await message.reply({
        body: content,
        attachment: attachment,
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("An error occurred.");
    }
  },
};