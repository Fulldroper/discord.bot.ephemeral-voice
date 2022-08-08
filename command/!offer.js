module.exports.info = {
  "name": "offer",
  "type": 1,
  "description": "Створити пропозицію",
  "options": [{
    "name": "text",
    "description": "Текст пропозиції",
    "type": 3,
    "required": true
  },
  {
    "name": "image",
    "description": "Додадкове зображення до пропозиції",
    "type": 11,
    "channel_types": 0,
    "required": false
  }]
}

module.exports.run = async function (interaction) {
  const ref = await this.dbs.guilds.get(interaction.guildId)
    if (ref) {
      if (interaction.channelId === ref) {  
        const user = interaction.member.user
        let {value} = interaction.options.get("text")
        const img = interaction.options.get("image")
        const embed = {
          "embeds": [
            {
              "type": "rich",
              "title": `Нова ініціатива від ${user.username}#${user.discriminator}`,
              "color": 0x363636,
              "description": `${value}`,
              "thumbnail": {
                "url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                "height": 0,
                "width": 0
              },
              "footer": {
                "text": `ініціатива має набрати 20 підписів для розгляду`,
                "iconURL": `${interaction.guild.iconURL() || "https://cdn.discordapp.com/attachments/539138991031844864/986493279833055262/planning1.png"}`
              }
            }
          ]
        }
        const thread = {
          name: `Нова ініціатива від ${user.username}#${user.discriminator}`,
          autoArchiveDuration: 60
        }
        if(img?.attachment?.url) embed.embeds[0].image = {url : img.attachment.url };

          await interaction.reply(embed).catch(e => console.log(e))

          const message = await interaction.fetchReply();
          
          await message.startThread(thread).catch(e => console.log(e));
          await message.react('✅').catch(e => console.log(e));
          await message.react('❌').catch(e => console.log(e));

        } else interaction.reply({ content: `❌ Цей канал не є каналом для пропозицій, спробуйте в каналі <#${ref}>.`, ephemeral: true }).catch(e => console.log(e));
    } else interaction.reply({ content: '❌ Канал для пропозицій за замовчуванням не встановлено.', ephemeral: true }).catch(e => console.log(e));
}