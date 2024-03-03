const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ SHENIX COMPANY ]";

module.exports = {
  config: {
    name: "help2",
    version: "1.17",
    author: "NTKhang", //Re code by Luxion
    countDown: 5,
    role: 0,
    shortDescription: "Daftar Perintah",
    longDescription: "Melihat daftar perintah",
    category: "info",
    guide: "{pn}",
    priority: 1
  },

  onStart: async function({ message, args, event, threadsData, role, api }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";
      msg += `DAFTAR COMMAND`;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;
        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach(category => {
        if (category !== "info") {
          msg += `\n\n •${category.toUpperCase()} `;

          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names
              .slice(i, i + 3)
              .map(item => `${item},`);
            msg += `\n ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n__________________________\n`;
        }
      });

      const totalCommands = commands.size;
      msg += `\nTotal Perintah: ${totalCommands}\n`;
      msg += `gunakan perintah ${prefix}help <command> untuk informasi lebih lanjut`;
      msg += `\n\n        SHENIX COMPANY`;

      await api.sendMessage(
        {
          body: msg
        },
        event.senderID
      );
      api.sendMessage("perintah berhasil dikirim ke DM", event.threadID);
    } else {
      const commandName = args[0].toLowerCase();
      const command =
        commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription
          ? configCommand.longDescription.en || "No description"
          : "No description";
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody
          .replace(/{pn}/g, prefix)
          .replace(/{n}/g, configCommand.name);
        const response = `INFORMASI PERINTAH\n
• Nama: ${configCommand.name}
• Deskripsi: ${longDescription}
• Nama Lain: ${
          configCommand.aliases ? configCommand.aliases.join(", ") : "Tidak Ada"
        }
• Nama Lain dalam group: Tidak Ada
• Versi: ${configCommand.version || "1.0"}
• Role: ${roleText}
• Cooldown: ${configCommand.countDown || 1}s
• Author: ${author}
\n•Usage:
 ${usage}`;

        await message.reply(response);
      }
    }
  }
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (User)";
    case 1:
      return "1 (Admin Group)";
    case 2:
      return "2 (Admin Bot)";
    default:
      return "Unknown role";
  }
}