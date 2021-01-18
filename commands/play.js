module.exports = {
  name: "Play",
  description: "Play the song specified",
  async execute(message, args, Discord) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
          const embed = new Discord.MessageEmbed().setDescription('')
      }
  },
};
