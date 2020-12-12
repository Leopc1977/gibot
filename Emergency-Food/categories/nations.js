const Discord = require('discord.js');
const fetch = require ('node-fetch');
const utils = require("/home/runner/Emergency-Food/categories/utils"
)

async function GetLstNations(message) {
  await fetch('https://api.genshin.dev/nations').then(response => {
    return response.json();    
  }).then(json =>{
    const embed = new Discord.MessageEmbed().setTitle("List of Nations");
    for (let i = 0; i < json.length; i++) {
      embed.addFields({ name: utils.capitalizeFirstLetter(json[i]),value:"\n\u200b"});
    }
    embed.setColor('#0099ff');
      message.channel.send(embed);
  })
}

async function GetNationInfo(message, nation) {
      await fetch('https://api.genshin.dev/nations/'+nation).then(response => {
        return response.json();    
        }).then(json =>{
        if (json.error == 'Entity nations/'+nation+' for language en not found')
        {
          message.channel.send("The nation doesn't exist")
          return
        }
        const embed = new Discord.MessageEmbed().setTitle("Nation : "+nation);
        embed.addFields({ name: "Name",value:json.name});
        embed.addFields({ name: "Element",value:json.element});

        embed.addFields({ name: "Archon",value:json.archon});
        embed.addFields({ name: "controllingEntity",value:json.controllingEntity});

        embed.setColor('#0099ff');
        message.channel.send(embed);
      })
}
module.exports.GetNationInfo = GetNationInfo

module.exports.GetLstNations = GetLstNations;