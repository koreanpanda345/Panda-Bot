const Discord = require('discord.js');
const fs = require('fs');
const translate = require("translate-google");
let languageFile = 'C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/language.json';
const language = JSON.parse(fs.readFileSync('C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/language.json', 'utf8'));
module.exports.run = (client, message, args, tool) => {
    return;
    let target = message.author.id;

    if(args[0] === "en"){
        translate(`Default language has been set to english`, {from: `${language[target].language}`, to: `en`}).then(res => {
            console.log(res)
            message.channel.send(res)
        }).catch(err => {
            console.error(err)
        })
        if(!language[target]) language[target] ={
            language: 'en'
        }
        language[target] ={
            language: 'en'
        }
        fs.writeFileSync(languageFile, JSON.stringify(language), (err) =>{
        if(err) console.log(err)
        });

    }
    if(args[0] === "de"){
        translate(`Default language has been set to german`, {from: `${language[target].language}`, to: 'de'}).then(res => {
            console.log(res)
            message.channel.send(res)
        }).catch(err => {
            console.error(err)
        })

        if(!language[target]) language[target] ={
            language: 'de'
        }
        language[target] ={
            language: 'de'
        }
        fs.writeFileSync(languageFile, JSON.stringify(language), (err) =>{
        if(err) console.log(err)
        });

    }

};
module.exports.help = {
    name: "language"
};