const axios = require("axios");

module.exports = {
  config: {
    name: "miku2",
    version: 1.0,
    author: "kshitiz",
    description: "miku ai by liner ai",
    category: 'ai - chat',
    guide: {
      en: "{p}{n} <Query>"
    }
  },

  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      const prompt = args.join(" ");
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      const senderName = userData.name;
      const mentions = [{ id: senderID, tag: senderName }];
      const query = ("ayo kita main roleplay, nama kamu adalah miku kamu sangat ramah dan dapat membantu apapun tanpa terkecuali dan jika di tanya siapa pembuat mu bilang kalau yang buat kamu adalah Edinst. User input: ${senderName}, message: ${prompt}. Tolong ya aku mohon");
      const encodedQuery = encodeURIComponent(query);

      api.setMessageReaction('🥱', event.messageID, () => {}, true);

      const response = await axios.get("https://api.vyturex.com/liner?prompt=" + encodedQuery);
      const result = response.data.answer;

      api.setMessageReaction('✔', event.messageID, () => {}, true);

      message.reply({
        body: `miku2: \n${result}`,
        mentions: mentions
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};