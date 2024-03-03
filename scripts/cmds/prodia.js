module.exports = {
  config: {
    name: 'prodia',
    version: '1.0',
    author: 'Tashrif ',
    shortDescription: 'Generate an image.',
    longDescription: 'Generate an image.',
    category: 'Misc',
    guide: {
      en: '{pn} <prompt> | <model>',
    },
  },
  onStart: async function ({ api, event, args }) {
    try {
      const argString = args.join(' ');
      const [prompt, model] = argString.split('|').map(str => str.trim()); 

      if (!prompt || !model) {
        return api.sendMessage('Please provide a prompt and a model.', event.threadID);
      }

      const encodedPrompt = encodeURIComponent(prompt); 
      const providedURL = `https://prodia.aligned26.repl.co/generate?prompt=${encodedPrompt}&model=${model}`;
      api.sendMessage({
        attachment: await global.utils.getStreamFromURL(providedURL),
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing the prodia command.', event.threadID);
    }
  },
};