const axios = require('axios');

module.exports = {
  config: {
    name: "gpt",
    aliases: ["pt"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Chat with AI"
    },
    longDescription: {
      en: "This command allows you to chat with the AI model."
    },
    category: "ai chat",
    guide: {
      en: "To use this command, simply type `{pn} (question)`."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args }) {
    try {
      const question = args.join(" ");
      const response = await axios.get(`https://gpt4-ni-kim.hiroshiapi.repl.co/gpt?ask=${encodeURIComponent(question)}`);
      api.sendMessage(response.data.response, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
  }
};