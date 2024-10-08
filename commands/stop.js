module.exports = {
  name: "Stop",
  description: "Stops playing the current song",
  execute(message, args, Discord, serverQueue) {
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      return message.channel.send(embed);
    }
    if (!serverQueue) {
      return message.react("🛑");
    }
    serverQueue.connection.dispatcher.pause();
    return message.react("🛑");
  },
};
