import { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../structures/command.js';
// import { Server } from '../../models/server.js';
import { Octokit } from 'octokit';
// import { Endpoints } from "@octokit/types";
// import { Collection } from 'mongodb';

export default {
    data: {
        name: 'show',
        description: 'Shows all repository webhooks for the current channel',
        type: 1
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const octokit = new Octokit({
            auth: process.env.BEARER_TOKEN
        })

        const res = await octokit.request('GET /repos/{owner}/{repo}/hooks', {
            owner: 'andrewjumanca',
            repo: 'Github-discord-bot',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })

        try {
            console.log(res);
            console.log("******");
            console.log(res.status);
            await interaction.reply({
                content: "done"
            })
        } catch (error) {
            console.error('Failed to setup new repository tracking: ${error.message}');
        }
    }
} satisfies Command