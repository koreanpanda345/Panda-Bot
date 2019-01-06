//will catch any error that will occur during its run
 process.on('unhandledRejection', console.error);
 //required files and information
const botconfig = require("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/Main Bot file/settings.json");
const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const bot = new Client({disableEveryone: true});
const fs = require("fs");
const ytdl = require("ytdl-core");
const ms = require("ms");
const YouTube = require('simple-youtube-api');
const iheart = require('iheart');
const superagent = require("superagent");
const send = require("quick.hook");
const youtube = new YouTube(botconfig.yt_api_key);
const Evaluator = require("poker-evaluator");
const queue = new Map();
//AIzaSyBCIK1r0YuHUJD3905yNBF8FQlQlYgfxAo
//when it disconnects will first given a warning
bot.on('warn', console.warn);
//then gives the error in the console
bot.on('error', console.error);
//then returns a message saying that it has disconnected
bot.on('disconnect', () => console.log('I just disconnected'));
//then when it reconnects, it will say that it reconnected and was successful.
bot.on('reconnecting', () => console.log('I am reconnecting now!'));
//Command Handler

bot.commands = new Discord.Collection();


const bot_controller = botconfig.bot_controller;
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});
//when it runs and it was successful, it will run this
bot.on("ready", async () =>{
    let prefix = botconfig.prefix;
    let status = "";
    let command = "";
    let functions = "";
    
    if(status === "update"){
        console.log(`|-------------------------------------------|`);
        if(command === ""){
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${functions}.`);
            bot.user.setStatus('online');
        }
        else if(functions === ""){
            console.log(`|Command: ${command}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${prefix}${commands}`);
            bot.user.setStatus("online");
        }
        else if(functions === "" && command === ""){
            console.log("|");
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update.`);
            bot.user.setStatus("online");
        }
        else{
            console.log(`|Command: ${command}`);
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${prefix}${commands}, and ${functions}`);
            bot.user.setStatus("online");
        }
    }
    else if(status === "updating"){
        console.log(`|-------------------------------------------|`);
        console.log(`Being worked on: True`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`Panda Bot is being worked on. please wait till you don't see this message.`);
        bot.user.setStatus("dnd");
    }
    else if(status === "Fixing"){
        console.log(`|-------------------------------------------|`);
        console.log(`Being worked on: True`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`Panda Bot is being worked on. please wait till you don't see this message.`);
        bot.user.setStatus("dnd");
    }
    else if(status === "new"){
        console.log(`|-------------------------------------------|`);
        if(command === ""){
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new Function. Which is ${functions}.`);
            bot.user.setStatus('online');
        }
        else if(functions === ""){
            console.log(`|Command: ${command}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new command. The new command is ${prefix}${commands}`);
            bot.user.setStatus("online");
        }
        else{
            console.log(`|Command: ${command}`);
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new command. The new command is ${prefix}${commands}, and a new function which is ${functions}`);
            bot.user.setStatus("online");
    }

    }
    else{
        console.log(`|-------------------------------------------|`);
        console.log(`|default`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`panda!help`);
        bot.user.setStatus("online");
    }
    console.log(`Panda bot is in ${bot.guilds.size} servers, ${bot.channels.size} channels, and ${bot.users.size} users.`);
});
/*=================
[Importing Modules]
=================*/

//Player & Cards
var Player = require("./player.js").Player;
var Cards = require("./cards.js").Cards;

//Shorthand
var shorthand = require("./shorthand.js").shorthand;
var colors = require("./shorthand.js").colors;
var fullname = require("./shorthand.js").fullname;
var blackjackVal = require("./shorthand.js").blackjackVal;

/*=================
[Variables/Objects]
=================*/

var eval,
    game = false,
    gameType = null,
    maxIndex = 0,
    startMoney = 100,
    minBet = 2;

var startGameMsg = "Game has not started. Start a new game with **panda!poker** or **panda!blackjack** (W.i.p)...",
    shuffledMsg = "Deck shuffled. Please wait until all cards are dealt...",
    endGameMsg = "Please wait for the current game to end.",
    anteMsg = "You cannot do this before or during the ante.",
    allinMsg = false,
    _s = "   ";

var playerArray = [];
var playerCount = 0;

var Poker = {
    community: [],
    round: 0,
    turn: 0,
    pot: 0,
    curBet: 0,
    foldCount: 0,
    allinCount: 0,
    lastCall: false,
    calcHands: function() {
        for (i = 0; i < playerCount; i++) {
            eval = Evaluator.evalHand(playerArray[i].hand.concat(Poker.community));
            playerArray[i].handVal = eval.value;
            playerArray[i].handName = eval.handName;
        }
        var maxArray = playerArray.map(function(a) {
            return a.handVal
        });
        maxIndex = [maxArray.indexOf(Math.max(...maxArray))];
        return maxIndex;
    }
};

