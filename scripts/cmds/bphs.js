module.exports = {
  config: {
    name: 'result',
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
      const providedURL = `https://bphs.edu.bd/site/mark_sheet_all/bphs_results.php?eiin=111774&year=2023&term=Final&class=EIGHT&grup=NONE&section=B&croll=${encodedPrompt}`;
      api.sendMessage({
        attachment: await global.utils.getStreamFromURL(providedURL),
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing the prodia command.', event.threadID);
    }
  },
};