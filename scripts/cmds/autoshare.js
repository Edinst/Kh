const axios = require('axios');

module.exports = {
  config: {
    name: "autoshare",
    aliases: ["share"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Auto share Facebook posts."
    },
    longDescription: {
      en: "This command allows you to automatically share Facebook posts using your access token."
    },
    category: "admin",
    guide: {
      en: "Usage: autoshare <post link> <share count>"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const access_token = "EAABwzLixnjYBO65tNxinOfr7wgjPEiv4HnXj057GfZCpS7AOIrLdkZBlCsZCUbVmZAZCqXDOx4nL6PZBDNKE3auhSm6EpHZBa3IsMshQZBncJmlWbGKly5MzwPQ3ZB9vbSuqVheQIKDKGs1GZB5yUXp6OI7UuAt0jhL0mMstCjyZBbjhdWS2m2XVHNWZBWZAhob92h4kwTvnkm4GGaWMM";
      const postLink = args[0];
      const shareCount = parseInt(args[1]);

      // Make API request to auto-share endpoint
      const apiUrl = `https://auto-share-fb-xenn.kiwibase034.repl.co/api?token=${access_token}&url=${postLink}`;
      const response = await axios.post(apiUrl, { share_count: shareCount });

      if (response.status === 200) {
        message.reply(`Successfully shared ${shareCount} times.`);
      } else {
        message.reply("Failed to share post.");
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing the request.");
    }
  }
};