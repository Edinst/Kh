const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "hadadd",
    aliases: ["addfile"],
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
      if (args.length < 2) {
        return api.sendMessage("Usage: .hadadd [filename] [filecontent]", event.threadID);
      }

      const filename = args[0]; // nama file
      const filecontent = args.slice(1).join(" "); // isi file

      const handlerFolder = path.join(__dirname, "bot", "handler");
      const filePath = path.join(handlerFolder, filename);

      fs.writeFile(filePath, filecontent, function (err) {
        if (err) {
          return api.sendMessage("Failed to add file", event.threadID);
        }

        api.sendMessage(`File ${filename} has been added.`, event.threadID);
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("An error occurred.", event.threadID);
    }
  }
};