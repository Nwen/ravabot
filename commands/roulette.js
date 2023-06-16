const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Logger = require("../utils/Logger");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roulette')
		.setDescription('1 chance sur 6'),
	async execute(interaction) {

        let x = Math.floor(Math.random()*6);
        Logger.info(`Roulette | ${interaction.member.user.tag} | Number : ${x}`);
        if(x === 0){
            interaction.reply("Perdu !");
            const min = 1;
            const max = 120;
            const tempstimeout = Math.random() * (max - min) + min;

            interaction.member.timeout(tempstimeout *60*1000)
                    .catch(Logger.error);
            Logger.info(`Roulette | Timed out member ${interaction.member.user.tag} for ${tempstimeout} min`)

        } else {
            interaction.reply("Rien ne se passe.");
        }
	},
};