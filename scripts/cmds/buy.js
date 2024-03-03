const fs = require("fs");

module.exports = {
  config: {
    name: "buy",
    aliases: [],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Buy a cmd"
    },
    longDescription: {
      en: "Use this command to buy a cmd"
    },
    category: "Economy",
    guide: {
      en: "To buy a cmd, use the command `/buy cmd | <name> | <count>`"
    }
  },
  langs: {
    en: {}
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const cmdDetails = args[0].split("|").map((item) => item.trim());
      const cmdName = cmdDetails[0];
      const cmdCount = parseInt(cmdDetails[1]);

      if (cmdName.toLowerCase() === " bard ") {
        const balanceFile = fs.readFileSync("./data/bal.json");
        const balances = JSON.parse(balanceFile);
        const userID = event.senderID;

        if (balances.hasOwnProperty(userID)) {
          const userBalance = balances[userID];
          const cmdCost = cmdCount * 100;

          if (userBalance >= cmdCost) {
            balances[userID] -= cmdCost;
            fs.writeFileSync("./data/bal.json", JSON.stringify(balances));

            const userCmdFile = fs.readFileSync("./userbard.json");
            const userCmds = JSON.parse(userCmdFile);

            if (userCmds.hasOwnProperty(userID)) {
              userCmds[userID] += cmdCount;
            } else {
              userCmds[userID] = cmdCount;
            }

            fs.writeFileSync("./userbard.json", JSON.stringify(userCmds));

            api.sendMessage(`Successfully bought ${cmdCount} "${cmdName}" command(s).`, event.threadID);
          } else {
            api.sendMessage("Insufficient balance.", event.threadID);
          }
        } else {
          api.sendMessage("User balance not found.", event.threadID);
        }
      } else {
        api.sendMessage("Invalid command name.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred.", event.threadID);
    }
  }
};