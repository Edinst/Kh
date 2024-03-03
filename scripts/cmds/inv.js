const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const waifuData = JSON.parse(fs.readFileSync('waifu.json', 'utf8'));

module.exports = {
  config: {
    name: "inv",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: { en: "" },
    longDescription: { en: "" },
    category: "ai chat",
    guide: { en: "" }
  },
  langs: { en: { gg: "" } },
  onStart: async function({ api, event, args, message }) {
    try {
      const backgroundUrl = 'https://i.ibb.co/zFfnfvF/image.jpg';
      const imageUrls = waifuData.map(waifu => waifu.link);

      const canvasWidth = 800;
      const canvasHeight = 600;
      const imageWidth = 200;
      const imageHeight = 150;

      const canvasObj = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvasObj.getContext('2d');

      const loadImagePromises = imageUrls.map(url => loadImage(url));
      const images = await Promise.all(loadImagePromises);

      ctx.drawImage(await loadImage(backgroundUrl), 0, 0, canvasWidth, canvasHeight);

      let page = 1;
      let maxPages = Math.ceil(images.length / 5);
      if (args[0] && args[0].includes('page')) {
        const [, pageNum] = args[0].split('/');
        page = parseInt(pageNum, 10);
        if (page > maxPages) page = maxPages;
      }

      const startIdx = (page - 1) * 5;
      const endIdx = startIdx + 5;
      const slicedImages = images.slice(startIdx, endIdx);

      slicedImages.forEach((image, index) => {
        const x = (index % 5) * imageWidth;
        const y = Math.floor(index / 5) * imageHeight;
        ctx.drawImage(image, x, y, imageWidth, imageHeight);
      });

      canvasObj.toBuffer(async (err, buffer) => {
        if (err) throw err;

        fs.writeFile('result.jpg', buffer, async () => {
          message.reply('here the image');

          await api.sendMessage(
            {
              attachment: fs.createReadStream("result.jpg"),
            },
            event.threadID,
            (error, info) => {
              if (error) throw error;
              fs.unlinkSync("result.jpg");
            }
          );
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
};