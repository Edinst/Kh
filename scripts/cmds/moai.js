const axios = require('axios');

module.exports = {
    config: {
        name: "moai",
        aliases: ["batu"],
        version: "1.0",
        author: "Riley Nelson",
        countdown: 5,
        shortDescription: "",
        longDescription: "",
        category: "ai",
        guide: "{pn}"
    },

    onStart: async function ({ message, args, api, event, usersData }) {
        const senderID = event.senderID;
        const n = await usersData.getName(senderID);
        const response = args.join(" ");

        if (args.length === 0) {
            message.reply("Tuliskan pertanyaan atau kueri.");
            return;
        }

        const typ = api.sendTypingIndicator(event.threadID);

        try {
            const encodedResponse = encodeURIComponent(response);
            const res = await axios.get(`https://batu-ai--useless18.repl.co/i/${encodedResponse}?name=${n}`);
            typ();
            const m = res.data.reply;

            message.reply(`${m}`);
        } catch (error) {
            console.error(error);
            message.reply(`${error.message}`);
        }
    }
};