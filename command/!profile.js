module.exports.info = {
  "name": "profile",
  "type": 1,
  "description": "Відобразити профіль користувача",
  "options": [{
    "name": "user",
    "description": "Користувач",
    "type": 6,
    "required": false
  }]
}

module.exports.run = async function (interaction) {
  if (!interaction.isRepliable()) {
    const { user } = interaction.options.get("user")?.member || interaction.member
    const DISCORD_EPOCH = 1420070400000
    const joinedAt = (new Date().getTime() - new Date(member.joinedAt).getTime()).msToDate()






    interaction.reply({
      "embeds": [
        {
          "type": "rich",
          "description": `Аватарка ${user.username}#${user.discriminator}`,
          "color": 0x363636,
          "image": {
            "url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`
          }
        }
      ]
    })
  }
}


// const { MessageEmbed } = require('discord.js');
// module.exports = {
//     isDM : false,
//     run : async function (msg, params) {
//         const { parseUser } = require(`${__dirname}/../${this.settings.folders.libs}/parseUser.js`);

//         const dateFormater = (date, _else_) => `${date.y ? date.y+'г.': ''} ${date.d ? date.d+'д.': ''} ${date.h ? date.h+'ч.': ''} ${date.m ? date.m+'мин.': ''} ${date.s ? date.s+'сек.': ''} ${!date.s && !date.m && !date.h && !date.d && !date.y ? _else_:""}`

//         const uid = (parseUser(params[1]) || msg.author.id)
//         const user = this.cache.users.user(uid,{create: true})
//         const member = msg.guild.members.cache.get(uid);

//         let roles = ""
//         user.roles.forEach(el => {
//             roles+=`<@&${el.id}> `
//         });
//         const DISCORD_EPOCH = 1420070400000
//         const time = user.voiceOnlineMS.msToDate() || 0
//         const joinedAt = (new Date().getTime() - new Date(member.joinedAt).getTime()).msToDate()
//         const created = (new Date().getTime() - new Date((uid / 4194304) + DISCORD_EPOCH).getTime()).msToDate()
//         const text = `${(user.isMarried ? `:couple: В браке: <@${user.isMarried}>` : '')}

//         :moneybag: Кошелёк: ${user.value.numCutter() || 0} ${this.settings.eco.coinEmoji}
        
//         :stopwatch: В голосе: ${dateFormater(time ,"не был ни разу, а жаль :pensive:")}

//         :inbox_tray: На сервере: ${dateFormater(joinedAt ,"тут сложно понять :man_shrugging:")}

//         :busts_in_silhouette: Аккаунту: ${dateFormater(created ,"тут сложно понять :man_shrugging:")}

//         :sparkles: Уровень ${user.lvl}, Опыт (${Math.trunc(user.exp).numCutter() || 0} / ${(this.settings.exp.threshold * user.lvl).numCutter() || 0})

//         :label: Личные роли: ${roles || "Нет"}`
//         msg.reply({embeds: [(
//             new MessageEmbed()
//             .setColor('#2f3136')
//             .setTitle(`ПРОФИЛЬ ~ ${member?.user?.username || 'Пользователя'}`)
//             .setDescription(text)
//             .setImage(`https://cdn.discordapp.com/avatars/${uid}/${member.user.avatar}.webp?size=256`)
//             .setFooter(`✍️ - ${(user.isMuted ? '❌' : '✔')} | 🎙️ - ${(user.isGaged ? '❌' : '✔')} | 💑 - ${(user.isMarried ?'✔' : '❌')} | ⚠️ - ${user.warns.length}`)
//         )]})
//     }
// }