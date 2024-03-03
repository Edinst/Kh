module.exports = {
  config: {
    name: "facepalm",
    aliases: [],
    version: "1.0",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Send a facepalm emoji.",
      tl: "Ipadala ang facepalm emoji."
    },
    longDescription: {
      en: "This command sends a facepalm emoji as a response.",
      tl: "Ang command na ito ay nagpapadala ng facepalm emoji bilang tugon."
    },
    category: "goatBot",
    guide: {
      en: "{p}facepalm",
      tl: "{p}facepalm"
    },
  },

  onStart: async function ({ message }) {
    message.reply("🤦"); // Send the facepalm emoji as a response
  },
};