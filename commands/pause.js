module.exports = {
  name: "Pause",
  description: "Pauses the current song",
  execute(message, args, Discord, serverQueue) {
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      return message.channel.send(embed);
    }
    if (!serverQueue) {
      const embed = new Discord.MessageEmbed().setColor("#E50000").setDescription("The queue cannot be empty");
      return message.channel.send(embed);
    }
    message.react("⏸️");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.pause();
    return;
  },
};
