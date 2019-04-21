const Discord = require('discord.js');
const fs = require('fs');
let langFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/language.json";
let lang = JSON.parse(fs.readFileSync(langFile, "utf8"));
const translate = require('translate-google');
module.exports.run = (client, message, args, tools) =>{
    
    let setLang = args[0];
    let user = message.author;

    if(!setLang) return message.channel.send("what language would you like to be your default language?\naf: 'Afrikaans'\nsq: 'Albanian',\nar: 'Arabic',\nhy: 'Armenian',\naz: 'Azerbaijani',\neu: 'Basque',\nbe: 'Belarusian',\nbn: 'Bengali',\nbs: 'Bosnian',\nbg: 'Bulgarian',\nca: 'Catalan',\nceb: 'Cebuano',\nny: 'Chichewa',\n'zh-cn': 'Chinese Simplified',\n'zh-tw': 'Chinese Traditional',\nco: 'Corsican',\nhr: 'Croatian',\ncs: 'Czech',\nda: 'Danish',\nnl: 'Dutch',\nen: 'English',\neo: 'Esperanto',\net: 'Estonian',\ntl: 'Filipino',\nfi: 'Finnish',\nfr: 'French',\nfy: 'Frisian',\ngl: 'Galician',\nka: 'Georgian',\nde: 'German',\nel: 'Greek',\ngu: 'Gujarati',\nht: 'Haitian Creole',\nha: 'Hausa',\nhaw: 'Hawaiian',\niw: 'Hebrew',\nhi: 'Hindi',\nhmn: 'Hmong',\nhu: 'Hungarian',\nis: 'Icelandic',\nig: 'Igbo',\nid: 'Indonesian',\nga: 'Irish',\nit: 'Italian',\nja: 'Japanese',\njw: 'Javanese',\nkn: 'Kannada',\nkk: 'Kazakh',\nkm: 'Khmer',\nko: 'Korean',\nku: 'Kurdish (Kurmanji)',\nky: 'Kyrgyz',\nlo: 'Lao',\nla: 'Latin',\nlv: 'Latvian',\nlt: 'Lithuanian',\nlb: 'Luxembourgish',\nmk: 'Macedonian',\nmg: 'Malagasy',\nms: 'Malay',\nml: 'Malayalam',\nmt: 'Maltese',\nmi: 'Maori',\nmr: 'Marathi',\nmn: 'Mongolian',\nmy: 'Myanmar (Burmese)',\nne: 'Nepali',\nno: 'Norwegian',\nps: 'Pashto',\nfa: 'Persian',\npl: 'Polish',\npt: 'Portuguese',\nma: 'Punjabi',\nro: 'Romanian',\nru: 'Russian',\nsm: 'Samoan',\ngd: 'Scots Gaelic',\nsr: 'Serbian',\nst: 'Sesotho',\nsn: 'Shona',\nsd: 'Sindhi',\nsi: 'Sinhala',\nsk: 'Slovak',\nsl: 'Slovenian',\nso: 'Somali',\nes: 'Spanish',\nsu: 'Sudanese',\nsw: 'Swahili',\nsv: 'Swedish',\ntg: 'Tajik',\nta: 'Tamil',\nte: 'Telugu',\nth: 'Thai',\ntr: 'Turkish',\nuk: 'Ukrainian',\nur: 'Urdu',\nuz: 'Uzbek',\nvi: 'Vietnamese',\ncy: 'Welsh',\nxh: 'Xhosa',\nyi: 'Yiddish',\nyo: 'Yoruba',\nzu: 'Zulu'");
    if(!lang[user.id]) lang[user.id] ={
        lang: setLang,
        enable: "true"
    };
    fs.writeFile(langFile, JSON.stringify(lang), (err) => {
        if(err) console.log(err);
    });
    translate(`Your language is know set to ${args[0]}`, {from: `en`, to: `${lang[user.id].lang}`}).then(res => {
        console.log(res)
        message.channel.send(res);
    }).catch(err => {
        console.error(err)
    })
};
module.exports.help = {
    name: "lang"
};