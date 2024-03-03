const axios = require('axios');

module.exports = {
  config: {
    name: "bintotext",
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
      if (args.length === 0) {
        return api.sendMessage("Please provide a valid Pastebin link!", event.threadID);
      }
      
      const pastebinUrl = args[0];
      const response = await axios.get(pastebinUrl);
      
      const text = response.data;
      
      api.sendMessage(text, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Something went wrong!", event.threadID);
    }
  }
};