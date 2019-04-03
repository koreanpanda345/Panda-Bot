const Discord = require('discord.js');
const fs = require('fs');
let buglog = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/buglog.json", "utf8"));
let buglogFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/buglog.json";

module.exports.run = (client, message, args, tools)=> {
    if(!message.author.id === "304446682081525772") return;
    for (var key in buglog) {
        console.log(key);
        console.log(buglog[key]);
        message.channel.send(`${buglog[key].date}\n${buglog[key].bug}\n${buglog[key].User}`);
      }
}
module.exports.help = {
    name: "buglogs"
}