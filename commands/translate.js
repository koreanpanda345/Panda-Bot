const Discord = require('discord.js');
const translate = require('translate-google');
const botconfig = require('C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/Main Bot file/settings.json')

module.exports.run = (client, message, args, tools) =>{
    let prefix = botconfig.prefix;
    let t = args.join(" ").slice(5);
    let fromLang = args[0];
    let toLang = args[1];
    let TransInfoEmbed = new Discord.RichEmbed()
    .setTitle('How to use The translator command')
    .setDescription('This is a translator that you can use to communicate with your friend that speaks a different language. ^-^')
    .addField('Usage: ', `${prefix}translate <the language your translating from> < language you want to translate to> <what your translating>`)
    .addField('Example:', `${prefix}translate en de Hello I am Panda Bot.`)
    if(!(t || fromLang||toLang)) return message.channel.send(TransInfoEmbed);

  translate(`${t}`, {from: `${fromLang}`, to: `${toLang}`}).then(res => {
      console.log(res)
      let TransEmbed = new Discord.RichEmbed()
      .setTitle(`Translating from ${fromLang} to ${toLang}`)
      .addField(`From ${fromLang}: `, `${t}`)
      .addField(`To ${toLang}: `, `${res}`)
      message.channel.send(TransEmbed);
  }).catch(err => {
      console.error(err)
  })
}

module.exports.help = {
    name: "translate"
}