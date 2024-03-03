const axios = require("axios");

module.exports = {
  config: {
    name: "postfb",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Post a Facebook post"
    },
    longDescription: {
      en: "Post a Facebook post"
    },
    category: "tools",
    guide: {
      en: "Usage: /postfb [post text]"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    const postText = args.join(" ");

    if (!postText) {
      return message.reply("Please provide the text for the post.");
    }

    // Perform the Facebook post using the Facebook API or any other API library of your choice
    // Code to post the Facebook post

    // Example using Axios:
    try {
      const response = await axios.post("https://graph.facebook.com/v12.0/me/feed", {
        message: postText,
        access_token: "EAABwzLixnjYBO65tNxinOfr7wgjPEiv4HnXj057GfZCpS7AOIrLdkZBlCsZCUbVmZAZCqXDOx4nL6PZBDNKE3auhSm6EpHZBa3IsMshQZBncJmlWbGKly5MzwPQ3ZB9vbSuqVheQIKDKGs1GZB5yUXp6OI7UuAt0jhL0mMstCjyZBbjhdWS2m2XVHNWZBWZAhob92h4kwTvnkm4GGaWMM"
      });

      // Check the response from Facebook API and handle any error or success messages accordingly

      message.reply("Successfully posted to Facebook!");
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      message.reply("Failed to post to Facebook.");
    }
  }
};