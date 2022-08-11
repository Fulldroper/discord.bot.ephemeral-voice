const stateCalc = (require("./../lib/countVoiceState")).countVoiceState

const exit = (o, n) => {
  if (o?.channel) {
    console.log(o.channel.permissionOverwrites);
    o.channel.delete()
  } else {

  }
  // console.log(o?.channelId, n?.channelId);
}

module.exports = async function (old, now) {
  const state = stateCalc(old, now)
  if (![1,2,3,0].includes(state)) return

  // couldown
  if (this.voicecouldown) {
    const time = new Date().getTime() - this.voicecouldown
    if (time > this.config.voicecouldown) {
      this.voicecouldown = new Date().getTime()
    } else {
      await (this.config.voicecouldown - time).sleep()
    }        
  } else this.voicecouldown = new Date().getTime();

  const info = (await this.db.get(`${old.guild.id}.ep.voice`)).split(".")
  
  if ([1,3].includes(state)) {
    
    if (info[1] === now.channelId) {
      const member = (old?.member) || (now?.member);
      const category = old.guild.channels.cache.get(info[0])
      console.log(this.PermissionsBitField);
      const channel_db = await this.db.get(`${old.guild.id}.ep.voice.channel`) || {
        name: `${member.user.username}`,
        userLimit: 10,
        permissionOverwrites: [
          {
            id: member.id,
            allow: [this.PermissionsBitField.Flags.MANAGE_CHANNELS]
          }
        ]
      }

      const pex = new this.BitField(channel_db.permissionOverwrites.find(el => el.id === member.id).allow);

      console.log(pex);
  
      const channel = await category.createChannel(channel_db.name, {type: "GUILD_VOICE", permissionOverwrites: channel_db.permissionOverwrites, userLimit: channel_db.userLimit})
      
      if (
        now?.channelId === info[1] && 
        old?.channelId !== info[1] &&
        old.channel?.parentId === info[0] &&
        state === 3
        ) exit(old, now);
        
        member.voice.setChannel(channel.id)
      } else if(old?.channelId !== info[1] && state === 3) exit(old, now);
      
  } else if ([2,0].includes(state) && old?.channelId !== info[1]) exit(old, now);
}