import { ExtendedClient } from './structures/client.js';
import { connectToDatabase } from './db/database.js';
import { Server } from './db/models/server.js';

const client = new ExtendedClient();
connectToDatabase();

client.on('guildCreate', async guild => {
    try {
      const existingGuild = await Server.findOne({ guildId: guild.id });
  
      if (!existingGuild) {
        const newGuild = new Server({ guildId: guild.id });
        await newGuild.save();
        console.log(`Joined a new guild: ${guild.name}`);
        // Additional actions for new guild
      } else {
        console.log(`Rejoined an existing guild: ${guild.name}`);
        // Actions for existing guild
      }
    } catch (error) {
      console.error('Error handling a new guild:', error);
    }
  });

client.start();
