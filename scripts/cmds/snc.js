const fs = require("fs");

module.exports = {
  config: {
    name: "snc",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
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
      const oldFileName = args[0];
      const newFileName = args[1];

      const filePath = `./scripts/cmds/${oldFileName}`;
      const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

      const newFileContent = fileContent.replace(/name: "(.*?)"/, `name: "${newFileName}"`);

      fs.writeFileSync(filePath, newFileContent);

      api.sendMessage(`Berhasil mengubah nama cmd ${oldFileName} menjadi ${newFileName}`, event.threadID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(`Terjadi kesalahan saat mengubah nama cmd: ${error.message}`, event.threadID);
    }
  }
};