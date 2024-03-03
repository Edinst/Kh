const axios = require("axios");
const f = { a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓", A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹", " ": " " };

module.exports = {
  config: {
    name: "toxicAi",
    aliases: ["toxic"],
    shortDescription: {
      en: "EnzoAI - Answer questions",
      tl: "EnzoAI - Sagutan ang mga tanong"
    },
    longDescription: {
      en: "EnzoAI - Answer questions with AI",
      tl: "EnzoAI - Sagutan ang mga tanong gamit ang AI"
    },
    category: "goatBot",
    guide: {
      en: "{p}enzo <question>",
      tl: "{p}enzo <tanong>"
    },
    role: 0,
    countDown: 5,
    author: "GoatAI by LiANE",
    version: "1.0"
  },

  onStart: async function ({ event, message }) {
    const senderID = event.senderID;
    const user = await global.GoatBot.usersData.get(senderID);
    const userName = user.name;
    const response = args.join(" ");

    if (args.length === 0) {
      message.reply("Tuliskan pertanyaan atau kueri.");
      return;
    }

    const typingIndicator = await message.reply({
      typing: true
    });

    try {
      const encodedResponse = encodeURIComponent(response);
      const params = { name: userName, id: senderID };
      const res = await axios.get(`https://enzoai-kurgtahu.repl.co/api/ai/${encodedResponse}`, { params });
      typingIndicator();

      const m = res.data.reply;
      const fancy = m.split('').map(char => f[char] || char).join('');

      message.reply(fancy);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari jawaban:", error.message);
      message.reply(`Terjadi kesalahan saat mencari jawaban: ${error.message}`);
    }
  }
};