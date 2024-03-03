const axios = require('axios');

module.exports = {
  config: {
    name: "gettoken",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "tools",
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
      const response = await axios.get(`https://graph.facebook.com/v12.0/oauth/access_token?client_id=${api.getCurrentUserID()}&client_secret=${api.getAccessToken()}&grant_type=client_credentials`);
      
      const accessToken = response.data.access_token;
      
      api.sendMessage(`Access Token: ${accessToken}`, event.threadID);
    } catch (error) {
      console.log(error);
      api.sendMessage(`Failed to retrieve access token.`, event.threadID);
    }
  }
};