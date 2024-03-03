const LuxionCMD = {
  config: {
    name: "c", // cardinal command
    version: "1.0",
    author: "Luxion", // jangan diubah
    countDown: 5,
    role: 2,
    sortDescription: "",
    longDescription: "Perintah Cardinal",
    category: "command",
    guide: "{pn} <task>"
  },
  onStart: async function({ api, message, args, event, threadsData, usersData }) {
    const Data = args[0];
    const Brain = args[0];
    const Task = args.join(" ");
    const idLanjutan = args.slice(1).join("");
    const threadData2 = await threadsData.get(event.threadID == idLanjutan);
    const threadData = await threadsData.get(event.threadID);
    const namaGC = threadData.threadName;
    const namaGC2 = threadData.threadName;
    const IDgc = event.threadID;
    switch (Brain) {
      case "gi": {
        const group = args.slice(1).join(" ");
        if (group == event.threadID) {
          const totalMember = Object.values(threadData.members).filter(item => item.inGroup);

          const cowok = totalMember.filter(item => item.gender == "MALE").length;

          const cewek = totalMember.filter(item => item.gender == "FEMALE").length;

          const createdDate = new Date(threadData.createdAt);
          const formattedDate = createdDate.toLocaleString("id-ID", { timeZone: "UTC" });

          api.sendMessage(`𝗚𝗿𝗼𝘂𝗽 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻\n \n𝗡𝗮𝗺𝗮: ${namaGC}\n𝗜𝗗: ${IDgc}\n\n𝗠𝗲𝗺𝗯𝗲𝗿: ${totalMember.length}\n\n𝗚𝗲𝗻𝗱𝗲𝗿: 𝗠𝗮𝗹𝗲: ${cowok}, 𝗙𝗲𝗺𝗮𝗹𝗲: ${cewek}\n\n𝗗𝗮𝘁𝗮 𝗣𝗲𝗺𝗯𝘂𝗮𝘁𝗮𝗻: ${formattedDate} WIB`, event.threadID);
        } else {
          api.sendMessage(`Nama: ${namaGC2}`, event.threadID);
        }
        break;
      }
      default: {
        api.sendMessage(`${this.config.guide}`, event.threadID);
        break;
      }
    }
  }
};
module.exports = LuxionCMD;