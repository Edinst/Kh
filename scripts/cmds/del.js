module.exports = {
  config: {
    name: "delete",
    aliases: ["del"],
    author: "S",
    role: 2,
    category: "system"
  },

  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');

    const fileNames = args; // Get the list of file names as arguments

    if (fileNames.length === 0) {
      api.sendMessage("Please provide file names to delete.", event.threadID);
      return;
    }

    fileNames.forEach(function (fileName) {
      const filePath = path.join(__dirname, fileName);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          api.sendMessage(`❎ | Failed to delete ${fileName}.`, event.threadID);
          return;
        }
        api.sendMessage(`✅ ( ${fileName} ) Deleted successfully!`, event.threadID);
      });
    });
  }
};