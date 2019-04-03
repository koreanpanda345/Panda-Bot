let Discord = require('discord.js');

module.exports.run = (client, message, args) =>{
    /*
    let grid;
    grid = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
        ];
    let embed = new Discord.RichEmbed()
    .setTitle("2048")
    .setDescription(grid);
    message.channel.send(embed);
    addNumber();
    addNumber();
    message.channel.send(embed);

    function addNumber(){
        let options = [];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(grid[i][j] === 0){
                    options.push({
                        x:i,
                         y:j
                        });
                }
            }
        }
        if(options.length > 0);
    let spot = Math.floor((Math.random() * options.length));
    let r = Math.floor((Math.random() * 1));
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
    }
    */
   return;
};
module.exports.help ={
    name: "2048"
};