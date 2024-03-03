const fs = require('fs');

module.exports = {
  config: {
    name: "tes",
    aliases: ["tes1"],
    version: "1.5",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Send a random zodiac and its description"
    },
    longDescription: {
      en: "This command allows you to send a random zodiac sign and its description."
    },
    category: "fun",
    guide: {
      en: "Use `{pn} zodiac` to generate a random zodiac sign and its description."
    }
  },
  langs: {
    en: {
      invalid: "Invalid command\nuse this:\n\n{pn} ras\n{pn} zodiac\n\nOther commands will be added later.",
    }
  },

  onStart: async function({ api, event, args, message, getLang }) {
    try {
      const type = args[0];
      
      const data = fs.readFileSync('tes.json', 'utf8');
      const jsonData = JSON.parse(data);
      
      switch (type) {
        case "zodiac": {
          const randomZodiac = jsonData.zodiacSigns[Math.floor(Math.random() * jsonData.zodiacSigns.length)];
          const zodiacMessage = `Zodiac: ${randomZodiac.name}\nDescription: ${randomZodiac.description}\n\nNote: Just for fun, it's not your real zodiac.`;
          api.sendMessage(zodiacMessage, event.threadID);
          break;
        }
        case "ras": {
          const randomRas = jsonData.ras[Math.floor(Math.random() * jsonData.ras.length)];
          const rasMessage = `Ras: ${randomRas.name}\nDescription: ${randomRas.description}\n\nNote: Just for fun, it's not your real ras.`;
          api.sendMessage(rasMessage, event.threadID);
          break;
        }
        default: {
message.reply(getLang("invalid"));
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};