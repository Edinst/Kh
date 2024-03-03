module.exports = {
  config: {
    name: "example",
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
      message.reply(`here the example:
module.exports = {
  config: {
    name: "//cmd name",
    aliases: [""],
    version: "1.0",
    author: "//yourname",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "",
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
    try { } 
  }
};
      `);
    } catch (error) {
      console.error(error);
    }
  }
};