const axios = require("axios");

module.exports = {
  config: {
    name: "cat",
    version: "1.0",
    author: "Sheikh Farid",
    countDown: 5,
    role: 0,
    category: "cat-ai"
  },
  onStart: async function({ message, event, args, commandName }) {
    if (this.config.author !== "Sheikh Farid") {
      message.reply(`bro you change the credit? (real author: sheikh farid)`)    
    }
    
    const messages = args.join(' ');
    
    try {
      const response = await axios.get(`https://cat.catbot24.repl.co/api/box?query=${encodeURIComponent(messages)}`);

      if (response.data && response.data.answer) {
        const answer = response.data.answer;
        const answers = `${answer}`;
        message.reply("｡◕‿◕｡ cat ai:\n" + answer, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } 

    } catch (error) {
      console.error("❎ | Error:", error.message);
    }
  },

  onReply: async function({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID != author) return;
    const message2 = args.join(' ');
   
      try {
        const response = await axios.get(`https://cat.catbot24.repl.co/api/box?query=${encodeURIComponent(message2)}`);
        
        if (response.data && response.data.answer) {
          const answer = response.data.answer;
          const answers = `${answer}`;
          message.reply("｡◕‿◕｡ cat ai:\n" + answers,
            (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          });
        } 

      } catch (error) {
        console.error("❎ | Error:", error.message);
      }
  }
};