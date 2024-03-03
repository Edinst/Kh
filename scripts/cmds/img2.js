module.exports = {
  config: {
    name: "Img2",
    aliases: ["i"],
    version: "1.0",
    author: "GoatAI by Liane",
    cooldown: 5,
    role: 0,
    shortDescription: {
      en: "Convert image to Imgur link",
      tl: "I-convert ang imahe sa Imgur link"
    },
    longDescription: {
      en: "This command converts an image to an Imgur link by replying with the image.",
      tl: "Ang command na ito ay nagko-convert ng imahe sa Imgur link sa pamamagitan ng pagsagot sa imahe."
    },
    category: "goatBot",
    guide: {
      en: "{p}imgur [reply to an image]",
      tl: "{p}imgur [sagot sa isang imahe]"
    },
  },
  
  onStart: async function({ event, message, args, usersData, api }) {
    if (event.type !== "message_reply") {
      message.reply("Please reply to an image to use this command.");
      return;
    }

    const repliedMessage = await api.getMessageInfo(event.messageReply.messageID);
    const attachments = repliedMessage.attachments;
    
    if (!attachments || attachments.length === 0) {
      message.reply("The replied message must contain an image attachment.");
      return;
    }

    const imageAttachment = attachments[0];
    
    api.sendMessage({ body: imageAttachment.url }, event.threadID, (err, info) => {
      if (err) {
        message.reply("An error occurred while uploading the image to Imgur. Please try again later.");
        return;
      }
      
      message.reply(`Here is the Imgur link for the image: ${info.messageID}`);
    });
  }
};