var Blackjack = {
    turn: 0,
    pot: 0,
    dealer: {
        hand: [],
        handDisplay: [],
        handVal: 0
    },
    calcHand: function(obj, hand) {
        var aceCount = 0;
        for (i = 0; i < obj.hand.length; i++) {
            var rank = obj.hand[i].substr(0, 1);
            if (rank === "A") {
                aceCount++;
            }
            obj.handVal += blackjackVal[rank];
        }
        while (obj.handVal > 21 && aceCount > 0) {
            obj.handVal -= 10;
            aceCount--;
        }
    },
    calcWin: function() {
        for (i = 0; i < playerCount; i++) {
            //Todo
        }
    }
};

/*================
[Global Functions]
================*/
function findPlayer(user) {
    function getIndex(usr) {
        return usr.name == user;
    }
    return playerArray.findIndex(getIndex);
}

function isTurn(user) {
    var names = playerArray.map(function(a) {
        return a.name;
    });
    if (names.indexOf(user) == Poker.turn) {
        return true;
    } else {
        return false;
    }
}


//coin.json
//let coins = require("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/coins.json");
//ttt player list
//let playing = require('C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/player.json');

//this is where the commands that can't be in a separate files are.
bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "panda!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    var userId = `<@${message.author.id}>`;
    var userName = message.author.username;
    if (message.channel.type === "text") {
        var userNameArray = message.channel.guild.members.array();
    }

    function code(lang, arg) {
        message.channel.sendCode(lang, arg);
    }

    function dm(msg, emb) {
        message.author.send(msg, emb);
    }

    function embed(titleArg, desc, color = "white") {
        return {
            embed: {
                title: titleArg,
                description: desc,
                color: color.replace(/^red$|^green$|^gold$|^black$|^blue$|^white$/gi, function(matched) {
                    return colors[matched];
                })
            }
        };
    }

    function purge(amount) {
        if (amount >= 1 && amount < 100) {
            amount++;
            message.delete();
            message.channel.fetchMessages({
                limit: amount || 10
            }).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        } else {
            send("Invalid amount of messages. Must be between 1-99.");
        }
    }

    function send(msg, embed) {
        message.channel.send(msg, embed);
    }

    function getUserName(id) {
        var userIndex = userNameArray.map(function(a) {
            return `<@${a.user.id}>`;
        }).indexOf(id);
        return userNameArray[userIndex].user.username;
    }

    function isBot(id) {
        var botArray = userNameArray.map(function(a) {
            return a.user.bot;
        });
        var botIndex = userNameArray.map(function(a) {
            return `<@${a.user.id}>`;
        }).indexOf(id);
        return botArray[botIndex];
    }

    /*Game Functions*/
    var balance = require("./gameFunc.js").balance;
    var removePlayer = require("./gameFunc.js").removePlayer;

    function nextRound() {
        if (Poker.round !== 4 && Poker.lastCall === false) {
            send("", embed("Balances", balance("all"), "blue"));
        }
        Poker.curBet = 0;
        for (i = 0; i < playerCount; i++) {
            playerArray[i].bet = 0;
            playerArray[i].lastRaise = false;
        }
        Poker.turn = 0;
        Poker.round++;
        action("Poker");
    }

    function endGame() {
        send("", embed("Balances", balance("all"), "blue"));
        game = false;
        gameType = null;
        allinMsg = false;
        maxIndex = 0;
        Poker.turn = 0;
        Poker.round = 0;
        Poker.pot = 0;
        Poker.community = [];
        Poker.curBet = 0;
        Poker.foldCount = 0;
        Poker.allinCount = 0;
        Poker.deck = [];
        Poker.lastCall = 0;
        for (i = 0; i < playerCount; i++) {
            if (playerArray[i].money == 0) {
                removePlayer(playerArray[i].name);
            }
        }
        for (i = 0; i < playerCount; i++) {
            playerArray[i].fold = false;
            playerArray[i].ante = false;
            playerArray[i].allin = false;
            playerArray[i].lastRaise = false;
            playerArray[i].bet = 0;
            playerArray[i].hand = [];
            playerArray[i].handVal = 0;
            playerArray[i].handName = "";
        }
        if (playerCount > 1) {
            playerArray = playerArray.concat(playerArray.splice(0,1));
        }
        playerCount = playerArray.length;
        balance();
        send("Start a new game to play again!");
    }

    function roundAction() {
        if (actionAble() === true) {
            send(`${playerArray[Poker.turn].name}, it is your turn. **panda!check**, **panda!raise**, **panda!fold**, or **panda!call**?`);
        } else if (actionAble() === "allin") {
            send(`${playerArray[Poker.turn].name}, it is your turn. You must **panda!fold** or go all in with **panda!call**.`);
        } else {
            Poker.turn++;
            action("Poker");
        }
    }

    function actionAble() {
        if (playerArray[Poker.turn].fold === true) {
            return false;
        } else if (playerArray[Poker.turn].allin === true) {
            return false;
        } else if (playerArray[Poker.turn].lastRaise === true) {
            return false;
        } else if (Poker.lastCall) {
            return false;
        } else if (playerArray[Poker.turn].money <= Poker.curBet) {
            return "allin";
        } else {
            return true;
        }
    }
    /*=========
    [Game Loop]
    =========*/
    function action(game) {
        switch(game) {
            case "Poker": //Poker Handler
            if (Poker.lastCall === true && Poker.round < 4) {
                if (!allinMsg) {
                    send("All other players are all in! Who will win in the showdown?");
                    allinMsg = true;
                }
                nextRound();
            } else if (Poker.foldCount !== playerCount - 1 || Poker.foldCount == 0) {
                if (Poker.round == 0) { //Ante
                    if (Poker.turn == 0) {
                        send("", embed("The Ante - Type **panda!ante** to receive your cards", "", "gold"));
                        for (i = 0; i < playerCount * 2 - 1; i += 2) {
                            playerArray[i / 2].hand = [Poker.deck[i], Poker.deck[i + 1]];
                        }
                        Cards.dealt = 2*playerCount;
                    } else if (Poker.turn < playerCount && Poker.turn > 0) {
                        send(`${playerCount - Poker.turn} player(s) remaining to **panda!ante**...`);
                    } else {
                        nextRound();
                    }
                } else if (Poker.round == 1) { //Pre-Flop Betting
                    if (Poker.turn == 0 && Poker.curBet == 0) {
                        send("", embed(`Round 1: Pre-Flop | Pot: $${Poker.pot}`, "", "gold"));
                        roundAction();
                    } else if (Poker.turn == playerCount) {
                        nextRound();
                    } else {
                        roundAction();
                    }
                } else if (Poker.round == 2) { //Flop
                    if (Poker.turn == 0 && Poker.curBet == 0) {
                        send("", embed(`Round 2: Flop | Pot: $${Poker.pot}`,`${Poker.deckDisplay[Cards.dealt]}   ${Poker.deckDisplay[Cards.dealt + 1]}   ${Poker.deckDisplay[Cards.dealt + 2]}`, "gold"));
                        roundAction();
                    } else if (Poker.turn == playerCount) {
                        nextRound();
                    } else {
                        roundAction();
                    }
                } else if (Poker.round == 3) {
                    if (Poker.turn == 0 && Poker.curBet == 0) {
                        send("", embed(`Round 3: Turn | Pot: $${Poker.pot}`, `${Poker.deckDisplay[Cards.dealt]}   ${Poker.deckDisplay[Cards.dealt + 1]}   ${Poker.deckDisplay[Cards.dealt + 2]}   ${Poker.deckDisplay[Cards.dealt + 3]}`, "gold"));
                        roundAction();
                    } else if (Poker.turn == playerCount) {
                        nextRound();
                    } else {
                        roundAction();
                    }
                } else if (Poker.round == 4) {
                    if (Poker.turn == 0 && Poker.curBet == 0) {
                        send("", embed(`Final Round: River | Pot: $${Poker.pot}`, `${Poker.deckDisplay[Cards.dealt]}   ${Poker.deckDisplay[Cards.dealt + 1]}   ${Poker.deckDisplay[Cards.dealt + 2]}   ${Poker.deckDisplay[Cards.dealt + 3]}   ${Poker.deckDisplay[Cards.dealt + 4]}`, "gold"));
                        roundAction();
                    } else if (Poker.turn == playerCount) {
                        nextRound();
                    } else {
                        roundAction();
                    }
                } else if (Poker.round == 5) { //End Game
                    for (j = 0; j < 5; j++) {
                        Poker.community[j] = Poker.deck[Cards.dealt + j];
                    }
                    maxIndex = Poker.calcHands();
                    if (maxIndex.length == 1) {
                        send(`${playerArray[maxIndex[0]].name} wins $${Poker.pot} with a **${playerArray[maxIndex[0]].handName.replace(/^high card$|^one pair$|^two pairs$|^three of a kind$|^straight$|^flush$|^full house$|^four of a kind$|^straight flush$/gi, function(matched) {
                        return fullname[matched];
                    })}**`, embed(playerArray[maxIndex[0]].name + "'s Cards", Poker.deckDisplay[2 * maxIndex[0]] + _s + Poker.deckDisplay[2 * maxIndex[0] + 1], "green"));
                        playerArray[maxIndex[0]].money += Poker.pot;
                    }
                    endGame();
                }
            } else { //All other players have folded
                var foldArray = playerArray.map(function(a) {
                    return a.fold;
                });
                maxIndex = foldArray.indexOf(false);
                send(`${playerArray[maxIndex].name} wins $${Poker.pot}!`);
                playerArray[maxIndex].money += Poker.pot;
                endGame();
            }
            break;

            case "Blackjack": //Blackjack Handler
                if (Cards.dealt == 0) {
                    for (i = 0; i < playerCount * 2 - 1; i += 2) {
                            playerArray[i / 2].hand = [Blackjack.deck[i], Blackjack.deck[i + 1]];
                        }
                    Cards.dealt = 2*playerCount;
                    Blackjack.dealer.hand = [Blackjack.deck[Cards.dealt], Blackjack.deck[Cards.dealt + 1]];
                    Blackjack.calcHand(Blackjack.dealer, Blackjack.dealer.hand);
                    var dealerCard = Cards.dealt + 2;
                    while (Blackjack.dealer.handVal < 17 && Blackjack.dealer.hand.length < 5) {
                        Blackjack.dealer.hand.push(Blackjack.deck[dealerCard]);
                        dealerCard++;
                        Blackjack.calcHand(Blackjack.dealer, Blackjack.dealer.hand);
                    }
                    for (i = 0; i < Blackjack.dealer.hand.length; i++) {
                        Blackjack.dealer.handDisplay.push("**" + Blackjack.dealer.hand[i].replace(/T|c|d|h|s/gi, function(matched) {
                        return shorthand[matched]; }) + "**");
                    };
                    send("",embed("Dealer's Card",`${Blackjack.dealer.handDisplay[0]}`,"black"));
                    action("Blackjack");
                }
                else if (Blackjack.turn == playerCount) {
                    send("Game is over.");
                }
                else {
                    if (findPlayer(userId) == Blackjack.turn) {
                        var playerIndex = findPlayer(userId);
                        Blackjack.calcHand(playerArray[Blackjack.turn], playerArray[Blackjack.turn].hand);
                        send("",embed(`${playerArray[Blackjack.turn].name}'s Cards | Value: ${playerArray[Blackjack.turn].handVal}`,`${Blackjack.deckDisplay[playerIndex * 2]}   ${Blackjack.deckDisplay[playerIndex * 2 + 1]}`,"green"));
                        send(`${playerArray[Blackjack.turn].name}, it is your turn. Yay!`);
                        /* To-Do:
                        -Go through all player turns
                        -Create a "hit" command
                        -Create a "stay" command
                        -Determine a winner of the game
                        --Implement a betting system to win money (shared with Poker)
                        --Make a split and insurance option during the turn */
                    }
                    else {
                        send(`${playerArray[Blackjack.turn].name}, it is not your turn.`);
                    }
                }
            break;
        }
    }

    /*==================
    [onMessage Commands]
    ==================*/
    //Roles
    var cardmaster = message.guild.roles.find(r => r.name === "Card Master" ) || false;

    if (cmd === `${prefix}test`) {
        console.log("No test command set.");
    }

    if (cmd === `${prefix}clear`) {
        if (message.member.roles.has(cardmaster.id)) {
            purge(args[0]);
        }
        else {
            send("Gamblers cannot erase their mistakes. Only a __Cardmaster__ can.");
        }
    }

    if (cmd === `${prefix}showDeck`) {
        if (message.member.roles.has(cardmaster.id)) {
            embed("Shuffled Deck", Poker.deckDisplay.toString().replace(/,/g, _s));
        } else { return; }
    }

    if (cmd === `${prefix}poker`) {
        if (playerCount >= 2 && playerCount <= 9) {
            Cards.newDeck(Poker);
            for (i = 0; i < Poker.deck.length; i++) {
                Poker.deckDisplay.push("**" + Poker.deck[i].replace(/T|c|d|h|s/gi, function(matched) {
                return shorthand[matched];
                }) + "**");
            };
            Poker.round = 0;
            Poker.turn = 0;
            send(shuffledMsg);
            game = true;
            gameType = "Poker";
            action("Poker");
        } else { send("You need 2-9 players to play Poker. Type **panda!player** for more info..."); }
    }

    if (cmd === `${prefix}blackjack`) {
        if (playerCount > 0 && playerCount <= 8) {
            Cards.newDeck(Blackjack);
            for (i = 0; i < Blackjack.deck.length; i++) {
                Blackjack.deckDisplay.push("**" + Blackjack.deck[i].replace(/T|c|d|h|s/gi, function(matched) {
                return shorthand[matched];
                }) + "**");
            };
            Blackjack.turn = 0;
            send(shuffledMsg);
            game = true;
            gameType = "Blackjack";
            action("Blackjack");
        }
        else { send("You need 1-8 players to play Blackjack. Type **panda!player** for more info..."); }
    }

    if (cmd === `${prefix}player`){
        if (!game) {
            switch (args[0]) {
                case "add":
                    if (typeof args[1] === 'string' && args[1].substr(0, 2) == '<@' && !isBot(args[1])) { //Improvements for username test?
                        if (findPlayer(args[1]) == -1) {
                            playerArray.push(new Player(args[1], startMoney, getUserName(args[1])));
                            send(`${args[1]} was added to the game.`);
                        }
                        else { send(`${args[1]} is already in the game!`); }
                    } else {
                        send('Invalid username / User is a bot.');
                    }
                    break;
                case "del":
                    if (typeof args[1] === 'string' && args[1].substr(0, 2) == '<@') {
                        removePlayer(args[1]);
                    } else {
                        send('Invalid username.');
                    }
                    break;
                case "clr":
                    playerArray = [];
                    send('Player list cleared.');
                    break;
                case "list":
                    if (playerCount > 0) {
                        send(`Current players: ${playerArray.map(function(a) {return a.name; }).toString().replace(/,/g, ', ')}`);
                    } else {
                        send("No players have been added to the list.");
                    }
                    break;
                default:
                    send("*Note: Players are removed upon losing all of their money*```Fix\npanda!player[add/del] {name} - Add/remove players to the game```");
                    break;
            }
            playerCount = playerArray.length;
        } else send(endGameMsg);
    }

    if (cmd === `${prefix}money`) {
        if (!game) {
            if (args[0] >= 20 && (args[1] >= 2 || args[1] === null)) {
                startMoney = args[0];
                minBet = args[1];
            } else {
                send(`Starting money must be greater than 20, and the minimum bet must be greater than 2.
\`$money {start} {min. bet} - Set the starting balance and minimum bet for all players\``);
            }
        } else {
            send(endGameMsg);
        }
    }

    if (cmd === `${prefix}balance` || cmd === `${prefix}bal`) {
        if (typeof args[0] === 'string' && args[0].substr(0, 2) == '<@') {
            send("", embed("Balance", balance(args[0]), "blue"));
        } else {
            send("", embed("Balances", balance("all"), "blue"));
        }
    }

    if (cmd === `${prefix}fold`) {
        if (game && Poker.round > 0 && gameType === "Poker") {
            var foldReturn = playerArray[Poker.turn].Poker.doFold(isTurn(userId));
            if (foldReturn === true) {
                send(`${playerArray[Poker.turn].name} folds!`);
                Poker.foldCount++;
                Poker.turn++;
                action("Poker");
            } else if (foldReturn === false) {
                send(`${playerArray[Poker.turn].name}, you already folded!`);
            } else if (foldReturn === "turn") {
                send(`${userId}, it is not your turn.`);
            }
        } else if (game && Poker.round === 0) {
            send(anteMsg);
        } else if (gameType !== "Poker") { return; }
        else {
            send(startGameMsg);
        }
    }

    if (cmd === `${prefix}check`) {
        if (game && Poker.round > 0 && gameType === "Poker") {
            var checkReturn = playerArray[turn].Poker.check(isTurn(userId));
            if (checkReturn === true) {
                send(`${playerArray[Poker.turn].name} checks.`);
                Poker.turn++;
                action("Poker");
            } else if (checkReturn === false) {
                send(`${playerArray[Poker.turn].name}, you cannot check because someone has raised.`);
            } else if (checkReturn === "turn") {
                send(`${userId}, it is not your turn.`);
            }
        } else if (game && Poker.round === 0) {
            send(anteMsg);
        } else if (gameType !== "Poker") { return; }
        else {
            send(startGameMsg);
        }
    }

    if (cmd === `${prefix}raise`) {
        if (game && Poker.round > 0 && gameType === "Poker") {
            if (parseInt(args[0]) >= minBet && parseInt(args[0]) >= 2 * Poker.curBet && parseInt(args[0]) <= 20 * minBet * playerCount) {
                var raiseReturn = playerArray[Poker.turn].Poker.raise(isTurn(userId), parseInt(args[0]));
                if (raiseReturn === true) {
                    send(`${playerArray[Poker.turn].name} raises $${parseInt(args[0])}.`);
                    Poker.pot += parseInt(args[0]);
                    Poker.curBet = parseInt(args[0]);
                    playerArray[Poker.turn].money -= parseInt(args[0]);
                    playerArray[Poker.turn].bet += parseInt(args[0]);
                    for (i = 0; i < playerCount; i++) {
                        playerArray[i].lastRaise = false;
                    }
                    playerArray[Poker.turn].lastRaise = true;
                    Poker.turn = 0;
                    action("Poker");
                } else if (raiseReturn === "allin") {
                    send(`${playerArray[Poker.turn].name} is going all in by raising $${playerArray[Poker.turn].money}!`);
                    Poker.pot += playerArray[Poker.turn].money;
                    Poker.curBet = playerArray[Poker.turn].money;
                    Poker.allinCount++;
                    playerArray[Poker.turn].bet += playerArray[Poker.turn].money;
                    playerArray[Poker.turn].money = 0;
                    playerArray[Poker.turn].allin = true;
                    for (i = 0; i < playerCount; i++) {
                        playerArray[i].lastRaise = false;
                    }
                    playerArray[Poker.turn].lastRaise = true;
                    Poker.turn = 0;
                    action("Poker");
                } else if (raiseReturn === "turn") {
                    send(`${userId}, it is not your turn.`);
                }
            } else {
                var minRaise = Math.max(2 * Poker.curBet, minBet);
                var maxRaise = 20 * minBet * playerCount;
                send(`Invalid raise. The minimum bet is currently $${minRaise} and the maximum is $${maxRaise}.`)
            }
        } else if (game && Poker.round === 0) {
            send(anteMsg);
        } else if (gameType !== "Poker") { return; }
        else {
            send(startGameMsg);
        }
    }

    if (cmd === `${prefix}call`) {
        if (game && Poker.round > 0 && gameType === "Poker") {
            var callReturn = playerArray[Poker.turn].Poker.call(isTurn(userId));
            var diffBet = Poker.curBet - playerArray[Poker.turn].bet;
            if (callReturn === true) {
                send(`${playerArray[turn].name} calls $${diffBet}.`);
                Poker.pot += diffBet;
                playerArray[Poker.turn].bet += diffBet;
                playerArray[Poker.turn].money -= diffBet;
                Poker.turn++;
                action("Poker");
            } else if (callReturn === "last-call") {
                send(`${playerArray[turn].name} makes the final call of $${diffBet}.`);
                Poker.pot += diffBet;
                Poker.lastCall = true;
                playerArray[Poker.turn].bet += diffBet;
                playerArray[Poker.turn].money -= diffBet;
                action("Poker");
            } else if (callReturn === "allin") {
                send(`${playerArray[Poker.turn].name} is going in by matching $${playerArray[Poker.turn].money}!`);
                Poker.pot += playerArray[Poker.turn].money;
                Poker.allinCount++;
                playerArray[Poker.turn].bet += playerArray[Poker.turn].money;
                playerArray[Poker.turn].money = 0;
                playerArray[Poker.turn].allin = true;
                Poker.turn++;
                action("Poker");
            } else if (callReturn === "last-allin") {
                send(`${playerArray[Poker.turn].name} is the last to go all in with $${playerArray[Poker.turn].money}!`);
                Poker.pot += playerArray[Poker.turn].money;
                Poker.allinCount++;
                Poker.lastCall = true;
                playerArray[Poker.turn].bet += playerArray[Poker.turn].money;
                playerArray[Poker.turn].money = 0;
                playerArray[Poker.turn].allin = true;
                action("Poker");
            } else if (callReturn === "turn") {
                send(`${userId}, it is not your turn.`);
            } else {
                send(`${playerArray[Poker.turn].name}, there is nothing to call. Did you mean to **panda!check**?`)
            }
        } else if (game && Poker.round === 0) {
            send(anteMsg);
        } else if (gameType !== "Poker") { return; }
        else {
            send(startGameMsg);
        }
    }

    if (cmd === `${prefix}ante`) {
        if (game && gameType === "Poker") {
            var playerIndex = findPlayer(userId);
            if (playerArray[playerIndex].fold === false && playerArray[playerIndex].money >= minBet && playerArray[playerIndex].ante === false) {
                dm(`Channel: #${message.channel.name} | Server: __${message.guild.name}__`, embed("Your Cards", Poker.deckDisplay[playerIndex * 2] + _s + Poker.deckDisplay[playerIndex * 2 + 1], "green"));
                playerArray[playerIndex].ante = true;
                playerArray[playerIndex].money -= minBet;
                Poker.pot += minBet;
                Poker.turn++;
                action("Poker");
            } else if (playerArray[playerIndex].fold) {
                send(`${userId} has already folded!`);
            } else if (playerArray[playerIndex].money < minBet && playerArray[playerIndex].money > 0) {
                send(`${userId} is going all in!`);
                playerArray[playerIndex].ante = true;
                playerArray[playerIndex].allin = true;
                Poker.allinCount++;
                Poker.pot += playerArray[playerIndex].money;
                playerArray[playerIndex].money = 0;
                Poker.turn++;
                action("Poker");
            } else if (playerArray[playerIndex].ante === true) {
                send(`${userId} has already called the ante!`);
            } else {
                send("You cannot ante at this time. Please wait until the game is over.");
            }
        } else if (gameType !== "Poker") { return; }
        else {
            send(startGameMsg)
        }
    }

    if (cmd === `${prefix}end`) {
        if (game) {
            send("Game has been terminated.");
            endGame();
        } else {
            send("Game has not started yet.");
        }
    }

    if (cmd === `${prefix}restart`) {
        send("*CardBot restarting...* (This may take up to a minute)");
        cardBot.destroy();
    }
    if (cmd === `${prefix}table`) {
        send("", embed("__Hand Ranks (Highest to Lowest)__", `**Royal Flush** - A:clubs: K:clubs: Q:clubs: J:clubs: 10:clubs:

**Straight Flush** - 3:hearts: 4:hearts: 5:hearts: 6:hearts: 7:hearts:

**Four of a Kind** - K:spades: K:diamonds: 3:clubs: K:hearts: K:clubs:

**Full House** - 7:diamonds: 7:spades: 7:hearts: Q:hearts: Q:spades:

**Flush** - 4:diamonds: 7:diamonds: 9:diamonds: J:diamonds: A:diamonds:

**Straight** - 7:spades: 8:diamonds: 9:spades: 10:clubs: J:hearts:

**Three of a Kind** - A:spades: 4:hearts: 2:clubs: 4:diamonds: 4:spades:

**Two Pair** - 2:clubs: J:spades: J:diamonds: 8:hearts: 2:hearts:

**Pair** - 6:spades: 3:spades: 7:clubs: 6:hearts: 4:diamonds:

**High Card** - A:diamonds: 4:hearts: 6:clubs: 3:diamonds: Q:spades: (High Card: Ace)`, "red"));
    }
