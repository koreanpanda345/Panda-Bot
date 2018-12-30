const Discord = require("discord.js");
module.exports.run = async(bot, message, args) =>{
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

   let reportEmbed = new Discord.RichEmbed()
   .setDescription("Report")
  .setColor(0x42f47a)
   .addField("Report User", `${rUser} with ID: ${rUser.id}`)
   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Time", message.createdAt)
  .addField("Reason", reason);

   let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find channel.");

   message.delete().catch(O_o=>{});
   reportschannel.send(reportEmbed);
   console.log(`${message.author.username} with ID:${message.author.id} has reported on ${rUser} with ID:${rUser.id}`);
  return;
}

module.exports.help = {
  name: "report"
}
