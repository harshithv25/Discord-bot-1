module.exports = {
  name: "Ban",
  description: "Bans a member",
  execute(message, args, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      if (message.member.permissions.has("BAN_MEMBERS")) {
        if (args[1]) {
          let user = message.guild.members.cache.get(target.id);
          user.ban(`${args[1]}`).catch(() => {
            const embed = new Discord.MessageEmbed()
              .setColor("#FFB400")
              .setAuthor("Discord")
              .setDescription(`Oops! Something went wrong....Please try again later`);
            message.channel.send(embed);
            return;
          });
          const embed = new Discord.MessageEmbed()
            .setColor("#FFB400")
            .setDescription(`${user} has been struck by the ban hammer off ${message.author} for '**${args[1]}**'`);
          message.channel.send(embed);
        } else {
          console.log(args[-1], args);
          const embed = new Discord.MessageEmbed().setColor("#BB0022").setDescription(`Please provide the reason to ban in one word....`);
          message.channel.send(embed);
        }
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("#BB0022")
          .setDescription(`You do not have the permissions to ban....Please contact the server owner`);
        message.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed().setColor("#BB0022").setDescription(`Please tag the person you want to ban`);
      message.channel.send(embed);
    }
  },
};
