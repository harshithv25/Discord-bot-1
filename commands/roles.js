module.exports = {
  name: "Roles",
  description: "Add Roles",
  execute(message, args, Discord) {
    if (args[0]) {
      const role = args[0];
      if (role === "Newbie") {
        const tobeAdded = message.guild.roles.cache.find((roles) => roles.name === "Newbie");
        message.member.roles.add(tobeAdded.id);
        const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${message.author.id}> has been assigned the role **Newbie**`);
        message.channel.send(embed);
        return;
      } else if (role === "Elite") {
        const tobeAdded = message.guild.roles.cache.find((roles) => roles.name === "Elite Gamer");
        message.member.roles.add(tobeAdded.id);
        const embed = new Discord.MessageEmbed()
          .setColor("#00E503")
          .setDescription(`<@${message.author.id}> has been assigned the role **Elite gamer**`);
        message.channel.send(embed);
        return;
      } else if (role === "Red") {
        const tobeAdded = message.guild.roles.cache.find((roles) => roles.name === "Red");
        message.member.roles.add(tobeAdded.id);
        const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${message.author.id}> has been assigned the color **Red**`);
        message.channel.send(embed);
        return;
      } else if (role === "Orange") {
        const tobeAdded = message.guild.roles.cache.find((roles) => roles.name === "Orange");
        message.member.roles.add(tobeAdded.id);
        const embed = new Discord.MessageEmbed().setColor("#00E503").setDescription(`<@${message.author.id}> has been assigned the role **Orange**`);
        message.channel.send(embed);
        return;
      }
    } else {
      const embed = new Discord.MessageEmbed().setColor("#BB0022").setDescription(`Please provide a role you want to assign`);
      message.channel.send(embed);
    }
  },
};
