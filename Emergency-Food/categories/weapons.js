const Discord = require('discord.js');
const fetch = require ('node-fetch');
const utils = require("/home/runner/Emergency-Food/categories/utils"
)
async function GetLstWeapons(message) {
      await fetch('https://api.genshin.dev/weapons').then(response => {
        return response.json();    
        }).then(json =>{
        const embed = new Discord.MessageEmbed().setTitle("List of Weapons");
        for (let i = 0; i < json.length; i++) {
        embed.addFields({ name: utils.capitalizeFirstLetter(json[i]),value:"\n\u200b"});
        }
        embed.setColor('#0099ff');
        message.channel.send(embed);
      })
}

async function GetWeaponInfo(message, weapon) {
      const embed = new Discord.MessageEmbed().setTitle("Weapon : "+weapon);
      await fetch('https://api.genshin.dev/weapons/'+weapon).then(response => {
        return response.json();    
        }).then(json =>{
        if (json.error == 'Entity weapons/'+weapon+' for language en not found')
        {
          message.channel.send("The weapon doesn't exist")
          return
        }
        embed.addFields({ name: "Name",value:json.name});
        embed.addFields({ name: "Type",value:json.type});
        embed.addFields({ name: "Rarity",value:json.rarity});
        embed.addFields({ name: "BaseAttack",value:json.baseAttack});
        embed.addFields({ name: "SubStat",value:json.subStat});
        embed.addFields({ name: json.passiveName,value:json.passiveDesc});
        embed.addFields({ name: "Location",value:json.location});

        nameWeapon = ""
      })
      embed.setColor('#0099ff');
      await fetch('https://api.genshin.dev/weapons/'+weapon+'/t').then(response => {
        return response.json();
        }).then(json =>{
          if (json.error == 'No images for weapons/'+weapon+' exist') 
          {
            message.channel.send(embed);
            return;
          }
            nameWeapon = json.availableImages[0]
      })
        link = 'https://api.genshin.dev/weapons/'+weapon+'/'+nameWeapon+'.png'
        embed.setImage(link)

}
module.exports.GetWeaponInfo = GetWeaponInfo;
module.exports.GetLstWeapons = GetLstWeapons;