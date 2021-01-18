module.exports = {
  name: "Unmute",
  description: "This unmutes a member",
  execute(message, args, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      let member = message.guild.roles.cache.find((roles) => roles.name === "Boners");
      let mute = message.guild.roles.cache.find((roles) => roles.name === "Mute");
      let memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.roles.remove(mute.id).catch(() => {
        const noroleEmbed = new Discord.MessageEmbed().setColor("#BB0033").setDescription(`<@${memberTarget.user.id}> doesnot have the role 'Mute'`);
        message.channel.send(noroleEmbed);
      });
      memberTarget.roles.add(member.id);
      const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${memberTarget.user.id}> has been unmuted`);
      message.channel.send(embed);
    } else {
      const doesnotexistEmbed = new Discord.MessageEmbed().setColor("#BB0033").setDescription("The user you mentioned doesnot exist");
      message.channel.send(doesnotexistEmbed);
    }
  },
};