// prefix command
//will allow the user to change the prefix in the server.
   if(cmd === `${prefix}setprefix`){
     if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("No can do!");
     if(!args[0] || args[0 == "help"]) return message.reply(`Usage: ${prefixes}setprefix <desired prefix here>`);

     let prefixes = JSON.parse(fs.readFileSync("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/prefix.json", "utf8"));

     prefixes[message.guild.id] = {
       prefixes: args[0]
     };

     fs.writeFile("C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/prefix.json", JSON.stringify(prefixes), (err) => {
       if(err) console.log(err)
     });
     let sEmbed = new Discord.RichEmbed()
     .setColor(0x43f47a)
     .setTitle("Prefix Set!")
     .setDescription(`Set to ${args[0]}`);

     message.channel.send(sEmbed);
     }
// ping commands
//will allow the user to check the ping
if(cmd === `${prefix}ping`){
  message.channel.send(`Ping is ${bot.ping}ms!`);
}
//vote command
//this gives the user a link to vote for this bot.
if(cmd === `${prefix}vote`){
    return message.channel.send("you would like to vote for me 😱. thats so sweet of you. here you can vote for me here: https://discordbots.org/bot/465609063879671808")
  }

//rection commands

//hug command
if(cmd ===`${prefix}hug`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/hug`);
  let hUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!hUser) return message.channel.send("Please enter a vaild user");

  let hugEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} hugs ${hUser} ^///////^`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(hugEmbed);
}

