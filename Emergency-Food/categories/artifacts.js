const Discord  = require('discord.js');
const fetch = require ('node-fetch');
const utils = require("/home/runner/Emergency-Food/categories/utils"
)

async function GetLstArtifacts(message) {
      await fetch('https://api.genshin.dev/artifacts').then(response => {
        return response.json();    
        }).then(json =>{
        const embed = new Discord.MessageEmbed().setTitle("List of Artifacts");
        for (let i = 0; i < json.length; i++) {
        embed.addFields({ name: utils.capitalizeFirstLetter(json[i]),value:"\n\u200b"});
        }
        embed.setColor('#0099ff');
        message.channel.send(embed);
      })
}

async function GetArtifactInfo(message, artifact) {
      const embed = new Discord.MessageEmbed().setTitle("Artifact : "+artifact);
      await fetch('https://api.genshin.dev/artifacts/'+artifact).then(response => {
        return response.json();    
        }).then(json =>{
        if (json.error == 'Entity artifacts/'+artifact+' for language en not found')
        {
          message.channel.send("The artifact doesn't exist")
          return
        }
        embed.addFields({ name: "Name",value:json.name});
        embed.addFields({ name: "Max rarity",value:json.max_rarity});
        embed.addFields({ name: "2 piece bonus",value:json['2-piece_bonus']});
        embed.addFields({ name: "4 piece bonus",value:json['4-piece_bonus']});
        embed.setColor('#0099ff');
      })
      nameArtifact = ""
      //https://api.genshin.dev/artifacts/the-exile/flower-of-life
      await fetch('https://api.genshin.dev/artifacts/'+artifact+'/t').then(response => {
        return response.json();
        }).then(json =>{
          if (json.error == 'No images for artifacts/'+artifact+' exist') 
          {
            message.channel.send(embed);
            return;
          } 
          nameArtifact = json.availableImages[0]
      })
      link = 'https://api.genshin.dev/artifacts/'+artifact+'/'+nameArtifact+'.png'
      embed.setImage(link)
      message.channel.send(embed);

}

module.exports.GetLstArtifacts = GetLstArtifacts;
module.exports.GetArtifactInfo = GetArtifactInfo;