module.exports = async (client) => {
  const guild = await client.guilds.cache.get("736205769820864542");
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get("800333557457354822");
    channel.setName(`Total members: ${memberCount.toLocaleString()}`);
  }, 3600000);
};
