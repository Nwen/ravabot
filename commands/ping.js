const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Logger = require("../utils/Logger");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ping')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('user')),
	async execute(interaction) {
        const user = interaction.options.getMember('user');

        if(user != null){
            user.timeout(null)
                .catch(Logger.error);
            Logger.info(`FREEDOM | ${interaction.member.user.username} a libéré ${user.user.username}`);
        }

	await interaction.reply({ content: '🏓 Pong!', ephemeral: true }).catch(Logger.error);
	},
};