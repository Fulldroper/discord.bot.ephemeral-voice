module.exports = async function (interaction) {
  if (interaction.isCommand()) {
    if (this.cmds[interaction.commandName]) {
      await this.dbs.guilds.connect()
      await this.cmds[interaction.commandName].run.call(this, interaction)
      this.dbs.guilds.quit()
    } else interaction.reply({ 
      content: 'Команда не існує', 
      ephemeral: true 
    }).catch(e => console.log("Команда не існує",e));
  }
}