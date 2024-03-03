const fs = require('fs');

const LuxionCMD = {
  config: {
    name: "pay2",
    role: 0,
    author: "Loufi Libra | Luxion",
    shortDescription: "pay user",
    longDescription: "mentransfer money kepada user",
    category: "economy",
    guide: {
      en: "{pn} <UID> <Jumlah>"
    }
  },
  onStart: async function ({ event, message, args, usersData, api }) {
    const checkNameInData = args[0];
    const namaPenerima = await usersData.getName(event.userID = checkNameInData);
    const namaPengirim = await usersData.getName(event.senderID);
    const senderID = event.senderID;
    const recipient = args[0];
    const amount = parseInt(args[1]);

    if (!recipient || !amount || isNaN(amount) || amount <= 0) {
      message.reply("Invalid command usage.");
      return;
    }

    const balData = JSON.parse(fs.readFileSync('data/bal.json'));

    const senderBalance = balData.find((data) => data.fbid === senderID);
    const recipientBalance = balData.find((data) => data.fbid === recipient);

    if (!senderBalance || !recipientBalance) {
      message.reply("Invalid users.");
      return;
    }

    if (senderBalance.gold < amount) {
      message.reply("uang mu tidak cukup");
      return;
    }

    senderBalance.gold -= amount;

    recipientBalance.gold += amount;

    fs.writeFileSync('data/bal.json', JSON.stringify(balData, null, 2));

    api.sendMessage(`${namaPengirim}
    transfer ${amount}$ ke akun mu`, event.userID = recipient);
    api.sendMessage(`${namaPengirim}  Berhasil mengirim ${amount}$ ke ${namaPenerima}`, event.threadID);
  }
};

module.exports = LuxionCMD;