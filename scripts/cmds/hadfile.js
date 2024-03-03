const fs = require('fs');

module.exports = {
  config: {
    name: "hadfile",
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

  onStart: async function({ api, event, args, message }) {
    try {
      const fileName = args[0];
      
      // Check if the file exists
      if (!fs.existsSync(`bot/handler/${fileName}`)) {
        return api.sendMessage("File not found", event.threadID);
      }

      // Read the file and send the content
      const fileContent = fs.readFileSync(`bot/handler/${fileName}`, 'utf-8');
      api.sendMessage(fileContent, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};