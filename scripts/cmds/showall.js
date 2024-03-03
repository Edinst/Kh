module.exports = {
  config: {
    name: "showall",
    aliases: ["sa"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "List all files in folder scripts/cmds"
    },
    longDescription: {
      en: "This command lists all the file names in the scripts/cmds folder."
    },
    category: "tools",
    guide: {
      en: "To use this command, simply type /showall in the chat."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const fs = require('fs');
      const dirPath = './scripts/cmds/';
      
      // Read all the file names in the folder
      const files = fs.readdirSync(dirPath);

      // Join all the file names into a string with a new line separator
      const fileNames = files.join('\n');

      // Send the file names as a reply
      await api.sendMessage(`Files in ${dirPath.trim()}: \n${fileNames}`, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};