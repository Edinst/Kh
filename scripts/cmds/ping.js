const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  config: {
    name: "ping",
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

  onStart: async function ({ api, event, args, message }) {
    try {
      const sendPingCheckMessage = async () => {
        const startTime = Date.now();
        await delay(500);
        const botLatency = Date.now() - startTime;
        const apiLatency = message.timestamp - startTime;

        let pingStatus = "";

        if (botLatency >= 500) {
          pingStatus = "slow";
        } else if (botLatency >= 300 && botLatency < 500) {
          pingStatus = "normal";
        } else if (botLatency < 300) {
          pingStatus = "fast";
        }

        api.sendMessage({
          body: `Ping status: ${pingStatus} \nPing: ${botLatency}ms`,
          attachment: null,
          mentions: [{
            tag: event.senderID,
            id: event.senderID,
            fromIndex: 6,
          }]
        }, event.threadID, (error, messageInfo) => {
          setTimeout(() => {
            api.deleteMessage(messageInfo.messageID);
          }, 500);
        });
      };

      message.reply("checking ping...", event.threadID, async (error, messageInfo) => {
        await delay(500);
        await sendPingCheckMessage();
        api.deleteMessage(messageInfo.messageID);
      });
    } catch (error) {
      console.error(error);
    }
  }
};