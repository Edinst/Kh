module.exports = {
  config: {
    name: "ping2",
    aliases: [],
    version: "1.0",
    author: "Riley Nelson",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Check bot and API latency"
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
    const pidusage = require("pidusage");
    const moment = require('moment-timezone');

    function byte2mb(bytes) {
      const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let l = 0, n = parseInt(bytes, 10) || 0;
      while (n >= 1024 && ++l) n = n / 1024;
      return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
    }

    const { cpu, memory } = await pidusage(process.pid);
    const ram = byte2mb(memory);

    const startTime = Date.now();
    const sentMessage = await message.reply('pinging...');
    const endTime = Date.now();
    const botPing = endTime - startTime;
    const apiPing = sentMessage.timestamp - startTime;

    const now = moment().tz('Asia/Jakarta');

    const pingMessage = `Pong!\nBot Latency: ${botPing}ms\nAPI Latency: ${apiPing}ms\nTime: ${now.format('YYYY-MM-DD')}\nCPU: ${cpu.toFixed(1)}%\nRAM: ${ram} \n \ncredit: riley noson`;
    message.reply(pingMessage);
  }
};