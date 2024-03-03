const axios = require('axios');
const fs = require('fs');
const balanceFilePath = "data/bal.json"

module.exports = {
  config: {
    name: 'gpt4',
    version: '2.5',
    author: 'JV Barcenas', // do not change
    role: 0,
    category: 'Ai chat',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function ({ api, event }) {
    try {
      const prompt = event.body.trim();

      const fbid = event.senderID;
    const isBalanceEnough = reduceGold(fbid);
    if (!isBalanceEnough) {
      return message.reply("Not enough gold coins. Please check your balance.");
    }
      if (prompt) {
        await api.sendMessage("Answering your question. Please wait a moment...", event.threadID);

        const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

        if (response.status === 200 && response.data && response.data.content) {
          const messageText = response.data.content.trim();
          await api.sendMessage(messageText, event.threadID);
          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `cek your balance, gpt4 is not free command you need 2000 gold coin for use gpt4`,
        event.threadID
      );
    }
  },
};

function reduceGold(fbid) {
  const balanceData = JSON.parse(fs.readFileSync(balanceFilePath, 'utf8'));
  const userBalance = balanceData.find((data) => data.fbid === fbid);
  if (userBalance) {
    if (userBalance.gold >= 2000) {
      userBalance.gold -= 2000;
      fs.writeFileSync(balanceFilePath, JSON.stringify(balanceData));
      return true;
    }
  }
  return false;
}