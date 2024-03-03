const axios = require("axios"); 

module.exports = {
  config: {
    name: "ws",
    version: "1.0",
    author: "Tashrif Rajin",
    longDescription: "Get a response from SimSimi.",
    category: "owner",
    guide: {
      en: "{p}sim <message>"
    }
  },
  onStart: async function ({ args, api, event }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID); 

    const message = args.join(" "); 

    if (!message) {
      return api.sendMessage(`Usage: ${p}sim <message>`, event.threadID, event.messageID);
    } 

    const apiUrl = `https://bnw.samirzyx.repl.co/webscraper/scrape?weburl=${encodeURIComponent(message)}`; 

    try {
      const response = await axios.get(apiUrl); 

      if (response.data) {
        return api.sendMessage(response.data, event.threadID);
      } else {
        return api.sendMessage("Failed to get a response from ${encodeURIComponent(message)}.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while fetching a response from .", event.threadID);
    }
  }
};