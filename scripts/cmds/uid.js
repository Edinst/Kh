const fs = require('fs');

const data = fs.readFileSync('tesid.json', 'utf8');
let tesid = [];

if (data) {
  tesid = JSON.parse(data);
}

module.exports = {
  config: {
    name: "uid",
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
    category: "Economy - update",
    guide: {
      en: ""
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    try {
      const senderID = event.senderID;

      const user = tesid.find(user => user.uidfb === senderID);

      if (user) {
        const fakeID = user.fakeid;

        api.sendMessage(`Your fake ID: ${fakeID} \nyour Facebook id: ${senderID}`, event.threadID);
      } else {
        const nickname = await usersData.getName(senderID);
        const username = nickname.split(" ")[0];
        const newUser = {
          username: username,
          fakeid: generateFakeID(),
          usernamefb: nickname,
          uidfb: senderID
        };

        tesid.push(newUser);
        fs.writeFileSync('tesid.json', JSON.stringify(tesid));

        const newData = fs.readFileSync('tesid.json', 'utf8');
        console.log(JSON.parse(newData)); // Cek apakah data baru berhasil ditulis ke file

        api.sendMessage(`Your fake ID: ${newUser.fakeid}`, event.threadID);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

function generateFakeID() {
  let fakeID = "";

  for (let i = 0; i < 3; i++) {
    fakeID += Math.floor(Math.random() * 10).toString();
  }

  fakeID += " ";

  for (let i = 0; i < 3; i++) {
    fakeID += Math.floor(Math.random() * 10).toString();
  }

  return fakeID;
}