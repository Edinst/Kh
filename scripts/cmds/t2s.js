const axios = require('axios');

module.exports = {
  config: {
    name: "t2s",
    version: "1.0",
    author: "JARiF",
    countDown: 15,
    role: 0,
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

  onStart: async function ({ message, args }) {
    const p = args.join(" ");

    if (p) {
      const BASE_URL = `https://www.annie-jarif.repl.co/sing?lyrics=${encodeURIComponent(p)}`;
      message.reply("Please wait...");

      try {
        let res = await axios.get(BASE_URL);

        let song = res.data.audio;
        let lyrics = res.data.lyrics;

        const response = {
          body: lyrics,
          attachment: await global.utils.getStreamFromURL(song)
        };

        await message.reply(response);
      } catch (e) {
        message.reply(e.message);
      }
    } else {
      message.reply("Please provide a prompt for the song.");
    }
  }
};