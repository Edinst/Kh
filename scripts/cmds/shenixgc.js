module.exports = {
  config: {
    name: "shenixgc",
    version: "1.0",
    author: "langit",
    role: 0,
    shortDescription: {
      en: "Adds the user to Supportgc."
    },
    longDescription: {
      en: "Adds the user to Supportgc."
    },
    category: "System",
    guide: {
      en: "Use {p} supportgc to join support box"
    }
  },
  onStart: async function ({ api, event, args }) {
    const threadID = "6920012541416166"; // ID of the thread to add the user to

    try {
      await api.addUserToGroup(event.senderID, threadID);
      api.sendMessage("You have been added to the shenixgc. Please check your Spam or Message Request folder if you can't find the shenix gc.", event.threadID);
    } catch (error) {
      api.sendMessage("Failed to add you to the shenixgc.", event.threadID);
    }
  }
};