module.exports = {
  name: "Reaction",
  description: "Sets up a reaction role message",
  async execute(newMember, Discord, client) {
    let role = newMember.guild.roles.cache.find((role) => role.name === "Boners");
    const doneEmoji = "🆗";
    // newMember.roles.add(role);
    // newMember.guild.channels.cache.get("800322752585662514").send(`@here Welcome to the server. Here's a list of roles you can add it yourself`);
    // const embed = new Discord.MessageEmbed()
    //   .setColor("#84DF8A")
    //   .setTitle("Roles")
    //   .setDescription(
    //     "You can add roles by typing !role and the name of the role....ex: **#role newbie**.....This will add newbie to my list of roles"
    //   )
    //   .addFields(
    //     { name: "Role 1: \nNewbie", value: "Hey! there I am new to this server" },
    //     { name: "Role 2: \nElite gamer", value: "Proest of the pros" },
    //     { name: "Role 3: \nRed", value: "This will give you a red color" },
    //     { name: "Role 4: \nOrange", value: "This will give you a orange color" }
    //   )
    //   .setFooter("React with 🆗 only if you understand the rules");
    // let roleMessage = await newMember.guild.channels.cache.get("800322752585662514").send(embed);
    // roleMessage.react(doneEmoji);
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.channel.id == "800322752585662514") {
        if (reaction.emoji.name === doneEmoji) {
          reaction.message.reactions.resolve(doneEmoji).users.remove(user.id);
          reaction.message.guild.members.cache.get(user.id).roles.add(role);
        } else if (reaction.emoji.name !== doneEmoji) {
          await reaction.message.reactions.removeAll();
          return;
        }
      }
    });
    // const channelId = "800026308406411277";
    // if (newMember.channel.id === channelId) {
    //   const redRole = newMember.guild.roles.cache.find((role) => role.name === "Red");
    //   const orangeRole = newMember.guild.roles.cache.find((role) => role.name === "Orange");
    // const redEmoji = "🔴";
    // const orangeEmoji = "🟠";
    //   const embed = new Discord.MessageEmbed()
    //     .setColor("#84DF8A")
    //     .setTitle("Choose a color from the given options")
    //     .setDescription("You can choose your color by reacting **🔴** for joining **Red** team and **🟠** for joining **Orange** team")
    //     .setFooter(`Dont forget to react ${redEmoji} or ${orangeEmoji}`);
    //   let reactMessage = await newMember.channel.send(embed);
    //   reactMessage.react(redEmoji);
    //   reactMessage.react(orangeEmoji);
    // client.on("messageReactionAdd", async (reaction, user) => {
    //   if (reaction.message.partial) await reaction.message.fetch();
    //   if (reaction.partial) await reaction.fetch();
    //   if (user.bot) return;
    //   if (!reaction.message.guild) return;
    //   if (reaction.message.channel.id == channelId) {
    //     if (reaction.emoji.name === redEmoji) {
    //       await reaction.message.guild.members.cache.get(user.id).roles.add(redRole);
    //     } else if (reaction.emoji.name === orangeEmoji) {
    //       await reaction.message.guild.members.cache.get(user.id).roles.add(orangeRole);
    //     }
    //   }
    // });
    // } else {
    //   newMember.channel.send(`**${newMember.author}** you cannot do that here`);
    // }
  },
};
