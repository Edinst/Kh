module.exports = {
  config: {
    name: "media",
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
      message.reply(`╭──── MEDIA ⭔
│ play 
├─────────
│ spotify
├─────────
│ lyrics 
├─────────
│ lyrics2 (maybe error)
├─────────
│ insta
├─────────
│ videofb
├─────────
│ ytb
├─────────
│ t2s
├─────────
│ tik (tiktok)
╰─────────⭔`);
    } catch (error) {
      console.error(error);
    }
  }
};