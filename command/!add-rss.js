module.exports.info = {
  "name":"add-rss",
  "type":1,
  "description":"Сформувати підписку на канал (youtube \\ twitch(streams) )",
  "options":[
     {
        "name":"channel",
        "description":"Канал для публікацій",
        "type":7,
        "required":true
     },
     {
        "name":"rss-channel",
        "description":"Канал на який оформлена підписка",
        "type":3,
        "required":true
     }
  ]
}
https://www.youtube.com/channel/UCqmlx9EGW5wPCRwxx_3Lsyw
https://www.youtube.com/c/GaugingGadgets
https://www.twitch.tv/a1taoda
// https://www.youtube.com/feeds/videos.xml?channel_id=
async function getYoutubeChannelId(url) {
  
  const key = 'AIzaSyBMDeO99zznxyxI_FT-4JTB1JmK_A44jL8';
  
  var id = '', username = false, error = false;

  url = url.replace(/(>|<)/gi, '').split(/(\/channel\/|\/user\/)/);

  if (url[2] !== undefined) {
    id = url[2].split(/[^0-9a-z_-]/i);
    id = id[0];
  }

  if (/\/user\//.test(url)) { username = id; }

  if (!id) { return false; }

  if (username) {
    var url = ;
    var body = await require('axios').get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${key}`).json;
    if (body && body.items && body.items.length) {
      id = body.items[0].id;
    } else {
      error = true;
    }
  }
  return { id, username, error };
}

module.exports.run = async function (interaction) {
  console.log(1);
  if (interaction.isRepliable()) {
    const 
      { channel } = interaction.options.get("channel"),
      { value: url} = interaction.options.get("rss-channel")
    console.log(channel.id, url);
    interaction.reply({
      "embeds": [
        {
          "type": "rich",
          "description": `${await getYoutubeChannelId(url)}`,
          "color": 0x363636
        }
      ]
    })
  }
}