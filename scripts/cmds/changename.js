module.exports = {
  config: {
    name: "changename",
    aliases: ["cn"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Change the name of the bot"
    },
    longDescription: {
      en: "This command allows you to change the name of the bot."
    },
    category: "tools",
    guide: {
      en: "To use this command, type /changename [new name]."
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      if (!args[0]) return api.sendMessage("Please provide a new name.", event.threadID);
      
      // Check if the bot has permission to change its name
      if (!api.canChangeNickname()) return api.sendMessage("Sorry, I don't have permission to change my name.", event.threadID);
      
      const newName = args.join(" ");
      
      // Change the name of the bot
      api.changeNickname(newName);
      
      api.sendMessage(`Bot name has been changed to "${newName}".`, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};