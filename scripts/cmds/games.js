module.exports = {
  config: {
    name: "games",
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
      message.reply(`╭──── GAMES⭔
│ arkn
├─────────
│ country
├─────────
│ dhbc
├─────────
│ dice
├─────────
│ guessnumber
├─────────
│ pokemon
├─────────
│ rps
├─────────
│ sicbo
├─────────
│ slot
├─────────
│ slots
├─────────
│ truthordare
├─────────
│ ttt
├─────────
│ Pokebot
├─────────
│ quiz
├─────────
│ quiz2
├─────────
│ wordgame
╰─────────⭔`);
    } catch (error) {
      console.error(error);
    }
  }
};