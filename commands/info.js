const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
let botEmbed = new Discord.RichEmbed()
    .addField("Panda Bot", "This is Panda Bot, Design to make people love pandas (^-^). And Panda Bot knows all, nothing can outmatch him.", true)
    .addField("Creator", "Koreanpanda345#2878", true)
    .setColor(0x42f47a)
    .setFooter("GIVE ME BAMBOO")
    .addField("Created On", bot.user.createdAt);
return message.channel.send(botEmbed);
}
module.exports.help = {
  name:"info"
}
