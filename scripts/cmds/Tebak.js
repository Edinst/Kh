const LuxionCMD = {
  config: {
    name: "tebak",
    version: "1.0",
    author: "Luxion", //jangan diubah
    countDown: 5,
    role: 0,
    sortDescription: " ",
    longDescription: "Command untuk menebak sesuatu",
    category: "command",
    guide: "{pn} <Pilihan>"
  },
  onStart: async function({ api, message, args }) {
    switch (args[0]) {
      case "baterai": {
        const Tebakan = `Baterai mu adalah`;
        const space = `\x20`;
        const Persen = Math.floor(Math.random() * 100);
        if (Persen < 20) {
          message.reply(Tebakan+space+Persen+`%`+space+`Low!!`);
        } else if (Persen < 80) {
          message.reply(Tebakan+space+Persen+`%`+space+`High!!`);
        } else {
          message.reply(Tebakan+space +Persen+`%`);
        }
        break;
      }
      default: {
        message.reply("Pilihan:\nBaterai,");
        break;
      }
    }
  }
};
module.exports = LuxionCMD;