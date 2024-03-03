module.exports.config = {
	name: "shell",
	version: "1.0",
	role: 2,
	author: "OtinXSandip",
	description: {
    en: "running shell",
	Category: "System",

	}
};
module.exports.onStart = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100082866835315"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("Bro who are you again ?", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`stderr: \n${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`stdout: \n${stdout}`, event.threadID, event.messageID);
});
}