module.exports = {
    config: {
        name: "hello",
        aliases: ["hi"],
        version: "1.0",
        author: "EDINST",
        countDown: 10,
        role: 0,
        shortDescription: {
            en: "Say hello and wait for 5 seconds"
        },
        longDescription: {
            en: "This command allows the bot to respond with 'hello' and wait for 5 seconds before removing the message"
        },
        category: "ai chat",
        guide: {
            en: "Just type '!hello' and the bot will respond with 'hello'. The message will disappear after 5 seconds."
        }
    },
    langs: {
        en: {
            gg: ""
        }
    },

    onStart: async function({ api, event, args, message }) {
        try {
            await api.sendMessage("hello", event.threadID);
            await api.sendMessage("Tunggu sebentar...", event.threadID);

            setTimeout(async function() {
                const threadInfo = await api.getThreadInfo(event.threadID);
                const lastMessageID = threadInfo.messageIDs[threadInfo.messageCount - 1];
                await removeMessage(api, event.threadID, lastMessageID);
            }, 5000);
        } catch (err) {
            console.log(err);
        }
    }
};

async function removeMessage(api, threadID, messageID) {
    await api.unsendMessage(messageID);
}