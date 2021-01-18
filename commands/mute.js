const ms = require("ms");

module.exports = {
  name: "Mute",
  description: "This mutes a member",
  execute(message, args, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      let member = message.guild.roles.cache.find((roles) => roles.name === "Boners");
      let mute = message.guild.roles.cache.find((roles) => roles.name === "Mute");
      let memberTarget = message.guild.members.cache.get(target.id);

      if (!args[1]) {
        memberTarget.roles.remove(member.id);
        memberTarget.roles.add(mute.id);
        const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${memberTarget.user.id}> has been muted`);
        message.channel.send(embed);
        return;
      }

      memberTarget.roles.remove(member.id);
      memberTarget.roles.add(mute.id);
      const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
      message.channel.send(embed);

      setTimeout(() => {
        memberTarget.roles.remove(mute.id);
        memberTarget.roles.add(member.id);
        const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${memberTarget.user.id}> has been unmuted`);
        message.channel.send(embed);
        return;
      }, ms(args[1]));
    } else {
      const embed = new Discord.MessageEmbed().setColor("#BB0033").setDescription("The user you mentioned doesnot exist");
      message.channel.send(embed);
    }
  },
};
