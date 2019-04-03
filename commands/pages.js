const Discord = require('discord.js');

exports.run = (client, message, args, tools) =>{
  let pages = ['Panda Bot\nMy Prefix is panda!.\nI can do music, moderation, etc.\nI am always getting new commands.\nIf you like to help my Developer make more commands for me, \nDM him(koreanpanda345#2878)/email him(koreanpanda345@gmail.com) . Thank you for inviting me to your server.',
  'General\n\n8ball <question>: ask a question.\n\ninfo: Gives you info on me.\n\nserverinfo: Gives you info on your server.\n\nuserinfo: Gives you info on your account\n\nwhois<@who>: gives you info and moderation info on the person.\n\nvote: lets you vote for me, and shows me how much you support me.',
  'Profile\n\nprofile: Displays your profile\n\nprofile help: displays all the commands for profile\n\nprofile edit color <color emoji>: changes the color of your profile embed by using the power of emojis. to find the list of emojis you can use, just type in panda!profile edit color.\n\nprofile edit desc <your choosend description>: lets you change your description on your profile.',
  'Reactions\n\ncuddle <@who>: AWWWW YOU TWO ARE CUTE TWO TOGETHER\n\nhug <@who>: YOUR SO NICE\n\n kiss <@who>: YOU TWO ARE WAY TOO CUTE FOR ME (^-^)\n\npat <@who>: your too nice\n\npoke <@who>: YES WE SHALL RISE AND WIN BY POKING EVERYONE',
  'Translation\n\ntranslate <language the message is in> <the language you want it to be in> <the message>: translate the message, it is usefully to use to communicate with people that don\'t speak your language',
  'Music\n\n(note: you have to be in a voice channel to use any of this commands)\n\nplay(p) <song name>: looks on youtube and finds the first song in the search list.\n\nskip(s): Skips the current song.\n\nstop(st): Stops the queue and disconnects.\n\nvolume(vol)/volume(vol) <1-5>: Shows the current volume/Changes the volume.\n\nnp: Shows what the current song is.\n\npause(pa): Pauses the music and queue.\n\nresume(re): Resumes the pause music and queue.\n\nqueue(q): shows the songs that in queue to play.\n\nremove(r) <song queue number: Removes the song from the queuing list by the song queuing number.','Radio\nNote: This does use IHeart radio to find stations, does not mean they are stations. The "stations" are actually playlist thats has a collections of songs from some stations, or genre.\n\nradio <station or genre>: plays the station or genre playlist from iheart radio.\n\nleave: causes the bot to leave the voice channel.',
  'Games\nBlackjack and Poker\n[General]\n\nbalance <@who>: Shows the balances of all players of a specific player\n\nend: Ends the current game\n\nmoney <start> <min. bet>: Set the starting balance and minimum bet for new players\n\n\n[Poker]\n\nante: Check the cards dealt to you\n\ncall: Match a bet that was made through a raise\n\ncheck: Play without raising or folding during a turn\n\nfold: Stop playing and lose all money played this game\n\npoker: Shuffles the deck and starts a new game\n\nraise: Make a bet that other players need to call\n\ntable: Displays a list of hand types in order of rank',
  'Moderation\n\n(note: IN ORDER to get reports and messages saying who kicked/banned who, you have to have a channel called reports, and give me permissions to speak)\n\nreport <@who> <why>: anyone can use this, is a mod abusing their powers, or is someone being rude to someone else, well use this, I will send your Admin a report.\n\nkick <@who> <why>: too lazy to kick them? same, Just tell me who and why I should kick them.\n\nban <@who> <why>: again being lazy, well tell me who and why i should ban them.\n\nwarn <@who> <why>: does someone need a warning, well I will keep track of how many warnings someone has, and if they get two its a mute for an hour, and 4 is 5hours, and 6 is automatic ban\n\ntempmute <@who> <how long>: will temporarily mute that user. default time is 10 minutes.(note: time is going to be s is second, m is minutes, and h is for hours. and make sure the number and the time unit is not spaced. example: 10m is for 10 minutes)',
  'Settings\n\nping: tells you the bot ping.\n\nsetprefix <new prefix>: allow you to rename me(aka change my prefix)\n\nulogs{date}: gives you the update log for me ^-^ is something happens and your curious why, then this will have your answer sensei.'];
  let page = 1;

  const embed = new Discord.RichEmbed()
  .setColor(0x43f47a)
  .setFooter(`Page ${page} of ${pages.length}`)
  .setDescription(pages[page-1])

  message.channel.send(embed).then(msg => {
    msg.react('⏪').then( r => {
      msg.react('⏩')

      //filters
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id == message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
      const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000});

      backwards.on('collect', r =>{
        if(page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
      })
      forwards.on('collect', r =>{
          if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
        
      })
    })
  })

}
module.exports.help = {
  name:"help"
}
//⏪⏩
