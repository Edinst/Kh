module.exports = {
  config: {
    name: "ClearBlur",
    aliases: ["clearblur"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Remove blur from an image",
    },
    longDescription: {
      en: "This command will remove blur from an image. It uses a neural network to sharpen the image.",
    },
    category: "tools",
    guide: {
      en: "To use this command, simply send the link to the image you want to sharpen. The command will then return a new image with the blur removed.",
    },
  },
  langs: {
    en: {
      gg: "https://images.google.com/",
    },
  },

  onStart: async function({ api, event, args, message }) {
    try {
      if (args.length !== 1) {
        message.reply("Usage: `.clearblurr <link to image>`");
        return;
      }

      const imageUrl = args[0];
      const imageData = await api.files.get(imageUrl);

      // Use a neural network to sharpen the image
      const sharpenedImage = await api.nn.sharpenImage(imageData);

      // Send the sharpened image back to the user
      message.reply({
        attachment: {
          type: "image",
          url: api.files.upload(sharpenedImage),
        },
      });
    } catch (error) {
      message.reply(error.message);
    }
  },
};