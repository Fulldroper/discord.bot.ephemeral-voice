process.env.Production|| require('dotenv').config({ debug: false })
require("./lib/moded_prototypes")()

const config = require("./package.json").config
const { readdirSync } = require('fs')
const axios = require("axios").default
const {Client, Intents} = require('discord.js');

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES
  ]
});
// storage for commands module
bot.cmds = {}
bot.catch_err = require("./lib/errorCallback")({
  webhook_url: process.env.ERROR_WEBHOOK_URL,
  username: process.env.CLIENT_ID,
})
bot.dbs = {
  guilds : channels = require('redis').createClient({url:process.env.REDIS_URL})
} 


// register commands
readdirSync(config.path.command).forEach(file => {
  if (file[0] !== "!") {
    const module = require(`${ config.path.command }${ file }`) 
    bot.cmds[module.info.name] = module
  }
})

// register as slash commands 
const reg = async () => {
  
  const exit = await axios({
    method: 'get',
    url: `https://discord.com/api/v10/applications/${process.env.CLIENT_ID}/commands`,
    headers: { "Authorization": `Bot ${ process.env.TOKEN }` }
  })
  .catch(bot.catch_err)
  
  let res = {}
  exit.data.forEach(el => res[el.name] = el.id)

  for (const key in bot.cmds) {
    await axios({
      method: 'post',
      url: `https://discord.com/api/v10/applications/${process.env.CLIENT_ID}/commands`,
      headers: { "Authorization": `Bot ${ process.env.TOKEN }` }, 
      data: bot.cmds[key].info
    })
    .catch(bot.catch_err)
    
    delete res[bot.cmds[key].info.name]
  }
  if (Object.keys(res).length < 1) return
  for (const key in res) {
    await axios({
      method: 'delete',
      url: `https://discord.com/api/v10/applications/${process.env.CLIENT_ID}/commands/${res[key]}`,
      headers: { "Authorization": `Bot ${ process.env.TOKEN }` }
    })
    .catch(bot.catch_err)
  }
}
reg()
// register events
readdirSync(config.path.events).forEach(file => {
  if (file[0] !== "!") {
    bot.on(file.slice(0, -3), require(`${ config.path.events }/${ file }`))
  }
});


bot.login( process.env.TOKEN )
