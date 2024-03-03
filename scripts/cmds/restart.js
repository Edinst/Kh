const fs = require("fs-extra");

module.exports = {
  config: {
    name: "restart",
    version: "1.0",
    author: "NTKhang",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "Khởi động lại bot",
      en: "Restart bot"
    },
    longDescription: {
      vi: "Khởi động lại bot",
      en: "Restart bot"
    },
    category: "Owner",
    guide: {
      vi: "   {pn}: Khởi động lại bot",
      en: "   {pn}: Restart bot"
    }
  },

  langs: {
    vi: {
      restarting: "🔄 | Đang khởi động lại bot..."
    },
    en: {
      restarting: "╭─────────────⭓ \n├ ⟩» RESTART... «⟨ \n├──⭔ \n├ ⟩» ⏳ | please wait... \n╰─────────────⭓"
    }
  },

  onLoad: function ({ api }) {
    const pathFile = `${__dirname}/tmp/restart.txt`;
    if (fs.existsSync(pathFile)) {
      const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
      api.sendMessage(`╭─────────────⭓ \n├ ⟩» [ ZEN CHIKO | V1🌟 ] «⟨ \n├──⭔ \n├ ⟩» ✅ | zen restarted \n├──⭔ \n├ ⟩» ⏰ | Time: ${(Date.now() - time) / 1000}s \n╰─────────────⭓`, tid);
      fs.unlinkSync(pathFile);
    }
  },

  onStart: async function ({ message, event, getLang }) {
    const pathFile = `${__dirname}/tmp/restart.txt`;
    fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
    await message.reply(getLang("restarting"));
    process.exit(2);
  }
};