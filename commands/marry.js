const Discord = require('discord.js');
let fs = require('fs');
let marryFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json";
let marry = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json", "utf8"));

module.exports.run = (client, message, args, tools) => {
let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!target) return message.channel.send('Who did you want to propose to?');
if(target.id === message.author.id) return message.channel.send('I am sorry but you can\'t marry yourself.')
let proposer = message.author.id;
let proposerName = message.author.username;

let embed = new Discord.RichEmbed()
.setTitle(`OwO <@${target.id}>, <@${message.author.id}> is proposing to you, would you like to accept?`);
message.channel.send(embed);
const filter = m => m.author.id === target.id;
message.channel.awaitMessage(filter, {max: 1, time: 10000}).then(collected => {
if(collected.first.content === "yes"){
    embed.setTitle(`OwO <@${target.id}> and <@${proposer}> are now married`)
    message.edit(embed);
    if(!marry[proposer]) marry[proposer] = {
        marry: `${target.username}`
    } 
    marry[proposer] = {
        marry: `${target.username}`
    }
    fs.write(marryFile, JSON.stringify(marry), (err) => {
        if(err) console.log(err);
    });
    if(!marry[target.id]) marry[target.id] = {
        marry: `${proposerName}` 
    }

    marry[target.id] = {
        marry: `${proposerName}` 
    }
    fs.write(marryFile, JSON.stringify(marry), (err) => {
        if(err) console.log(err);
    });
}
if(collected.first.content === "no"){
    embed.setTitle(`T^T, I am sorry <@${proposer}, but <@${target.id}> decline.`);
    message.edit(embed);
}
}).catch(err => {
    console.error(err);
    message.channel.send("They didn't reply, try again when they are online.")
})

}

module.exports.help ={
    name: "marry"
}