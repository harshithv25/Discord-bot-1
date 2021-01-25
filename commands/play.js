const ytdl = require("ytdl-core");
const { YTSearcher } = require("ytsearcher");

const fetcher = new YTSearcher({
  key: "AIzaSyCwGDAtHUiCAf7I_xWdfSDU4exTfufP6dM",
  revealed: true,
});

module.exports = {
  name: "Play",
  description: "Play the song specified",
  async execute(message, args, Discord, serverQueue, queue) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      const embed = new Discord.MessageEmbed()
        .setColor("#E50000")
        .setDescription("Make sure you are connected to a voice channel before using this command!");
      message.channel.send(embed);
      return;
    } else {
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        const embed = new Discord.MessageEmbed()
          .setColor("#010101")
          .setDescription("I don't have the permissions to connect or speak in the channel!");
        message.channel.send(embed);
        return;
      } else {
        let connection = await voiceChannel.join();
        if (args[0]) {
          const play = (guild, song) => {
            const currentQueue = queue.get(guild.id);
            if (!song) {
              queue.delete(guild.id);
              currentQueue.voiceChannel.leave();
              return;
            }
            const dispatcher = currentQueue.connection.play(ytdl(song.url)).on("finish", () => {
              currentQueue.songs.shift();
              play(guild, currentQueue.songs[0]);
            });
            const embed = new Discord.MessageEmbed()
              .setColor("#000000")
              .setTitle("Now playing")
              .setThumbnail(song.thumbnails.high.url)
              .setDescription(`[**\`${song.title}\`**](${song.url})`)
              .setFooter(`${message.author.username}`, message.author.displayAvatarURL());
            message.channel.send(embed);
          };

          let result = await fetcher.search(args.join(" "), { type: "video" });
          const songInfo = await ytdl.getInfo(result.first.url);

          let song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            thumbnails: result.first.thumbnails,
            duration: songInfo.videoDetails.lengthSeconds,
            addedBy: message.author,
          };

          if (!serverQueue) {
            const queueConstructor = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true,
            };

            queue.set(message.guild.id, queueConstructor);
            queueConstructor.songs.push(song);

            try {
              queueConstructor.connection = connection;
              play(message.guild, queueConstructor.songs[0]);
            } catch (e) {
              console.error(e);
              message.channel.send(`${message.author}.....Something went wrong....Try again later!`);
            }
            return;
          } else {
            serverQueue.songs.push(song);
            const embed = new Discord.MessageEmbed()
              .setColor("#000000")
              .setTitle("Queued")
              .setThumbnail(result.first.thumbnails.high.url)
              .setDescription(`[**\`${result.first.title}\`**](${result.first.url})`)
              .setFooter(`${message.author.username}`, message.author.displayAvatarURL());
            return message.channel.send(embed);
          }
        } else {
          if (serverQueue) {
            message.react("▶️");
            return serverQueue.connection.dispatcher.resume();
          }
          const embed = new Discord.MessageEmbed().setColor("#E50000").setDescription("The queue cannot be empty!");
          return message.channel.send(embed);
        }
      }
    }
  },
};
