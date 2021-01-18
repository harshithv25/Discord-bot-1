module.exports = {
  name: "Ping",
  description: "Ping pong",
  execute(message, args, Discord) {
    message.channel.send("pong");
  },
};
