const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "zenai",
    aliases: ["zen"],
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
    category: "ai chat",
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
    const prompt = args.join(" ");
    const owner = "Edi+nst";
    const botname = "Zen+chiko";
    
    // Send the initial message to the API
    const response = await fetch(`https://api.popcat.xyz/chatbot?msg=${prompt}&owner=${owner}&botname=${botname}`);
    const jsonResponse = await response.json();
    
    api.sendMessage({ body: "Tunggu sebentar..." }, event.threadID, event.messageID);
    
    api.unsendMessage(event.messageID);
    
    api.sendMessage({ body: jsonResponse.result }, event.threadID);
  }
};