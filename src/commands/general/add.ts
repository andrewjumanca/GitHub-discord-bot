import { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../structures/command.js';
import { Server } from '../../db/models/server.js';
// import { Server } from '../../db/models/server.js';
// import { MongoClient } from 'mongodb';
// import { Octokit } from 'octokit';
// import { Endpoints } from "@octokit/types";
// import { Collection } from 'mongodb';

export default {
    data: {
        name: 'add',
        description: 'Adds a new GitHub repository to track',
        options: [{
                name: 'organization_name',
                type: 3,
                description: 'Name of the repository organization.',
                required: true
            },
            {
                name: 'repository_name',
                type: 3,
                description: 'Name of the repository in the organization',
                required: true
            },
            {
                name: 'channels',
                type: 3,
                description: 'List of channels to subscribe, separated by commas. Default is the current channel.',
                required: false
            },
            {
                name: 'secret',
                type: 3,
                description: 'Optional secret for webhook',
                required: false
            },
            {
                name: 'preview',
                type: 5,
                description: 'Optional preview mode',
                required: false
            }],
            type: 1
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        console.log(interaction.channel.name);
        console.log(interaction.channelId);
        await interaction.reply({
            content: 'Creating a new repository webhook...',
            fetchReply: true
        })

        const guildId = interaction.guild.id;
        const serverName = interaction.guild.name;

        // const server = await Server.findOneAndUpdate(
        //     { guildId: serverId },
        //     { guildId: serverId, serverName: serverName },
        //     { new: true, upsert: true }
        // );

        // const channelsParam = interaction.options.getString('channel');

        // if (!channelsParam) {
        //     // add interaction.channel.name;
        // } else if (channelsParam.toLowerCase() == 'all') {
        //     // subscribe all channels in server to repository notifications
        // } else {
        //     const channels = channelsParam.split(',').map(channel => channel.trim());
        //     console.log(channels);
        //     // add all channels in this list, only add valid ones and state which were invalid
        //     // and could not be added
        // }
        const servers = await Server.find({serverName: serverName});

        // Log the documents to the console
        console.log('All Servers:', servers);
        const server = await Server.findOne({ serverName: serverName });
  
        if (!server) {
            const newGuild = new Server({ serverName: serverName, guildId: guildId });
            await newGuild.save();
            console.log(`Joined a new guild: ${serverName}`);
            // Additional actions for new guild
        } else {
            console.log(`Rejoined an existing guild: ${serverName}`);
            // Actions for existing guild
        }

        try {
            await interaction.editReply({
                content: 'Successfully set up tracking for a repository named: ' + interaction.options.getString('repository_name') + '!'
            })
        } catch (error) {
            console.error('Failed to setup new repository tracking: ${error.message}');
        }
    }
} satisfies Command