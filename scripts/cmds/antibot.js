const fs = require("fs");

let protectedUIDs = [];
try {
  const data = fs.readFileSync("protect.json", "utf-8");
  protectedUIDs = JSON.parse(data);
} catch (err) {
  console.error("Error while reading protect.json:", err);
}

module.exports = {
  config: {
    name: "antibot",
    aliases: ["antibot"],
    version: "1.0",
    author: "Rizky",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "anti bot"
    },
    longDescription: {
      en: "anti bot"
    },
    category: "Detected",
    guide: {
      en: ""
    }
  },
  onStart: async function() {},
  onChat: async function({ api, event, args }) {
    const text = event.body;
    const botID = "61552776704246";

    const bannedWords = ["system", "error"];

    function isTextBanned(text) {
      text = text.toLowerCase();

      for (let i = 0; i < bannedWords.length; i++) {
        if (text.includes(bannedWords[i])) {
          return true;
        }
      }

      return false;
    }

    if (isTextBanned(text)) {
      const senderID = event.senderID;
      const threadID = event.threadID;
      if (senderID !== botID && !protectedUIDs.includes(senderID)) {
        setTimeout(async () => {
          try {
            const goodbyeMessage = "Multi bot detected";
            await api.sendMessage(goodbyeMessage, threadID);

            await api.removeUserFromGroup(botID, threadID);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }, 5000);
      }
    }
  }
};