const axios = require('axios');
const badWords = ["gay", "pussy", "dick","nude"," without","clothes","sugar","fuck","fucked","step","🤭","🍼","shit","bitch","hentai","🥵","clothes","sugar","fuck","fucked","step","?","?","shit","bitch","hentai","?","sex","fuck","boobs","cute girl undressed","undressed", "nude","without clothes", "without cloth"];

module.exports = {
  config: {
    name: 'imagine2',
    version: '1.0',
    author: 'Ohio03',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Draw an image based on a prompt using Prodia model.'
    },
    category: 'ai',
    guide: {
      en: '{pn} <prompt> | <style> | <model>' 
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const info = args.join(' ');
      const [prompt, style, model] = info.split('|').map(item => item.trim());
      const text = args.join(" ");
      
      if (!text) {
        return message.reply("❎ | Please Provide a Prompt");
      }
      
      if (!style || !model) {
        return message.reply("❎ | Please Provide Style and Model");
      }
      
      if (containsBadWords(prompt)) {
        return message.reply('❎ | NSFW Prompt Detected');
      }
      
      const apiUrl = `https://prodia.api-tu33rtle.repl.co/api/generate?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(style)}&model=${model}`;
      
      await message.reply('Please Wait...⏳');
      
      const form = {};
      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);
      
      message.reply(form);
    } 
    
    catch (error) {
      console.error(error);
      await message.reply('❎ | Sorry, API Have Skill Issue');
    }
  }
};

function containsBadWords(prompt) {
  const promptLower = prompt.toLowerCase();
  return badWords.some(badWord => promptLower.includes(badWord));
}