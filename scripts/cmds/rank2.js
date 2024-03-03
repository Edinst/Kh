const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "rank2",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message, usersData }) {
    const userData = await usersData.get(event.senderID);
    const id1 = event.senderID;

    const bacData = fs.readFileSync("bac.json");
    const backgroundData = JSON.parse(bacData);
    const backgroundImage = await loadImage(backgroundData.image);

    const getAvtmot = (
      await axios.get(`https://graph.facebook.com/${id1}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {
        responseType: "arraybuffer"
      })
    ).data;

    const canvas = createCanvas(800, 600);
    const context = canvas.getContext("2d");

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Gambar profil
    const profileImage = await loadImage(getAvtmot);
    const profileImageSize = 200;
    const profileImageX = canvas.width / 2 - profileImageSize / 2;
    const profileImageY = 50;
    context.drawImage(profileImage, profileImageX, profileImageY, profileImageSize, profileImageSize);

    // Atur properti font
    const fontSize = 50;
    const fontWeight = "bold";
    const fontColor = "white";
    const textAlign = "center";

    // Saldo
    userData.money = userData.money + 5000; // Tambahkan saldo sebesar 5000
    const balanceText = `Balance: ${userData.money}`;
    context.font = `${fontWeight} ${fontSize}px Arial`;
    context.fillStyle = fontColor;
    context.textAlign = textAlign;
    context.fillText(balanceText, canvas.width / 2, canvas.height / 2);

    // Progress pengalaman
    const expMax = 5000; // Nilai pengalaman maksimal
    const expWidth = 600; // Lebar progress pengalaman
    const expHeight = 20; // Tinggi progress pengalaman
    const expBorderRadius = 10; // Radius batas progress pengalaman
    userData.exp = userData.exp >= expMax ? 0 : userData.exp; // Jika pengalaman mencapai nilai maksimal, reset ke 0
    const expValue = userData.exp; // Nilai pengalaman saat ini
    const expPercentage = (expValue / expMax) * 100; // Persentase pengalaman

    // Gambar latar belakang progress pengalaman
    const expBarX = canvas.width / 2 - expWidth / 2;
    const expBarY = canvas.height / 2 + 100;
    context.fillStyle = "#dddddd";
    context.fillRect(expBarX, expBarY, expWidth, expHeight);

    // Gambar isi progress pengalaman
    const expFillWidth = (expValue / expMax) * expWidth;
    context.fillStyle = "#00ff00";
    context.fillRect(expBarX, expBarY, expFillWidth, expHeight);

    // Gambar teks pengalaman
    const expText = `Exp: ${expValue}`;
    context.font = `50px Arial`;
    context.fillStyle = "black";
    context.fillText(expText, canvas.width / 2, expBarY - 30);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync("rank2.png", imageBuffer);

    api.sendMessage(
      {
        attachment: fs.createReadStream("rank2.png")
      },
      event.threadID,
      (error, info) => {
        if (error) throw error;
        fs.unlinkSync("rank2.png");
      }
    );
  }
};