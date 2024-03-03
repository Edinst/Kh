const { createCanvas, loadImage } = require("canvas");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "rbg2",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Remove background from an image using canvas."
    },
    longDescription: {
      en: "This command removes the background from an image using the canvas library."
    },
    category: "ai chat",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const imageUrl = args[0]; // Get the image URL from the command arguments

      // Check if the image URL is provided
      if (!imageUrl) {
        api.sendMessage("Please provide an image URL.", event.threadID);
        return;
      }

      // Fetch the image data
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Load the image using canvas and create a canvas context
      const image = await loadImage(buffer);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, image.width, image.height);

      // Set the background color to white
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert the canvas to a buffer
      const convertedBuffer = canvas.toBuffer();

      // Send the removed background image as a reply
      api.sendMessage({
        body: "",
        attachment: fs.createReadStream(convertedBuffer),
      }, event.threadID);

    } catch (error) {
      console.error("Error occurred:", error);
      api.sendMessage("An error occurred while removing the background.", event.threadID);
    }
  }
};