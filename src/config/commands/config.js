import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Basic bot configuration')
        .addStringOption(option =>
            option
                .setName('config_category')
                .setDescription('Configuration category to modify')
                .setRequired(true)
                .addChoices(
                    { name: 'Changelog Channel', value: 'changelog_channel' },
                    { name: 'Roles Channel', value: 'roles_channel' },
                )
            ),
    async execute(interaction) {
        const category = interaction.options.getString('config_category');

        await interaction.reply(`Trying to modify ${category} configuration`);
    },
};