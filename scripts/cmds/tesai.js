const axios = require("axios");

const api = "https://api--kurgtahu.repl.co/ai/";

module.exports = {
  config: {
    name: 'tesai',
    author: 'Allou Mohamed',
    version: '1.0.0',
    role: 2,
    category: 'الذكاء'
  },
 onStart: async function({ args, message }) {
    const prompt = args.join(' ');

    const data = {
      "prompt": `[INST] ${prompt} /INST]\n`,
      "systemPrompt": "You are a helpful assistant.",
      "temperature": 0.75,
      "topP": 0.9,
      "maxTokens": 800,
      "image": null,
      "audio": null
    };

    try {
      const response = await axios.post(api, data);
      message.reply(response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }
};