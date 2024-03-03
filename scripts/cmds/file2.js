const fs = require('fs');

module.exports = {
  config: {
    name: "file2",
    aliases: ["f2"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: "Command to read file content from a specified directory."
    },
    longDescription: {
      en: "This command allows you to read the content of a file from a specific directory."
    },
    category: "File",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: "Command to read file content from a specified directory."
    }
  },

  onStart: async function({ api, event, args, message }) {
    if(args.length < 2) {
      api.sendMessage("Usage: `<file2 (directory name/no) | (file name)>`", event.threadID);
      return;
    }
    
    const directory = args[0];
    const filename = args[1];
    
    if(!fs.existsSync(directory)) {
      api.sendMessage(`Directory '${directory}' does not exist.`, event.threadID);
      return;
    }
    
    const filePath = `${directory}/${filename}`;
    if(!fs.existsSync(filePath)) {
      api.sendMessage(`File '${filename}' does not exist in directory '${directory}'.`, event.threadID);
      return;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage(fileContent, event.threadID);
  }
};