const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Logger = require("../utils/Logger");

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

		let tempstimeout = temps * 60 * 1000
		
		if(tempstimeout <= 0)
		{
			const min = 1;
			if(Math.random() >= 0.10)
			{
            	const max = 30;
            	tempstimeout = Math.random() * (max - min) + min;
			}
			else 
			{
            	const max = 120;
            	tempstimeout = Math.random() * (max - min) + min;
			}
		}

        interaction.member.timeout(tempstimeout * 60 * 1000)
                .catch(Logger.error);
		Logger.info(`Suicide | ${interaction.channel.name} |Timed out member ${interaction.member.user.username} for ${tempstimeout} min`);
		interaction.client.users.send('217279235021209600', `SUICIDE | ${interaction.channel.name} | Timed out ${interaction.member.user.username} : ${tempstimeout} min`).catch(Logger.error);
	await interaction.reply("So long !")
	},
};