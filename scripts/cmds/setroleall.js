module.exports = {
  config: {
    name: "setroleall",
    version: "1.0",
    author: "NTKhang",
    role: 1,
    shortDescription: {
      en: "Edit role of all commands"
    },
    longDescription: {
      en: "Edit role of all commands (commands with role < 2)"
    },
    category: "info",
    guide: {
      en: "{pn} <new role>: set new role for all commands"
    }
  },

  langs: {
    en: {
      noPermission: "❗ Only admin can use this command",
      invalidRole: "❗ New role must be an integer",
      changedRole: "Changed role of all commands to %1"
    }
  },

  onStart: async function ({ message, event, args, role, getLang }) {
    if (!args[0] || isNaN(args[0])) {
      return message.SyntaxError();
    }

    if (role < 1) {
      return message.reply(getLang("noPermission"));
    }

    const newRole = parseInt(args[0]);

    if (isNaN(newRole)) {
      return message.reply(getLang("invalidRole"));
    }

    const { commands } = global.GoatBot;

    commands.forEach(command => {
      if (command.config.role < 3) {
        command.config.role = newRole;
      }
    });

    message.reply(getLang("changedRole", newRole));
  }
};