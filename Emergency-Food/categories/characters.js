const Discord = require('discord.js');
const fetch = require ('node-fetch');
const EmbedPages = require('discord-embed-pages');
const utils = require("/home/runner/Emergency-Food/categories/utils"
)
async function GetLstCharacters(message) {
      await fetch('https://api.genshin.dev/characters').then(response => {
        return response.json();    
        }).then(json =>{
        const embed = new Discord.MessageEmbed().setTitle("List of Characters");
        for (let i = 0; i < json.length; i++) {
        embed.addFields({ name: utils.capitalizeFirstLetter(json[i]),value:"\n\u200b"});
        }
        embed.setColor('#0099ff');
        message.channel.send(embed);
      })
}

async function GetCharacterInfo(message, character) {
      await fetch('https://api.genshin.dev/characters/'+character).then(response => {
        return response.json();    
        }).then(json =>{
        if (json.error == 'Entity characters/'+character+' for language en not found')
        {
          message.channel.send("The character doesn't exist")
          return
        }
        const embed1 = new Discord.MessageEmbed().setTitle(utils.capitalizeFirstLetter(character));
        embed1.addFields({ name: "Description",value:json.description});
        embed1.addFields({ name: "Element",value:json.vision});
        embed1.addFields({ name: "Rarity",value:utils.getStars(json.rarity)});
        embed1.setColor('#0099ff');
        embed1.setImage('https://api.genshin.dev/characters/'+character+'/icon')

        const embed2 = new Discord.MessageEmbed().setTitle("Skill Talents");
        embed2.addFields({ name: "__"+json.skillTalents[0].name+"__",value:json.skillTalents[0].description});
        embed2.addFields({ name: "Unlock",value:json.skillTalents[0].unlock});
        embed2.addFields({ name: "Upgrades",value:"\n\u200b"});
        for (i=0;i<=8;i++)
        {
          embed2.addFields({ name:json.skillTalents[0].upgrades[i].name ,value:json.skillTalents[0].upgrades[i].value});
        }
        embed2.addFields({ name: "__"+json.skillTalents[1].name+"__",value:json.skillTalents[0].description});
        embed2.addFields({ name: "Unlock",value:json.skillTalents[1].unlock});
        for (i=0;i<=2;i++)
        {
          embed2.addFields({ name:json.skillTalents[1].upgrades[i].name ,value:json.skillTalents[1].upgrades[i].value});
        }
        embed2.addFields({ name: "__"+json.skillTalents[2].name+"__",value:json.skillTalents[2].description});
        embed2.addFields({ name: "Unlock",value:json.skillTalents[2].unlock});
        for (i=0;i<=4;i++)
        {
          embed2.addFields({ name:json.skillTalents[2].upgrades[i].name ,value:json.skillTalents[1].upgrades[2].value});
        }
        embed2.setColor('#0099ff');   

        const embed3 = new Discord.MessageEmbed().setTitle("Passive Talents");

        for (i=0;i<=2;i++)
        {
          embed3.addFields({ name:json.passiveTalents[i].name + " "+json.passiveTalents[i].unlock,value: json.passiveTalents[i].description});
        }   
        embed3.setColor('#0099ff');    

        const embed4 = new Discord.MessageEmbed().setTitle(" Constellations")

        for(i=0;i<=5;i++)
        {
          embed4.addFields({ name:'Level '+(i+1)+" : "+json.constellations[i].name,value: json.constellations[i].description});
        }

        embed4.setColor('#0099ff');    
        const pages = [embed1,embed2,embed3,embed4];
        const embedPages = new EmbedPages({ 
            pages: pages, 
            channel: message.channel, 
            restricted: (user) => user.id === message.author.id,
            duration: 60000,
            pageFooter: true,
        });
        embedPages.createPages();
      })
}

module.exports.GetLstCharacters = GetLstCharacters;
module.exports.GetCharacterInfo = GetCharacterInfo;
