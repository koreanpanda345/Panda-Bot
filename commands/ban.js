const Discord = require("discord.js");
module.exports.run = async(bot, message, args) =>{
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if(!bReason){
    let bReason = "Unknown";
  }
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")){
    return message.channel.send("You don't have permissions");
  }
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor(0xea0000)
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    .addField("Banned By", `<@${message.author.username}> with ID: ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);
  //
    let banChannel = message.guild.channels.find(`name`, "reports");
    if(!banChannel) return message.channel.send("Couldn't find channel.");
    message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);
  console.log(`${message.author.username} with ID: ${message.author.id} has banned: ${bUser} with ID:${bUser.id} at ${message.createdAt}`);
      return;
}
module.exports.help = {
  name:"ban"
}
