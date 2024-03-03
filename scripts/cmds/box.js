const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "box",
    aliases: ["black"],
    version: "1.0",
    author: "Riley noson",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "AI Chat Command"
    },
    longDescription: {
      en: "AI Chat Command menggunakan gpt4 API"
    },
    category: "ai chat",
    guide: {
      en: "Gunakan perintah {pn}ai [pesan] untuk berkomunikasi dengan AI"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },
  onStart: async function ({ api, event, args, message }) {
    try {
      const typing = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
      await api.sendMessage("Tunggu sebentar...", event.threadID);
      const inputMessage = args.join(" ");
      const response = await fetch(`https://box-ai.edimcpc36.repl.co/api/box?query=${encodeURIComponent(inputMessage)}`);
      const responseBody = await response.text();
      await api.unsendMessage(api.getCurrentUserID(), event.messageID);
      await api.sendMessage(responseBody, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};