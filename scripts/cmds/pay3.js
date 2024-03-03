const LuxionCMD = {
  config: {
    name: "pay3",
    role: 2,
    author: "Loufi Libra | Luxion",
    shortDescription: "pay user",
    longDescription: "mentransfer money kepada user",
    category: "economy",
    guide: {
      en: "{pn} <UID> <Jumlah>"
    }
  },
  onStart: async function ({ event, message, args, usersData, api }) {
    const checkNameInData = args[0]
    const namaPenerima = await usersData.getName(event.userID = checkNameInData);
    const namaPengirim = await usersData.getName(event.senderID);
    const senderID = event.senderID;
    const recipient = args[0];
    const amount = parseInt(args[1]);
    if (args == 0) {
      api.sendMessage("invalid", event.threadID)
    }
    if (!recipient || !amount || isNaN(amount) || amount <= 0) {
      message.reply("Invalid command usage.");
      return;
    }
    const senderData = await usersData.get(senderID);
    const recipientData = await usersData.get(recipient);
    if (!senderData || !recipientData) {
      message.reply("Invalid users.");
      return;
    }
    if (senderData.money < amount) {
      message.reply("uang mu tidak cukup");
      return;
    }
    if (recipient == event.senderID) {
      api.sendMessage("kamu tidak dapat mengirim saldo ke diri sendiri", event.threadID)
    }
    else {
    await usersData.set(senderID, {
      money: senderData.money - amount
    });
    await usersData.set(recipient, {
      money: recipientData.money + amount
    });
    api.sendMessage(`${namaPengirim}
    transfer ${amount}$ ke akun mu`, event.userID = recipient);
    api.sendMessage(`${namaPengirim}  Berhasil mengirim ${amount}$ ke ${namaPenerima}`, event.threadID);
    }
  }
};
module.exports = LuxionCMD