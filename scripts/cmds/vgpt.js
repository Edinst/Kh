const axios = require('axios');

module.exports = {
  config: {
    name: "vgpt",
    aliases: [],
    version: "1.0",
    author: "cringe members",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Cringe AI Chat"
    },
    longDescription: {
      en: "This command uses cringe AI to chat."
    },
    category: "ai chat",
    guide: {
      en: "Use `.vgpt (question)` to start a chat with the cringe AI."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const prompt = args.join(" ");
      const response = await axios.get(`https://www.api.vyturex.com/gpt?prompt=${encodeURIComponent(prompt)}`);
  
      const answer = response.data.reply;
      api.sendMessage(answer, event.threadID);
    } catch (err) {
      console.error(err);
    }
  }
};