module.exports = {
  name: "Clear",
  description: "Clears the queue",
  execute(message, args, Discord, serverQueue, queue) {
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      return message.channel.send(embed);
    }
    if (!serverQueue) {
      return message.react("🆗");
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    return message.react("🆗");
  },
};
