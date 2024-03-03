const axios = require("axios");
const fs = require("fs").promises;
const { shorten } = require('tinyurl');

module.exports = {
  config: {
    name: "bin",
    aliases: ["pastebin"],
    version: "1.0",
    author: "JARiF",
    countDown: 2,
    role: 2,
    category: "owner",
    guide: {
      vi: "{pn} text",
      en: "{pn} create <text> or {pn} fileName"
    },
  },
  onStart: async function ({ event, args, messageReply, message, api }) {
    const subCommand = args[0];
    
    if (subCommand === 'create') {
      const content = args.slice(1).join(' ');

      try {
        const response = await axios.post("https://anniebin.onrender.com/upload", {
          content: content,
          key: "annie-jarif"
        });

        const fileId = response.data.id; 
        const rawLink = `https://anniebin.onrender.com/raw/${fileId}`;
        message.reply({ body: rawLink });
      } catch (error) {
        message.reply(error.message);
        console.error(error);
      }
    } else {
      const name = args[0];
      const filePath = `./scripts/cmds/${name}.js`;

      try {
        const data = await fs.readFile(filePath, "utf8");
        const response = await axios.post("https://anniebin.onrender.com/upload", {
          name: name,
          content: data,
          key: "annie-jarif" 
        });

        const fileId = response.data.id; 
        const rawLink = `https://anniebin.onrender.com/raw/${fileId}`;
        message.reply({ body: rawLink });
      } catch (error) {
        message.reply(error.message);
        console.error(error);
      }
    }
  },
};