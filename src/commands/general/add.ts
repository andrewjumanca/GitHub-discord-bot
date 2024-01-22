import { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../structures/command.js';

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
        await interaction.reply({
            content: 'Creating a new repository webhook...',
            fetchReply: true
        })

        try {
            await interaction.editReply({
                content: 'Successfully set up tracking for a repository named: ' + interaction.options.getString('repository_name') + '!'
            })
        } catch (error) {
            console.error('Failed to setup new repository tracking: ${error.message}');
        }
    }
} satisfies Command