const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
let img = message.author.displayAvatarURL;
     let userEmbed = new Discord.RichEmbed()
       .setAuthor(message.author.username)
       .setDescription("This is the user's info!")
       .setColor(0x42f47a)
       .setThumbnail(img)
       .addField("Full Usernmae", `${message.author.username}#${message.author.discriminator}`)
       .addField("ID", message.author.id)
       .addField("Created At", message.author.createdAt);

       message.channel.send(userEmbed);
     }
     module.exports.help = {
       name: "userinfo"
     }
