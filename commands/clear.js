module.exports = {
  name: "ClearMsgs",
  description: "Clears mesasges",
  async execute(message, args, Discord, wrong, right) {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription("Please enter the number of messages you want to clear");
      return message.reply(embed);
    }
    if (isNaN(args[0])) {
      const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription("Please enter the **number** of messages you want to clear");
      message.reply(embed);
      return;
    }
    if (args[0] > 50) {
      const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription("You cannot delete more than a 100 messages at a time");
      return message.reply(embed);
    }
    if (args[0] <= 0) {
      const embed = new Discord.MessageEmbed()
        .setColor("#00E503")
        .setDescription(`You cannot delete ${args[0]} messages.....Please enter a number greater than 0`);
      return message.reply(embed);
    }
    await message.channel.messages.fetch({ limit: args[0] }).then((msgs) => {
      message.react("👌🏻");
      message.channel.bulkDelete(msgs).catch(() => {
        message.reactions.removeAll(), message.react("⚔️");
      });
    });
  },
};
