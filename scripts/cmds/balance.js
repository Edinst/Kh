const fs = require("fs");

module.exports = {
 config: {
 name: "balance",
 aliases: "bal",
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

 onStart: async function({ api, event, args, message }) {
 try {
 const uid = event.senderID;
 const balPath = "data/bal.json";

 const dataRaw = fs.readFileSync(balPath);
 const data = JSON.parse(dataRaw);

 let userExists = false;
 for (let i = 0; i < data.length; i++) {
 if (data[i].fbid === uid) {
 userExists = true;
 break;
 }
 }

 if (!userExists) {
 data.push({ fbid: uid, gold: "0" });
 }

 api.sendMessage(`here your gold coin: \n \n${getGoldByFbid(data, uid)}`, event.threadID);

 fs.writeFileSync(balPath, JSON.stringify(data));
 } catch (error) {
 console.error(error);
 }
 }
};

function getGoldByFbid(data, fbid) {
 for (let i = 0; i < data.length; i++) {
 if (data[i].fbid === fbid) {
 return data[i].gold;
 }
 }
 return 0;
}