module.exports = {
  name: "Kick",
  description: "Kicks a member",
  execute(message, args, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      if (message.member.permissions.has("KICK_MEMBERS")) {
        if (args[1]) {
          let user = message.guild.members.cache.get(target.id);
          user.kick(`${args[1]}`).catch(() => {
            const embed = new Discord.MessageEmbed()
              .setColor("#FFB400")
              .setAuthor("Discord")
              .setDescription(`Oops! Something went wrong....Please try again later`);
            message.channel.send(embed);
            return;
          });
          const embed = new Discord.MessageEmbed()
            .setColor("#FFB400")
            .setDescription(`${user} has been kicked by ${message.author} for '**${args[1]}**'`);
          message.channel.send(embed);
        } else {
          console.log(args[-1], args);
          const embed = new Discord.MessageEmbed().setColor("#BB0022").setDescription(`Please provide the reason to kick in one word....`);
          message.channel.send(embed);
        }
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("#BB0022")
          .setDescription(`You do not have the permissions to kick....Please contact the server owner`);
        message.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed().setColor("#BB0022").setDescription(`Please tag the person you want to kick`);
      message.channel.send(embed);
    }
  },
};
