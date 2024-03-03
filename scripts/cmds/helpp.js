module.exports = {
 config: {
 name: "help",
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
 const command = args[0];
 if (command === 'ai') {
 message.reply(`╭── AI CHAT ★ (6)
│ aimoji
│ bard2
│ ask
│ bard
│ gpt2
│ gpt4
├─── AI - IMAGE ★ (6)
│ Imagine
│ sdxl
│ sdxl2
│ rbg
│ art
│ rbg2
├─── AI GENERATE ★(1)
│ basicai
╰───★`);
 } else if (command === 'misc') {
 message.reply(`╭── MISC - USELESS AND IMAGE ★ 
│ example
│ games
│ media
│ ping
│ test
│ timer
│ transcribe
├─── UTILITY ★
│ accept
│ cat
│ cdp
│ encrypt
│ image
│ imgbb
│ info
│ math
│ morse
│ qr
│ remini
│ translate
│ userinfo
│ wiki
│ pastebin
│ screenshot
│ emojimean 
│ emojimix 
├─── PROJECT ★
│ pixelart
╰─── WRITE ★`);
 } else if (command === 'all') {
  // Loop through the commands folder and retrieve all command names
  const fs = require('fs');
  const path = require('path');
  const cmdsPath = path.join(__dirname, 'scripts', 'cmds');
  const files = fs.readdirSync(cmdsPath);
  const commandNames = files
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const cmdPath = path.join(cmdsPath, file);
      const command = require(cmdPath);
      return command.config.name;
    });
    
  const response = `╭── ALL COMMANDS ★ (${commandNames.length})
│ ${commandNames.join("\n│ ")}
╰───★`;

  message.reply(response);
 } else {
 message.reply("use /help (misc/ai/all) to view commands");
 }
 } catch (error) {
 console.error(error);
 }
 }
};