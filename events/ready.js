module.exports = async function () {
  console.log(this.user.tag, this.user.presence.status)
  await this.db.connect()
  this.catch_err = require("./../lib/errorCallback")({
    webhook_url: process.env.ERROR_WEBHOOK_URL,
    username: this.user.tag,
    avatar_url: this.user.avatarURL()
  })
}