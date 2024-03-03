module.exports = {
  config: {
    name: "timer",
    aliases: ["t"],
    version: "1.1",
    author: "EDINST",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Set timer for a specified duration."
    },
    longDescription: {
      en: "Use this command to set a timer for a specified duration."
    },
    category: "Tools",
    guide: {
      en: "Usage: {p}timer (time) (seconds/minutes/hours)"
    }
  },

  langs: {
    en: {
      gg: "Timer done!"
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const time = parseInt(args[0]);
      const unit = args[1].toLowerCase();

      if (isNaN(time) || (unit !== "seconds" && unit !== "minutes" && unit !== "hours")) {
        api.sendMessage("invalid syntax ⚠ \nadd minutes/second/hours", event.threadID);
        return;
      }

      let durationInMilliseconds;

      switch (unit) {
        case "second":
          durationInMilliseconds = time * 1000;
          break;
        case "minutes":
          durationInMilliseconds = time * 60000;
          break;
        case "hours":
          durationInMilliseconds = time * 3600000;
          break;
      }

      setTimeout(() => {
        api.sendMessage("Timer done!", event.threadID);
      }, durationInMilliseconds);

      api.sendMessage(`Timer set for ${time} ${unit}.`, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};