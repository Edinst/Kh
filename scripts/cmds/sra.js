const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "setroleall",
    aliases: ["sra"],
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

  onStart: async function({ api, event, args, message }) {
    try {
      const newRole = parseInt(args[0]);
      
      const directoryPath = path.join(__dirname, '../scripts/cmds');
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        } 
        
        files.forEach(function (file) {
          const filePath = path.join(directoryPath, file);
          fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
              return console.log('Error reading file: ' + err);
            }

            // Ubah nilai role di dalam file cmd
            const updatedData = data.replace(/role: \d+/, `role: ${newRole}`);
            
            fs.writeFile(filePath, updatedData, 'utf8', function (err) {
              if (err) {
                return console.log('Error writing file: ' + err);
              }
            });
          });
        });
      });
      
      api.sendMessage(`Role semua cmd telah diubah menjadi ${newRole}`, event.threadID);
    } catch (error) {
      api.sendMessage(`Terjadi kesalahan: ${error.message}`, event.threadID);
    }
  }
};