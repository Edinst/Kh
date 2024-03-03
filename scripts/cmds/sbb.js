const fs = require('fs');

module.exports = {
  config: {
    name: "setbalback",
    aliases: ["sbb"],
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

  onStart: async function ({ api, event, args, message }) {
    try {
      // Membaca isi file bac.json
      const fileContent = fs.readFileSync('bac.json');
      const jsonData = JSON.parse(fileContent);

      // Mengganti link image dengan argumen baru
      jsonData.image = args[0];

      // Menuliskan kembali isi file bac.json dengan link image yang baru
      fs.writeFileSync('bac.json', JSON.stringify(jsonData, null, 2));

      // Mengirimkan balasan bahwa link image telah diganti
      api.sendMessage(`Link image telah berhasil diganti menjadi: ${args[0]}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('Terjadi kesalahan dalam menjalankan perintah.', event.threadID);
    }
  }
};