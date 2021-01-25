module.exports = {
  name: "Join",
  description: "Join the bot to the current voice channel",
  async execute(message, args, Discord, serverQueue) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      return message.channel.send(embed);
    } else {
      message.react("👍");
      return await voiceChannel.join();
    }
  },
};
