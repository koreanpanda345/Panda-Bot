const Discord = require('discord.js');
const fs = require('fs');
let buglog = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/buglog.json", "utf8"));
let buglogFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/buglog.json";
var format = require('date-format-lite');
module.exports.run = (client, message, args, tools) =>{
    var now2 = new Date();
    let bug = args.join(" ").slice(0);
    let date = now2.date("YYYY-MM-DD");
    console.log(date);
    var time =  now2.format('hh:mm:ss');
    console.log(time);
    fulltime = `${date}'\n${time}`;
    if(!bug) return message.channel.send('What did you want to report?');
    if(!buglog[fulltime]) buglog[fulltime] = {
        date: `Date: ${date}\nTime: ${time}`,
        bug: bug,
        User: `${message.author.username}#${message.author.discriminator}`
    };
    fs.writeFile(buglogFile, JSON.stringify(buglog), (err) =>{
        if(err) console.log(err);
    })
    message.channel.send(`Thank you for reporting this issue. My creator maybe try and contact you if he has any questions. please change your DM settings to anyone can message, ^-^. My creator will message you if its resolved and you can change your setting or will ask you questions.`);
   console.log(bug);
   console.log(`Date: ${date}\nTime: ${time}`);
   console.log(`${message.author.username}#${message.author.discriminator}`);
}
module.exports.help = {
    name:"bug"
}