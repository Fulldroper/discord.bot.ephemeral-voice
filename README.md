The purpose of the project is to create a Discord bot that manages dynamic voice channels. It is useful for creating temporary voice channels that can be automatically managed and deleted, ensuring efficient use of server resources.

The project works by monitoring user activity in voice channels. When a user joins a designated voice channel, the bot creates a new temporary voice channel for them. The bot also handles permission synchronization to ensure that users have the correct access rights.

Repository link: [Discord Ephemeral Voice Bot](https://github.com/Fulldroper/discord.bot.ephemeral-voice)

To install the project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Fulldroper/discord.bot.ephemeral-voice.git
   ```
2. Navigate to the project directory:
   ```bash
   cd discord.bot.ephemeral-voice
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure your Discord bot token in the `.env` file:
   ```
   DISCORD_TOKEN=your_token_here
   ```
5. Start the bot:
   ```bash
   npm start
   ```

The bot operates using the following algorithm:
1. **Initialization**: Load environment variables and set up Discord client.
   ```javascript
   require('dotenv').config();
   const { Client, Intents } = require('discord.js');
   const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
   client.login(process.env.DISCORD_TOKEN);
   ```
2. **Voice State Update Handling**: Listen for voice state changes and create/delete channels as needed.
   ```javascript
   client.on('voiceStateUpdate', async (oldState, newState) => {
       if (newState.channel && newState.channel.name === 'Join to Create') {
           const channel = await newState.guild.channels.create(`Temp Channel ${newState.member.user.username}`, { type: 'GUILD_VOICE' });
           newState.setChannel(channel);
       }
       if (oldState.channel && oldState.channel.members.size === 0 && oldState.channel.name.startsWith('Temp Channel')) {
           oldState.channel.delete();
       }
   });
   ```

During the development of this project, I gained skills in:
- Discord.js library for interacting with the Discord API
- Node.js for building and running the bot
- Handling asynchronous operations in JavaScript
- Managing environment variables for secure configuration
