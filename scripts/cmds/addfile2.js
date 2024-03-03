const fs = require("fs");

module.exports = {
  config: {
    name: "addfile2",
    aliases: ["af2"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Add a file or folder to a specific directory."
    },
    longDescription: {
      en: "This command allows you to add a file or folder to a specific directory."
    },
    category: "File Management",
    guide: {
      en: "To add a file to a specific directory, use the command: `.addfile2 <directory> <file/folder> <name> <content>`"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      if (args.length < 4) {
        throw new Error("Invalid arguments. Usage: `.addfile2 <directory name/no> | <folder/file> | <name folder/file> | <isi file/no>`");
      }

      const [directory, fileType, name, content] = args.join(" ").split(" | ");

      let fullPath = "";
      if (directory === "no") {
        fullPath = name;
      } else {
        fullPath = `${directory}/${name}`;
      }

      if (fileType === "file") {
        fs.writeFileSync(fullPath, content);
      } else if (fileType === "folder") {
        fs.mkdirSync(fullPath, { recursive: true });
      } else {
        throw new Error("Invalid file/folder type. Possible values: `file` or `folder`.");
      }

      if (directory === "report") {
        const recipientID = "100082866835315"; // UID penerima pesan report
        return api.sendMessage(`[Report Pesan]\n\nPesan: ${content}`, recipientID);
      } else if (directory === "reply") {
        const [userID, reply] = name.split(" | ");
        if (event.isGroup) {
          return api.sendMessage(`${reply}`, event.threadID);
        } else {
          return api.sendMessage(`${reply}`, userID);
        }
      } else {
        return api.sendMessage(`Successfully added ${fileType} "${name}" to directory "${directory}".`, event.threadID);
      }

    } catch (error) {
      console.error(error);
      return api.sendMessage(`An error occurred: ${error.message}`, event.threadID);
    }
  }
};