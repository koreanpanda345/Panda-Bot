const Discord = require('discord.js');
const fs = require('fs');
let colorFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/color.json";
let color = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/color.json", "utf8"));
let descriptionFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/description.json";
let desc = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/description.json", "utf8"));
let marryFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json";
let marry = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profile/marry.json", "utf8"));
//let profile = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profiles.json", "utf8"));
//let profileFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/profiles.json";
module.exports.run = async(client, message, args, tools) =>{
    
    let target = message.author.id;
    if(!args[0]){
        if(!color[target]) color[target] = {
            color: `#000000`
        };
        fs.writeFile(colorFile, JSON.stringify(color), (err) => {
            if(err) console.log(err)
        });
        if(!desc[target]) desc[target] = {
            desc: 'Type in panda!profile edit desc <your description>'
        };
        fs.writeFile(descriptionFile, JSON.stringify(desc), (err) =>{
            if(err) console.log(err);
        });
        if(!marry[target]) marry[target] = {
            marry: 'No one'
        };
        fs.writeFile(marryFile, JSON.stringify(marry), (err) => {
            if(err) console.log(err);
        });

       let embed = new Discord.RichEmbed()
        .setTitle(`**${message.author.username}**`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor(color[target].color)
        .setDescription(desc[target].desc)
        .addField(`Married to:`, marry[target].marry);
        message.channel.send(embed);
    }
    if(args[0] === 'help'){
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('Profile commands')
        .addField('panda!profile', 'makes or grabs your profile')
        .addField('panda!profile edit color (color emoji)*','sets your embed color')
        .addField('panda!profile edit desc', 'edits your description')
        .setFooter('*if you just type in panda!profile edit color, then it will give you the list of the color emojis you can use.');
        message.channel.send(helpEmbed);
    }
    if(args[0] === 'edit'){
        if(!color[target]) color[target] = {
            color: "#000000"
        };
        fs.writeFile(colorFile, JSON.stringify(color), (err) => {
            if(err) console.log(err)
        });
        if(!desc[target]) desc[target] = {
            desc: 'Type in panda!profile edit desc <your description>'
        };
        fs.writeFile(descriptionFile, JSON.stringify(desc), (err) =>{
            if(err) console.log(err);
        });
        if(!marry[target]) marry[target] = {
            marry: 'No one'
        };
        fs.writeFile(marryFile, JSON.stringify(marry), (err) => {
            if(err) console.log(err);
        });

        if(args[1] === 'desc'){
            let description = args.join(" ").slice(10);
            if(!description) return message.channel.send('please enter the description you want it to set to.');
            desc[target] ={
                desc: description
            }
            fs.writeFile(descriptionFile, JSON.stringify(desc), (err) =>{
                if(err) console.log(err);
            })
        } 
        if(args[1] === "color"){
            if(!args[2]){
                let ColorEmbed = new Discord.RichEmbed()
                .setTitle('Colors')
                .setDescription('To pick a color add the emoji you see under the color name')
                .addField('Red', '🔴')
                .addField('Orange', '🔶')
                .addField('Yellow', '💛')
                .addField('Blue', '🔵')
                .addField('Green', '💚')
                .addField('Purple', '💜')
                .addField('Pink', '💕')
                .addField('Black', '⚫')
                .addField('White', '⚪');
                message.channel.send(ColorEmbed);
            }
            if(args[2] === "🔴"){
                color[target] = {  
                    color: '#ff0213'
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
            });
        }
            if(args[2] === '🔶'){
                color[target] = {
                    color: "#ff8801"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '💛'){
                color[target] = {
                    color: "#e7f702"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '🔵'){
                color[target] = {
                    color: "#01cef7"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '💚'){
                color[target] = {
                    color: "#2ef701"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '💜'){
                color[target] = {
                    color: "#f600ff"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '💕'){
                color[target] = {
                    color: "#ff49bc"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '⚫'){
                color[target] = {
                    color: "#070707"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
            if(args[2] === '⚪'){
                color[target] = {
                    color: "#ffffff"
                };
                fs.writeFile(colorFile, JSON.stringify(color[target].color), (err) => {
                    if(err) console.log(err);
                })
            }
    }
        }
    }

module.exports.help = {
    name: 'profile'
}