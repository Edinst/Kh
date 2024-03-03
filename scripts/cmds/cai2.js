const axios = require("axios");

const api = "https://www.llama2.ai/api";

module.exports = {
  config: {
    name: 'cai2',
    author: 'EDINST',
    version: '1.0.0',
    role: 0,
    category: 'ai chat'
  },
  onStart: async function({ args, message }) {
    const prompts = args.join(' ').split('|');
    const prompt = prompts[0].trim();
    const prompt2 = prompts[1].trim();

    const data = {
      "prompt": `[INST] ${prompt} [/INST]\n`,
      "model": "meta/llama-2-70b-chat",
      "systemPrompt": ` ${prompt2} `,
      "temperature": 0.75,
      "topP": 0.9,
      "maxTokens": 800,
      "image": null,
      "audio": null
    };

    try {
      const response = await axios.post(api, data);
      api.sendMessage(response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }
};