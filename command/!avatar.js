module.exports.info = {
  "name": "avatar",
  "type": 1,
  "description": "Відобразити аватарку",
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