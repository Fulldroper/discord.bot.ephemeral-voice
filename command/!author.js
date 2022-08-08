module.exports.info = {
  "name": "author",
  "type": 1,
  "description": "Інформація про автора"
}

module.exports.run = async function(interaction) {
  interaction.reply({
    "content": "✨ Автор [fd#6297](https://fulldroper.cf/)", 
    "ephemeral": true
  }).catch(e => console.log(e))
}