//kiss command
if(cmd === `${prefix}kiss`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/kiss`);
  let KissUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!KissUser) return message.channel.send("Please enter a vaild user.");

  let kissEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} kisses ${KissUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(kissEmbed);
}

//pat command
if(cmd ===`${prefix}pat`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/pat`);
  let PatUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!PatUser) return message.channel.send("Please enter a vaild user.");

  let patEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} pats ${PatUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(patEmbed);
}

//poke command
if(cmd === `${prefix}poke`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/poke`);
  let PokeUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!PokeUser) return message.channel.send("Please enter a vaild user.");

  let pokeEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} pokes ${PokeUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(pokeEmbed);
}

//cuddle command
if(cmd === `${prefix}cuddle`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/cuddle`);
  let CuddleUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!CuddleUser) return message.channel.send("Please enter a vaild user.");

  let cuddleEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} cuddles ${CuddleUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(cuddleEmbed);
}

//meow command
if(cmd === `${prefix}slap`){
  let {body} = await superagent.get(`https://nekos.life/api/v2/img/slap`);
  let SlapUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  let slapEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} slapped ${SlapUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(slapEmbed);
}
//music commands
//will let the user play music in th voice channel, and have control
var guild = {};
const searchString = args.slice(0).join(' ');
const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
const serverQueue = queue.get(message.guild.id);

