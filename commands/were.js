//Werewolf and villager game.
//player min: 5 players
//the bot will use a random generator and tell people  in a normal dm.
//Werewolf will have their own group dm that will let them talk about who to kill and when night time, they can tell the bot who the want to kill
//Villagers will not know who is the Werewolfs
//there will be a doctor/wizard, can save a person, this person will have a normal dm with just the bot so people do not know who is the doctor.
//there is the sherrif, can kill one person during the day before the chopping block happens, who will also have a normal dm like the doctor so no one knows who is the sherrif.
//the lovers will have a group dm of the bot and the other lover.
//once per day the villagers can vote who will be put on the chopping block, after that the people that are on the chopping block can explain why they are not the Werewolf.
//when someone dies they can not talk. the bot will create a role called dead, and will make a group dm of the bot and the players who died.
//if the villagers kill a Werewolf, that Werewolf will be kicked from the Werewolf group dm and will be put in the dead group dm.
//to when as a Werewolf is to kill all of the villagers before the villagers kill all the Werewolfs.
//to win as a villager, you have to kill all of the Werewolfs, before they kill all of the villagers.
const Discord = require('discord.js');
let playing = require(`C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json files/player.json`);
module.exports.run = async(bot, message, args) => {
  if(!playing[message.author.id]){
    playing[message.author.id] ={
      playing: message.author.username
    };
  }
  fs.writeFile("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json files/player.json", JSON.stringify(playing), (err) =>{
    if(err) console.log(err);
  })
}
module.exports.help ={
  name: "were"
}
