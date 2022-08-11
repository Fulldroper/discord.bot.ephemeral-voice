module.exports.info = {
  "name": "init",
  "type": 1,
  "description": "Ініціація бота"
}

module.exports.run = async function (interaction) {
  if (interaction.member.permissions.has("ADMINISTRATOR")) {
    const self = interaction.guild.members.cache.get(this.user.id).permissions
    if (self.has("MANAGE_CHANNELS") && self.has("VIEW_CHANNEL") && self.has("SEND_MESSAGES") && self.has("MANAGE_MESSAGES") && self.has("READ_MESSAGE_HISTORY") && self.has("MOVE_MEMBERS") && self.has("MANAGE_ROLES")) {
      const category = await interaction.guild.channels.create("Ephemeral 🌤 Voice", {type: "GUILD_CATEGORY"})
      const channel = await category.createChannel("Cтворити канал", {type: "GUILD_VOICE"})
      this.db.set(`${interaction.guild.id}.ep.voice`, `${category.id}.${channel.id}`)
      interaction.reply({content: "Бот налаштований успішно ✅", ephemeral: true})
    } else {
      interaction.reply({
          content: `🚨 Недостатньо превілегій ❌
        
      ✲ MANAGE_CHANNELS: ${
          self.has("MANAGE_CHANNELS")
        }
      ✲ VIEW_CHANNEL: ${
          self.has("VIEW_CHANNEL")
        }
      ✲ SEND_MESSAGES: ${
          self.has("SEND_MESSAGES")
        }
      ✲ MANAGE_MESSAGES: ${
          self.has("MANAGE_MESSAGES")
        }
      ✲ READ_MESSAGE_HISTORY: ${
          self.has("READ_MESSAGE_HISTORY")
        }
      ✲ MOVE_MEMBERS: ${
          self.has("MOVE_MEMBERS")
        }
      ✲ MANAGE_ROLES: ${
          self.has("MANAGE_ROLES")
        }
        `,
        ephemeral: true
      })
    }
  } else {
    interaction.reply({content: '❌ Ви маєте мати права адміністратора', ephemeral: true}).catch(e => console.log(e));
  }
}
