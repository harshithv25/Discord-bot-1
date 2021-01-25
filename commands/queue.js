module.exports = {
  name: "Queue",
  description: "Show the queue is the queue exists",
  execute(message, args, Discord, serverQueue) {
    if (!serverQueue) {
      const embed = new Discord.MessageEmbed().setColor("#000000").setDescription(`The queue is empty    **${"|(^Д^)|" || "\\(o_o)/"}**`);
      return message.channel.send(embed);
    }
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription(`Make sure you are connected to a voice channel before using this command!`);
      return message.channel.send(embed);
    }
    let i = 0;
    const embed = new Discord.MessageEmbed()
      .setColor("#2F3136")
      .setTitle("**Queue**")
      .setThumbnail(serverQueue.songs[0].thumbnails.high.url)
      .setDescription(
        serverQueue.songs.map((song) => {
          i += 1;
          return `**${i})**   [***\`${song.title}\`***](${song.url}) - ${song.addedBy}\n`;
        })
      );
    return message.channel.send(embed);
  },
};
