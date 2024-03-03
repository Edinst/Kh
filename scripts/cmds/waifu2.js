const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const fs = require('fs');
module.exports = {
  config: {
    name: "waifu",
    aliases: ["w"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "waifu games"
    },
    longDescription: {
      en: "Use /waifu pull to get a random waifu \n/waifu sell (waifuid)/all to sell a waifu \n/waifu info \n/waifu show (waifuid)"
    },
    category: "games",
    guide: {
      en: ""
    }
  },
  onStart: async function ({ api, event, usersData, args, message }) {
    try {
      const command = args[0];

      if (command === 'pull') {
        const uid = event.senderID;
        let userName;

        try {
          const profileInfo = await api.getUserInfo(uid);
          const userData = profileInfo[uid];
          userName = userData.name;
        } catch (error) {
          console.error('Error fetching profile info:', error);
          userName = 'Unknown User';
        }

        // Mengambil data waifu dari API
        const apiResponse = await axios.get('https://waifu-api.anjayalok21.repl.co');
        const waifuArray = apiResponse.data;

        // Calculate the total possibility based on each waifu's possibility
        let totalPossibility = 0;
        for (const waifuData of waifuArray) {
          totalPossibility += parseFloat(waifuData.possibility);
        }

        // Generate a random number within the total possibility
        const randomNumber = Math.random() * totalPossibility;

        let selectedWaifu;

        for (const waifuData of waifuArray) {
          totalPossibility -= parseFloat(waifuData.possibility);
          if (randomNumber >= totalPossibility) {
            selectedWaifu = waifuData;
            break;
          }
        }

        if (!selectedWaifu) {
          // If no waifu is selected, fallback to a random one
          selectedWaifu = waifuArray[Math.floor(Math.random() * waifuArray.length)];
        }

        const waifuName = selectedWaifu.waifuname;
        const img = selectedWaifu.link;
        const stars = selectedWaifu.stars;
        const price = selectedWaifu.price;
        const waifuid = selectedWaifu.waifuid;

        // Check if the user already has the same waifu
        const waifuJSON = fs.readFileSync('waifu.json', 'utf8');
        let waifuDataArray = JSON.parse(waifuJSON);

        for (const waifuData of waifuDataArray) {
          if (waifuData.uid === uid && waifuData.waifuName === waifuName) {
            // If the user has the same waifu, reduce their balance to 100
            const senderID = event.senderID;
            const userData = await usersData.get(senderID);
            if (userData.money >= 120) {
              usersData.set(senderID, {
                money: userData.money + 130, // Reduce the balance to 100
                data: userData.data
              });

              message.reply({
                body: `You already have ${waifuName}, ${userName}. Your balance back 250$`,
                attachment: await global.utils.getStreamFromURL(img)
              }, event.threadID);
            } else {
              message.reply("You need 250$ to buy a new waifu.", event.threadID);
            }
            return;
          }
        }

        // If the user doesn't have the same waifu, add it to their collection
        waifuDataArray.push({
          uid: uid,
          name: userName,
          waifuName: waifuName,
          stars: stars,
          link: img,
          price: price,
          waifuid: waifuid
        });
        fs.writeFileSync('waifu.json', JSON.stringify(waifuDataArray), 'utf8');

        // Deduct the cost of getting the waifu
        const senderID = event.senderID;
        const userData = await usersData.get(senderID);
        if (userData.money >= 250) {
          usersData.set(senderID, {
            money: userData.money - 250,
            data: userData.data
          });

          message.reply({
            body: `╔════ஜ۩۞۩ஜ═══╗

YOUR NAME: ${userName}
WAIFU NAME: ${waifuName}
WAIFU ID: ${waifuid}
STARS: ${stars}
PRICE: ${price}$

╚════ஜ۩۞۩ஜ═══╝`,
            attachment: await global.utils.getStreamFromURL(img)
          }, event.threadID);
        } else {
          message.reply("You need 250$ to buy a new waifu.", event.threadID);
        }
      } else if (command === 'sell') {
  const waifuid = args[1];

  if (waifuid.toLowerCase() === 'all') {
    // Sell all waifus
    const waifuDataArray = JSON.parse(fs.readFileSync('waifu.json', 'utf8'));
    const userWaifus = waifuDataArray.filter(waifu => waifu.uid === event.senderID);

    if (userWaifus.length === 0) {
      return message.reply("You don't own any waifus to sell.");
    }

    let totalEarnings = 0;

    for (const waifu of userWaifus) {
      totalEarnings += waifu.price * 1; // Multiply by the number of waifus being sold (1 in this case)
    }

    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    usersData.set(senderID, {
      money: userData.money + totalEarnings,
      data: userData.data
    });

    // Clear user's waifu collection
    const updatedWaifuDataArray = waifuDataArray.filter(waifu => waifu.uid !== event.senderID);
    fs.writeFileSync('waifu.json', JSON.stringify(updatedWaifuDataArray), 'utf8');

    return message.reply(`You sold all waifu and earned ${totalEarnings} money. Your balance is now ${userData.money + totalEarnings}.`);
  } else {
    // Sell a specific waifu
    const waifuJSON = fs.readFileSync('waifu.json', 'utf8');
    let waifuDataArray = JSON.parse(waifuJSON);

    const selectedWaifu = waifuDataArray.find(waifu => waifu.waifuid === waifuid && waifu.uid === event.senderID);

    if (!selectedWaifu) {
      return message.reply(`You don't own a waifu with the ID ${waifuid}!`);
    }

    const waifuPrice = parseInt(selectedWaifu.price);

    // Add money to user's balance
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    usersData.set(senderID, {
      money: userData.money + waifuPrice,
      data: userData.data
    });

    // Remove waifu from collection
    waifuDataArray = waifuDataArray.filter(waifu => waifu.waifuid !== waifuid || waifu.uid !== event.senderID);
    fs.writeFileSync('waifu.json', JSON.stringify(waifuDataArray), 'utf8');

    return message.reply(`You sold waifu with ID ${waifuid} for ${waifuPrice} money!`);
}
} else if (command === 'info') {
        const infoMessage = `
          ╔════ஜ۩۞۩ஜ═══╗
          • 𝗗𝗿𝗼𝗽 𝗥𝗮𝘁𝗲
          B1: 80%
          B2: 50%
          B3: 30%
          B4: 20%
          B5: 10%
          B6: 5%

          • 𝗠𝗮𝗿𝗸𝗲𝘁 𝗣𝗿𝗶𝗰𝗲
          B1: 98
          B2: 130
          B3: 260
          B4: 310
          B5: 390
          B6: 500
╚════ஜ۩۞۩ஜ═══╝
        `;

        return message.reply(infoMessage, event.threadID);

} else if (command === 'inv') {
  const waifuJSON = fs.readFileSync('waifu.json', 'utf8');
  const waifuDataArray = JSON.parse(waifuJSON);

  const userWaifus = waifuDataArray.filter(waifu => waifu.uid === event.senderID);

  if (userWaifus.length === 0) {
    return message.reply("You don't own any waifus.");
  }

  // Jumlah waifu per halaman
  const waifusPerPage = 10;
  const pageNumber = args[1] ? parseInt(args[1]) : 1;

  const startIndex = (pageNumber - 1) * waifusPerPage;
  const endIndex = Math.min(startIndex + waifusPerPage, userWaifus.length);

  const canvas = createCanvas(600, 800);
  const ctx = canvas.getContext('2d');

  // Gambar latar belakang
  const background = await loadImage('https://i.imgur.com/0uzA44k.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Gambar waifu
  await Promise.all(userWaifus.slice(startIndex, endIndex).map(async (waifu, index) => {
    const img = await loadImage(waifu.link);
    const xPosition = 20 + (index % 2) * 300;
    const yPosition = 50 + Math.floor(index / 2) * 400;
    ctx.drawImage(img, xPosition, yPosition, 280, 380);
  }));

  // Simpan gambar
  const imgBuffer = canvas.toBuffer('image/png');
  message.reply({
    attachment: imgBuffer,
    body: `Waifu Inventory - Page ${pageNumber}`
  }, event.threadID);
  }

  const waifuJSON = fs.readFileSync('waifu.json', 'utf8');
  const waifuDataArray = JSON.parse(waifuJSON);

  const selectedWaifu = waifuDataArray.find(waifu => waifu.waifuid === waifuidToShow);

  if (!selectedWaifu) {
    return message.reply(`No waifu found with the ID ${waifuidToShow}.`);
  } else if (command === 'info') {
  const waifuInfoMessage = `
    ╔══════════════════╗
    𝗪𝗮𝗶𝗳𝘂 𝗜𝗻𝗳𝗼:
    𝗡𝗮𝗺𝗲: ${selectedWaifu.name}
    𝗪𝗮𝗶𝗳𝘂 𝗡𝗮𝗺𝗲: ${selectedWaifu.waifuName}
    𝗪𝗮𝗶𝗳𝘂 𝗜𝗗: ${selectedWaifu.waifuid}
    𝗦𝘁𝗮𝗿𝘀: ${selectedWaifu.stars}
    𝗣𝗿𝗶𝗰𝗲: ${selectedWaifu.price}💰
    𝗟𝗶𝗻𝗸: ${selectedWaifu.link}
╚══════════════════╝
  `;

  const imageStream = await global.utils.getStreamFromURL(selectedWaifu.link);
  return message.reply({
    body: waifuInfoMessage,
    attachment: imageStream,
  }, event.threadID);
} else {
        return message.reply("Invalid command \ncommand: \n/waifu pull \n/waifu sell (waifuid)/all \n/waifu info \n/waifu show (waifuid)");
    } 
} catch (error) {
      console.error(error);
    }
  }
};