if(cmd === `${prefix}p` || cmd === `${prefix}play`){
  let pEmbed = new Discord.RichEmbed()
  .setTitle(`INVALID USEAGE`)
  .setAuthor(message.author.username)
  .addField('Correct Formatting', `*${prefix}p <song name>* or *${prefix}play <song name>* `)
  .addField('Example:', `*${prefix}p goddess chrome spark* or *${prefix}play goddess chrome spark*`);

  if(!args[0])return message.channel.send(pEmbed);

  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send("I'm sorry, but you need to be in a voice channel to play music");
  const permissions = voiceChannel.permissionsFor(bot.user);
  if(!permissions.has('CONNECT')){
    return message.channel.send('I cannot connect in this voice channel, please make sure I have the right permission');
  }
  if(!permissions.has('SPEAK')){
    return message.channel.send('I cannot speak in this voice channel, please make sure I have the right permission.');
  }
  message.channel.send(`Searching for ${searchString} on Youtube.`);
  if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
    const playlist = await youtube.getPlaylist(url);
    return console.log(playlist);
    const videos = await playlist.getVideo();
    for(const video of Object.values(videos)){
      const video2 = await youtube.getVideoByID(video.id);
      await handleVideo(video2. message, voiceChannel, true);
    }
    return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
  } else {
    try {
      var videos = await youtube.searchVideos(searchString, 1);
    var video = await youtube.getVideoByID(videos[0].id);
    } catch(err){
      console.error(err);
      return message.channel.send('🆘 I could not obtain any search results.');
    }
  }
  return handleVideo(video, message, voiceChannel);
} else if(cmd === `${prefix}s`|| cmd === `${prefix}skip`){
  if(!message.member.voiceChannel) return message.channel.send("Your not in a voice channel!");
  if(!serverQueue) return message.channel.send("There is nothing playing that I could skip for you");
  serverQueue.connection.dispatcher.end('Skip cmd has been used!');
  return undefined;
} else if(cmd === `${prefix}st`|| cmd === `${prefix}stop`){
  if(!message.member.voiceChannel) return message.channel.send('Your not in a voice channel!');
  if(!serverQueue) return message.channel.send("There is nothing playing that i could stop for you");
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Stop cmd has been used!');
  message.channel.send(`Successfully stop the queuing and left the voice channel.`)
  return undefined;
} else if(cmd === `${prefix}vol` || cmd === `${prefix}volume`){
  if(!message.member.voiceChannel) return message.channel.send('You are not in a voice channel');
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  let volEmbed = new Discord.RichEmbed()
  .setTitle(`Volume`)
  .setAuthor(message.author.username)
  .addField('Current Volume', ` **${serverQueue.volume}**`)
  .addField('To Change The Volume', `*${prefix}vol [1-5]* or *${prefix}volume [1-5]*`)
  .addField('Example:', `*${prefix}vol 3* or *${prefix}volume 3*`);

  if(!args[0])return message.channel.send(volEmbed);
  serverQueue.volume = args[0];
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  return message.channel.send(`I set the volume to: **${args[0]}**`);
} else if (cmd === `${prefix}np`) {
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
} else if (cmd === `${prefix}q` || cmd === `${prefix}queue`) {
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  let index = 0;
  let queueEmbed = new Discord.RichEmbed()
  .setTitle(`Playing ${serverQueue.songs[0].title}`)
  .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
  message.channel.send(queueEmbed);
}
else if (cmd === `${prefix}remove` || cmd === `${prefix}r`){
  let removeInfo = new Discord.RichEmbed()
  .setTitle(`~INVALID USAGE~`)
  .addField(`Correct Formatting`, `*${prefix}remove <Song Queuing number>* or *${prefix}r <Song Queuing number>*`)
  .addField(`Example`, `*${prefix}remove 3* or *${prefix}r 3*`);
  if(!args[0])return message.channel.send(removeInfo);
      let index = 0;
      let toSkip = args[0];
      toSkip = Math.min(toSkip, serverQueue.songs.length);

      // Skip.
      serverQueue.songs.splice(serverQueue.songs.indexOf(toSkip - 1), 1);
      message.channel.send(`Successfully removed song number ${toSkip} from the queueing list.`);
      let removeEmbed = new Discord.RichEmbed()
      .setTitle(`Playing ${serverQueue.songs[0].title}`)
      .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
      message.channel.send(removeEmbed);
}
else if (cmd === `${prefix}pa` || cmd === `${prefix}pause`) {
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send('⏸ Paused the music for you!');
  }
  return message.channel.send('There is nothing playing.');
} else if (cmd === `${prefix}re` || cmd === `${prefix}resume`) {
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send('▶ Resumed the music for you!');
  }
  return message.channel.send('There is nothing playing.');
}
//radio commands
else if(cmd === `${prefix}radio`){
    const radioStation = args.slice(0).join(' ');
  let radioInfo = new Discord.RichEmbed()
  .setTitle(`~INVALID USAGE~`)
  .addField(`Correct Formatting:`, `${prefix}radio <station or genre>`)
  .addField(`Example`, `${prefix}radio JAM'N`)
  .addField(`Can't Find the right Station or genre?:`, `Go Here https://www.iheart.com/ to search what you want, make sure its in the playlist filter. when you find it come back to me and tell me what you want.`);
  if(!radioStation)return message.channel.send(radioInfo);
  message.channel.send(`Searching on IHeart radio's playlist for ${radioStation}`);
  const voiceChannel = message.member.voiceChannel;
    var connection = await voiceChannel.join();
    const matches = await iheart.search(radioStation);
    const station = matches.stations[0];
    const url = await iheart.streamURL(station);
     const dispatcher = connection.playStream(url);
    console.log(url);
    //message.channel.send(`Now playing ${args[0]}`);
    message.channel.send(`Found a match.`);
    let radioEmbed = new Discord.RichEmbed()
    .setTitle(`Now Playing: ${radioStation}`)
    .addField(`Not the one you want?:`, `Go Here https://www.iheart.com/ to search what you want, make sure its in the playlist filter. when you find it come back to me and tell me what you want.`)
    .setFooter(`Requested by ${message.author.username}`);
    message.channel.send(radioEmbed);

  }
  if(cmd ===`${prefix}leave`){
  if(!message.member.voiceChannel) return message.channel.send('You are not in a voice channel');
      message.member.voiceChannel.leave();
      message.channel.send('successful left the voice channel.')
  }
 });
 async function handleVideo(video, message, voiceChannel, playlist = false) {
 	const serverQueue = queue.get(message.guild.id);
 	console.log(video);
 	const song = {
 		id: video.id,
 		title: Util.escapeMarkdown(video.title),
 		url: `https://www.youtube.com/watch?v=${video.id}`
 	};
 	if (!serverQueue) {
 		const queueConstruct = {
 			textChannel: message.channel,
 			voiceChannel: voiceChannel,
 			connection: null,
 			songs: [],
 			volume: 5,
 			playing: true
 		};
 		queue.set(message.guild.id, queueConstruct);

 		queueConstruct.songs.push(song);

 		try {
 			var connection = await voiceChannel.join();
 			queueConstruct.connection = connection;
 			play(message.guild, queueConstruct.songs[0]);
 		} catch (error) {
 			console.error(`I could not join the voice channel: ${error}`);
 			queue.delete(message.guild.id);
 			return message.channel.send(`I could not join the voice channel: ${error}`);
 		}
 	} else {
 		serverQueue.songs.push(song);
 		console.log(serverQueue.songs);
 		if (playlist) return undefined;
 		else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
 	}
 	return undefined;
 }
 function play(guild, song) {
 	const serverQueue = queue.get(guild.id);

 	if (!song) {
 		serverQueue.voiceChannel.leave();
 		queue.delete(guild.id);
 		return;
 	}
 	console.log(serverQueue.songs);

 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
 		.on('end', reason => {
 			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
 			else console.log(reason);
       serverQueue.songs.shift();
 			play(guild, serverQueue.songs[0]);
 		})
 		.on('error', error => console.error(error));
     setTimeout(function(){
 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
 }, 500);
}
bot.login(botconfig.discord_token);
