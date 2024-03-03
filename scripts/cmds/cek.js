module.exports = {
  config: {
    name: "cek",
    aliases: ["ck"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Check your zodiac sign"
    },
    longDescription: {
      en: "Send a series of questions to determine your zodiac sign"
    },
    category: "Fun",
    guide: {
      en: "To use this command, type `.cek zodiak`"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    // Define an array of questions
    const questions = [
      "Apa warna favoritmu? (a) Merah (b) Biru (c) Hijau (d) Kuning",
      "Apa jenis makanan favoritmu? (a) Mie Ayam (b) Pizza (c) Sushi (d) Nasi Goreng",
      "Mana yang lebih kamu sukai untuk liburan? (a) Pantai (b) Gunung (c) Kota (d) Pedesaan",
      "Apa hewan peliharaan favoritmu? (a) Anjing (b) Kucing (c) Burung (d) Ikan",
      "Apa jenis musik favoritmu? (a) Pop (b) Rock (c) EDM (d) Klasik"
    ];

    // Store the user responses
    const responses = [];

    // Send the questions and wait for user responses
    for (let i = 0; i < questions.length; i++) {
      await api.sendMessage(questions[i], event.threadID);
      const response = await new Promise((resolve) => {
        api.listen((err, event) => {
          if (event.type === "message" && event.senderID === api.getCurrentUserID()) {
            resolve(event.body);
          }
        });
      });
      responses.push(response);

      // Remove the sent question
      await api.deleteMessage(event.body[i].messageID);
    }

    // Calculate the zodiac sign based on the responses
    let zodiac = "";
    let countA = 0, countB = 0, countC = 0, countD = 0;
    for (let i = 0; i < responses.length; i++) {
      const answer = responses[i].toLowerCase();
      switch(answer) {
        case "a":
          countA++;
          break;
        case "b":
          countB++;
          break;
        case "c":
          countC++;
          break;
        case "d":
          countD++;
          break;
      }
    }

    // Determine the zodiac sign based on the highest count
    if (countA >= countB && countA >= countC && countA >= countD) {
      zodiac = "Aries";
    } else if (countB >= countA && countB >= countC && countB >= countD) {
      zodiac = "Leo";
    } else if (countC >= countA && countC >= countB && countC >= countD) {
      zodiac = "Sagittarius";
    } else if (countD >= countA && countD >= countB && countD >= countC) {
      zodiac = "Aquarius";
    }

    // Send the result
    const resultMessage = `Zodiak kamu kemungkinan adalah ${zodiac}`;
    await api.sendMessage(resultMessage, event.threadID);
  }
};