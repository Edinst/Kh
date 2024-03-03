const https = require("https");

module.exports = {
  config: {
    name: "shenix",
    version: "1.0",
    author: "Riley Nelson",
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Perintah untuk berinteraksi dengan Shenix AI",
      en: "Command to interact with Shenix AI"
    },
    longDescription: {
      id: "Perintah ini mengirim pertanyaan atau kueri ke Shenix AI dan mengembalikan jawabannya.",
      en: "This command sends a question or query to Shenix AI and returns the answer."
    },
    category: "AI",
    guide: {
      id: "Penggunaan: !shenixai [pertanyaan atau kueri]",
      en: "Usage: !shenixai [question or query]"
    }
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    const userID = event.senderID;
    const userData = await usersData.get(userID);
    const name = userData.name;

    const response = args.join(" ");

    if (args.length === 0) {
      message.reply("Tuliskan pertanyaan atau kueri.");
      return;
    }

    const typingIndicator = api.sendTypingIndicator(event.threadID);

    try {
      const encodedResponse = encodeURIComponent(response);
      const options = {
        hostname: "volga.useless18.repl.co",
        path: `/shenixv1/${encodedResponse}?name=${encodeURIComponent(name)}`,
        method: "GET"
      };

      const res = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        });

        req.on("error", (error) => {
          reject(error);
        });

        req.end();
      });

      typingIndicator();

      const replyMessage = JSON.parse(res).reply;
      message.reply(replyMessage);
    } catch (error) {
      console.error(error);
      typingIndicator();
      message.reply("Terjadi kesalahan saat berinteraksi dengan Shenix AI.");
    }
  }
};