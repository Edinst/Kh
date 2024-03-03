const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

const LuxionCMD = {
 config: {
   name: "report2",
   version: "1.0",
   author: "Luxion", // Jangan diubah
   countDown: 5,
   role: 0,
   sortDescription: "",
   longDescription: "",
   category: "testing command",
   guide: "{pn} <tuliskan sesuatu>"
 },
 langs: {
   en: {
     laporanKosong: "Tuliskan Sesuatu.",
     gc: "\nNama Group: %1\nTID: %2\n",
     pengirim: "Nama: %1\nID: %2\n\nLink: https://facebook.com/%2\n",
     laporan: "\n\nPesan:\n%1"
   }
 },
 onStart: async function({ api, message, args, event, threadsData, usersData, getLang, commandName }) {
   const LuxionReport = (!args[0]);
   if (LuxionReport) {
     return api.sendMessage(getLang("laporanKosong"), event.threadID);
   }
   const { senderID, threadID, isGroup } = event;
   const senderName = await usersData.getName(senderID);
   const informasi = `🔱𝗟𝗔𝗣𝗢𝗥𝗔𝗡🔱\nNama: ${senderName}\nID: ${senderID}\nLink: https://facebook.com/${senderID}` + (isGroup ? getLang("gc", (await threadsData.get(threadID)).threadName, threadID) : getLang("gc"));
   const pesan = {
     body: informasi + getLang("laporan", args.join(" ")),
     mentions: [{
       id: senderID,
       tag: senderName
     }],
     attachment: await getStreamsFromAttachment(
       [...event.attachments, ...(event.messageReply?.attachments || [])]
         .filter(item => mediaTypes.includes(item.type))
     )
   };
   try {
     const msg1 = await api.sendMessage(pesan, event.threadID);
     const msg2 = await api.sendMessage(pesan, event.boxID);
     // Reply to pesan report dengan balasan kita
     const replyMessage = {
       body: `Reply dari ${senderName}`,
       replyTo: msg1.messageID // Menandakan bahwa ini adalah balasan untuk pesan sebelumnya
     };
     api.sendMessage(replyMessage, event.threadID);
   } catch (error) {
     console.log(error);
   }
 }
};

module.exports = LuxionCMD;