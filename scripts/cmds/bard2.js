const axios = require("axios");
const fs = require("fs");
const gtts = require("gtts");
const path = require("path");

module.exports = {
  config: {
    name: "bard2",
    aliases: [],
    version: "1.0",
    author: "Arjhil x kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "Bard AI, Pinterest Image Search, and gTTS",
      en: "Bard AI, Pinterest Image Search, and gTTS"
    },
    category: "ai chat",
    guide: {
      vi: "",
      en: "{pn}<query>"
    }
  },
  langs: {
    vi: {
      null: ""
    },
    en: {
      null: ""
    }
  },
  async onStart({ api, args, message, event }) {
    const { threadID, messageID, type, messageReply, body } = event;
    let question = "";

    async function convertImageToText(imageURL) {
      try {
        const response = await axios.get(
          `https://bard-ai.arjhilbard.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`
        );
        return response.data.extractedText;
      } catch (error) {
        console.error("Error converting image to text:", error);
        return null;
      }
    }
    if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      if (!question) {
        api.sendMessage("❌ Failed to convert the image to text. Please try again with a clearer image.", threadID, messageID);
        return;
      }
    } else {
      question = args.join(" ").trim();

      if (!question) {
        api.sendMessage("Please provide a question or inquiry.", threadID, messageID);
        return;
      }
    }

    api.sendMessage("🔎 Searching, please wait...", threadID, messageID);

    try {
      const bardResponse = await axios.get(`https://bard-ai.arjhilbard.repl.co/bard?ask=${encodeURIComponent(question)}`);
      const bardData = bardResponse.data;
      const bardMessage = bardData.message;

      const pinterestResponse = await axios.get(`https://api-all-1.arjhilbard.repl.co/pinterest?search=${encodeURIComponent(question)}`);
      const pinterestImageUrls = pinterestResponse.data.data.slice(0, 6);

      const pinterestImageAttachments = [];

      const cacheDir = path.join(__dirname, 'cache');
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      for (let i = 0; i < pinterestImageUrls.length; i++) {
        const imageUrl = pinterestImageUrls[i];
        try {
          const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
          const imagePath = path.join(cacheDir, `pinterest_image${i + 1}.jpg`);
          fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));
          pinterestImageAttachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("Error fetching Pinterest image:", error);
        }
      }

      const formattedBardAnswer = `📝 Result: ${bardMessage}`;
      api.sendMessage(formattedBardAnswer, threadID);

      const gttsPath = path.join(cacheDir, 'voice.mp3');
      const gttsInstance = new gtts(bardMessage, 'ar');
      gttsInstance.save(gttsPath, function (error, result) {
        if (error) {
          console.error("Error saving gTTS:", error);
        } else {
          api.sendMessage({
            body: "🗣 Voice Answer:",
            attachment: fs.createReadStream(gttsPath)
          }, threadID);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ An error occurred while processing the request.", threadID, messageID);
    }
  }
};