const fs = require('fs');

module.exports = {
  config: {
    name: "hadadd",
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
    const fileName = args[0];
    const fileContent = args.slice(1).join(' ');

    if (!fileName || !fileContent) {
      return api.sendMessage('Please provide both the file name and its content.', event.threadID);
    }

    const filePath = `bot/handler/${fileName}.js`;

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        api.sendMessage(`Failed to create ${fileName}.js: ${err.message}`, event.threadID);
      } else {
        api.sendMessage(`Successfully created ${fileName}.js with content:\n\n${fileContent}`, event.threadID);
      }
    });
  }
};