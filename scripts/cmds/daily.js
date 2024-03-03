const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "daily",
    version: "1.1",
    author: "EDINST",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Command to add daily balance to user's account."
    },
    longDescription: {
      en: "get daily balance"
    },
    category: "Economy - update",
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
      const fbid = event.senderID;
      const timeFormat = "YYYY-MM-DD";
      const dateTimeNow = moment().format(timeFormat);
      const data = fs.readFileSync("data/bal.json");
      let balances = JSON.parse(data);

      const userIndex = balances.findIndex((x) => x.fbid === fbid);

      if (userIndex !== -1) {
        const user = balances[userIndex];
        const lastClaimDate = user.lastClaimDate;

        if (moment(lastClaimDate, timeFormat).isSame(dateTimeNow)) {
          api.sendMessage("You have already claimed your daily reward today.", event.threadID);
        } else {
          const balance = Math.random() < 0.8 ? Math.floor(Math.random() * 901) + 100 : Math.floor(Math.random() * 4101) + 1000;

          user.gold = (user.gold || 0) + balance;
          user.lastClaimDate = dateTimeNow;
          fs.writeFileSync("data/bal.json", JSON.stringify(balances, null, 2));

          api.sendMessage(`Daily rewards: \n \ngold coin: ${balance}`, event.threadID);
        }
      } else {
        api.sendMessage("You are not registered! Please register to receive daily balance.", event.threadID);
      }
    } catch (error) {
      message.reply(error);
    }
  }
};