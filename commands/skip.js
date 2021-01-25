module.exports = {
  name: "Skip",
  description: "Skips the current playing track, and plays the next track in the playlist if there",
  execute(message, args, Discord, serverQueue) {
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      return message.channel.send(embed);
    }
    if (!serverQueue) {
      const embed = new Discord.MessageEmbed().setColor("#E50000").setDescription("The queue cannot be empty!");
      return message.channel.send(embed);
    }
    if (!serverQueue.songs[1]) {
      serverQueue.connection.dispatcher.end();
      return message.react("👌");
    }
    serverQueue.connection.dispatcher.end();
    return message.react("👌");
  },
};
