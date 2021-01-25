const dotenv = require("dotenv");
const prefix = "!";
const fs = require("fs");
const commandFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));
const memberCounter = require("./counters/member");
const queue = new Map();
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.commands = new Discord.Collection();

dotenv.config();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
  memberCounter(client);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const serverQueue = queue.get(message.guild.id);
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("Ping").execute(message, args, Discord);
  } else if (command === "mute") {
    client.commands.get("Mute").execute(message, args, Discord);
  } else if (command === "unmute") {
    client.commands.get("Unmute").execute(message, args, Discord);
  } else if (command === "clearmsgs") {
    client.commands.get("ClearMsgs").execute(message, args, Discord);
  } else if (command === "roles") {
    client.commands.get("Roles").execute(message, args, Discord);
  } else if (command === "kick") {
    client.commands.get("Kick").execute(message, args, Discord);
  } else if (command === "ban") {
    client.commands.get("Ban").execute(message, args, Discord);
  } else if (command === "play") {
    client.commands.get("Play").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "stop") {
    client.commands.get("Stop").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "skip") {
    client.commands.get("Skip").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "pause") {
    client.commands.get("Pause").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "leave") {
    client.commands.get("Leave").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "join") {
    client.commands.get("Join").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "clear") {
    client.commands.get("Clear").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "queue") {
    client.commands.get("Queue").execute(message, args, Discord, serverQueue, queue);
  } else if (command === "") {
    client.commands.get("Empty").execute(message, args, Discord, queue);
  }
});

client.on("guildMemberAdd", async (newMember) => {
  client.commands.get("Reaction").execute(newMember, Discord, client);
});

client.login(process.env.CREDENTIALS);
