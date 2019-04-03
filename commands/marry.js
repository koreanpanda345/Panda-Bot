const Discord = require('discord.js');
let fs = require('fs');
let marryFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json";
let marry = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json", "utf8"));

module.exports.run = (client, message, args, tools) => {
let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!target) return message.channel.send('Who did you want to propose to?');
let proposer = message.author.id;
let embed = new Discord.RichEmbed()
.setTitle(`OwO <@${target.id}>, <@${message.author.id}> is proposing to you, would you like to accept?`)
.setDescription('click the check to say yes, click the x to say no.');
message.channel.send(embed).then(msg =>{
    msg.react('💍').then(r =>{
        msg.react('❌')

        //Filters
        const marryFilter = (reaction, user) => reaction.emoji.name === '💍' && user.id === target.id;
        const denyFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === target.id;

        const marry = msg.createReactionCollector(marryFilter, {time: 6000});
        const deny = msg.createReactionCollector(denyFilter, {time: 6000});

        marry.on('collect', r => {
            if(!marry[target.id]) marry[target.id] = {
                marry: proposer
            } 
            fs.writeFile(marryFile, JSON.stringify(marry), (err) => {
                if(err) console.log(err)
            });
            
            if(!marry[proposer]) marry[proposer] = {
                marry: target.id
            }
            fs.writeFile(marryFile, JSON.stringify(marry), (err) => {
                if(err) console.log(err)
            });
            message.channel.send(`<@${proposer}> & <@${target.id}> are now married ^\/\/\/\/\/\/^`);
        })
        deny.on('collect', r => {
            message.channel.send(`Sorry, but <@${target.id}> said no. T-T my ship has been ruined`);
        })
    })
})
}

module.exports.help ={
    name: "marry"
}