module.exports = {
  config: {
    name: "Hunt",
    aliases: ["hunt"],
    version: "1.0",
    author: "Rizky",
    countDown: 10,
    role: 0,
    shortDescription: { en: "hunt" },
    longDescription: { en: "hunt to get dollar" },
    category: "games",
    guide: { en: "" },
  },
  onStart: async function({ api, event, usersData, args, message }) {
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const hadi = userData ? userData.money : 120;
    const rizky = "Rizky";
    const pilihan = Math.random() < 0.5 ? hadi : rizky;
    await api.sendMessage(`kamu berhasil ${pilihan}`, event.threadID);
  }
};