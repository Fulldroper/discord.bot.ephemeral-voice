module.exports.info = {
  "name": "setchannel",
  "type": 1,
  "description": "Вибрати канал для публікації пропозицій",
  "options": [{
    "name": "channel",
    "description": "Текстовий канал",
    "type": 7,
    "channel_types": 0,
    "required": true
  }]
}

module.exports.run = async function(interaction) {
  if (interaction.member.permissions.has("ADMINISTRATOR")) {
    const ref = interaction.options.get("channel")
    // if ([0, 2, 11, 12, 10, 5].includes(ref.type)) {
      this.dbs.guilds.set(ref.channel.guildId, ref.value)
      interaction.reply({ content: `✅ <#${ref.value}>, встановлено як канал для пропозицій.`, ephemeral: true }).catch(e => console.log(e));
    // } else interaction.reply({ content: '❌ Невірний тип каналу', ephemeral: true }).catch(e => console.log(e));
  } else interaction.reply({ content: '❌ Ви маєте мати права адміністратора', ephemeral: true }).catch(e => console.log(e));
}