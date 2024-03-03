const axios = require('axios');

module.exports = {
  config: {
    name: "getid",
    aliases: ["appid", "secretapp"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Get the app_id and secret_app of the Facebook account that has installed the bot."
    },
    longDescription: {
      en: "This command allows you to retrieve the app_id and secret_app of the Facebook account that has installed the bot."
    },
    category: "tools",
    guide: {
      en: "Use !getid command to get the app_id and secret_app."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      // Get the Facebook user ID
      const userId = event.senderID;

      // Fetch the app_id and secret_app from Facebook Graph API
      const response = await axios.get(`https://graph.facebook.com/${userId}/ids_for_business`, {
        params: {
          access_token: api.getCurrentAccessToken().toString(),
          limit: 1
        }
      });

      // Extract the app_id and secret_app from the response
      const app_id = response.data.data[0].app.id;
      const secret_app = response.data.data[0].app.secret;

      // Send the app_id and secret_app as a message
      api.sendMessage(`app_id: ${app_id}\nsecret_app: ${secret_app}`, event.threadID);
    } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage("An error occurred while retrieving the app_id and secret_app.", event.threadID);
    }
  }
};