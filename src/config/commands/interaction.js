const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('interaction')
		.setDescription('Provides information about the interaction.')
		.addStringOption(option => 
			option
				.setName('input')
				.setDescription('The input to echo back')	
		),
	async execute(interaction) {
		const input = interaction.options.getString('input') ?? 'No input provided';
		console.log('Slash Command Interaction', interaction);
		await interaction.reply(input);
    },
};