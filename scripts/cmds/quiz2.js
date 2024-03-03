const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "quiz2",
    aliases: ['mcq', 'mcqs'],
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    category: "quiz"
  },

  onReply: async function ({ args, event, api, Reply, commandName, usersData }) {
    const { dataGame, answer, nameUser } = Reply;
    if (event.senderID !== Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        const userReply = event.body.toLowerCase();

        if (userReply === answer.toLowerCase()) {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const reward = Math.floor(Math.random() * (1002 - 300 + 1)) + 300; // Random reward between 300 and 1002
          const balData = JSON.parse(fs.readFileSync('./data/bal.json', 'utf8'));
          const userBal = balData.find(item => item.fbid === event.senderID);
          if (userBal) {
            userBal.gold += reward;
          } else {
            balData.push({ fbid: event.senderID, gold: reward, lastClaimDate: "" });
          }
          fs.writeFileSync('./data/bal.json', JSON.stringify(balData)); // Update the bal.json file
          const msg = {
            body: `✅ | ${nameUser}, Your answer is correct and you earned ${reward} Coins!`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID);
          const msg = `❌ | ${nameUser}, The answer is incorrect : (correct answer is: ${answer})`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://jarif99.ameliagadha.repl.co/quiz?apikey=jarif99');
      const quizData = response.data;
      const JARiF = response.data;
      const { question, answer } = quizData;
      const { A, B, C, D } = JARiF;
      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: `${question} 

(A) ${A}
(B) ${B}
(C) ${C}
(D) ${D}

Reply with the answer`,
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: quizData,
          answer,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  }
};