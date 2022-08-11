module.exports = async function (interaction) {
  if (interaction.isCommand()) {
    if (this.cmds[interaction.commandName]) {
      await this.cmds[interaction.commandName].run.call(this, interaction)
    } else interaction.reply({ 
      content: 'Команда не існує', 
      ephemeral: true 
    }).catch(e => console.log("Команда не існує",e));
  } else {
    console.log(interaction);
  }
}