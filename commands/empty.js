module.exports = {
  name: "Empty",
  description: "Nothing",
  execute(message, args, Discord) {
    const embed = new Discord.MessageEmbed()
      .setColor("#84DF8A")
      .setTitle("Rules")
      .setURL("https://github.com/HARSHITHV25")
      .setDescription("Server rules")
      .addFields(
        { name: "Role 1: \nProgrammer", value: "Bad ass programmer" },
        { name: "Role 2: \nMilk boi", value: "Chugg Milk Boners!" },
        { name: "Role 3: \nNitro booster", value: "Give a boost" },
        { name: "Role 4: \nVintage bois", value: "Bro, why you so old" }
      )
      .setImage("http://www.gettingsmart.com/wp-content/uploads/2017/06/Program-Code-Feature-Image.jpg")
      .setFooter("Checkout all the channels and roles");
    message.channel.send(embed);
  },
};
