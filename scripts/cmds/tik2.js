const axios = require('axios');

module.exports = {
  config: {
    name: "tik2",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Send TikTok videos using the provided URL."
    },
    longDescription: {
      en: "This command allows you to send TikTok videos by providing the URL using an API."
    },
    category: "Social",
    guide: {
      en: "Use the command by typing `.tik <TikTok URL>`."
    }
  },

  langs: {
    en: {
      error: "An error occurred while fetching the TikTok video. Please check the URL and try again.",
      success: "Successfully sent the TikTok video."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const apiUrl = 'https://tiktok.samirzyx.repl.co/?url=';
      const tikTokUrl = args[0];

      if (!tikTokUrl) {
        api.sendMessage("Please provide a valid TikTok URL.", event.threadID);
        return;
      }

      const response = await axios.get(apiUrl + tikTokUrl);
      const videoUrl = response.data.videoUrl;

      if (!videoUrl) {
        api.sendMessage("An error occurred while fetching the TikTok video. Please check the URL and try again.", event.threadID);
        return;
      }

      api.sendMessage({ body: videoUrl, attachment: false }, event.threadID);
      api.sendMessage("Successfully sent the TikTok video.", event.threadID);
    } catch (err) {
      api.sendMessage("An error occurred while fetching the TikTok video. Please check the URL and try again.", event.threadID);
    }
  }
};