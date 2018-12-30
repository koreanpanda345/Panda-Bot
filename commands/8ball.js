const Discord = require('discord.js');

exports.run = (client, message, args, tools) =>{
if (!args[0]) return message.reply("please ask a questoin");
let replies = ["Yes.", "No.", "I don't know.", "Ask again later"];
let result = Math.floor((Math.random() * replies.length));
let question = args.slice(0).join(" ");
let ballembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor(0x43f47a)
.addField("Quesion", question)
.addField("Answer", replies[result]);
console.log(`${message.author.username} with ID:${message.author.id} has asked ${question} and the anwser was ${replies[result]}`);
message.channel.send(ballembed);
}
module.exports.help = {
  name: "8ball"
}
