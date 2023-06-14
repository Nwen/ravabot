const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suicide')
		.setDescription('Timeout')
        .addNumberOption(option =>
			option
				.setName('temps')
				.setDescription('Temps du timeout (min)')),
	async execute(interaction) {
        const temps = interaction.options.getNumber('temps');
        interaction.member.timeout(temps * 60 * 1000)
                .then(() => console.log("Timed out member"))
                .catch(console.log);
	await interaction.reply("So long !")
	},
};