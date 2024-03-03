module.exports = {
  config: {
    name: "misc",
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
    category: "tools",
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
      message.reply(`╭──── MISC ⭔
│ imgur (api die)
├─────────
│ imgbb 
├─────────
│ example 
├─────────
│ transcribe 
├─────────
│ 4k (api die)
├─────────
│ prompt 
├─────────
│ remini (like 4k)
├─────────
│ prompt2
├─────────
│ profile 
╰─────────⭔`);
    } catch (error) {
      console.error(error);
    }
  } 
};