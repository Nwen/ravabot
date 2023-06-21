const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Logger = require("../utils/Logger");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roulette')
		.setDescription('1 chance sur 6'),
	async execute(interaction) {

        let x = Math.floor(Math.random()*6);
        Logger.info(`Roulette | ${interaction.member.user.username} | Number : ${x}`);
        if(x === 0){
            var tempstimeout = 0;
            if(Math.random() >= 0.20)
			{
                const min = 1;
            	const max = 30;
            	tempstimeout = Math.random() * (max - min) + min;
			}
			else 
			{
                const min = 30;
            	const max = 120;
            	tempstimeout = Math.random() * (max - min) + min;
			}

            interaction.member.timeout(tempstimeout *60*1000)
                    .catch(Logger.error);
            Logger.info(`Roulette | Timed out member ${interaction.member.user.username} for ${tempstimeout} min`)
            client.users.send('217279235021209600', `${interaction.channel.name} | ${interaction.member.user.username} : ${tempstimeout} min`);

        } else {
            interaction.reply("Rien ne se passe.");
        }
	},
};