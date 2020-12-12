const { Client, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fetch = require ('node-fetch');
const config = require('./config');

const artifacts = require('./categories/artifacts');
const characters = require('./categories/characters');
const weapons = require('./categories/weapons');
const nations = require('./categories/nations');
const help = require('./categories/help');

let bot = new Client({
  presence: {
    status: 'online',
    activity: {
      name: `GENSHIN IMPACT`,
      type: 'PLAYING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {

  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

//ARTIFACTS
    if (command === 'artifact'  || command === 'artefact') {
      artifacts.GetLstArtifacts(message);
    }
    if ((command === 'info'  || command === 'infos') && args[0]=='a') {
      artifacts.GetArtifactInfo(message, args[1]);
    }

//CHARACTERS
    if (command === 'character'  || command === 'characters') {
      characters.GetLstCharacters(message);
    }
    if ((command === 'info'  || command === 'infos') && args[0]=='c') {
      characters.GetCharacterInfo(message, args[1]);
    }
  
//NATIONS
    if (command === 'nation'  || command === 'nations') {
      nations.GetLstNations(message);
    }
    if ((command === 'info'  || command === 'infos') && args[0]=='n') {
      nations.GetNationInfo(message, args[1]);
    }
//WEAPONS
    if (command === 'weapon'  || command === 'weapons') {
      weapons.GetLstWeapons(message)
    }
    if ((command === 'info'  || command === 'infos') && args[0]=='w') {
      weapons.GetWeaponInfo(message, args[1]);
    }

//HELP
   if (command === 'help') {
     help.help(message);
   }
  }
});

require('./server')();
bot.login(config.token);