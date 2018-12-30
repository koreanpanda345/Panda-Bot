const Discord = require('discord.js');
exports.run = (client, message, args, tools) =>{
  let Uuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let img = Uuser.displayAvatarURL;
let userEmbed = new Discord.RichEmbed()
  .setAuthor(`${Uuser.displayName}`)
  .setDescription("This is the user's info!")
  .setColor(0x42f47a)
  .setThumbnail(img)
  .addField("Full Usernmae", `${Uuser}`)
  .addField("ID", Uuser.id)
  .addField("Roles:", Uuser.roles.map(roles => `${roles.name}`).join('\n'), true)
  .addField("Can be kicked", `${Uuser.kickable}`)
  .addField("Can be Banned", `${Uuser.bannable}`);
      message.channel.send(userEmbed);
}
module.exports.help ={
  name:"whois"
}