module.exports = {
    config: {
        name: "rampok",
        version: "1.0",
        author: "EDINST",
        role: 0,
        longDescription: {
            en: "rampok uang pengguna (jangan merampok woy)"
        },
        category: "Economy",
        guide: {
            en: "{pn} (mention) (jumlah)"
        }
    },

    onStart: async function ({ api, usersData, event, args, message }) {
        try {
            const senderID = event.senderID;

            const mentionedUser = message.mentions[0] || "";
            const amount = parseInt(args[2]) || 0;
            if (!mentionedUser || amount <= 0) {
                api.sendMessage("Mohon berikan nama pengguna yang ingin kamu curi dan jumlah uang yang ingin kamu ambil.", event.threadID);
                return;
            }

            const userData = await usersData.get(mentionedUser);
            if (!userData) {
                api.sendMessage("Maaf, pengguna tidak ditemukan.", event.threadID);
                return;
            }

            const successRate = 0.3;
            const randomNumber = Math.random();
            const isSuccess = randomNumber < successRate;

            if (isSuccess) {
                const hasilAmbil = Math.floor(userData.money * (Math.random() * (0.1 - 0.05) + 0.05));

                await usersData.set(mentionedUser, {
                    money: userData.money - hasilAmbil,
                    data: userData.data
                });

                api.sendMessage(`Berhasil mengambil uang dari ${mentionedUser} sebanyak ${hasilAmbil}!`, event.threadID);
            } else {
                api.sendMessage(`Gagal mengambil uang dari ${mentionedUser}.`, event.threadID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage(error, event.threadID);
        }
    }
};