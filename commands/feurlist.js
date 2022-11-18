const { SlashCommandBuilder } = require('@discordjs/builders');
const { feurCountSchema } = require('../data/feur-count-schema.js')
const { victimeSchema } = require('../data/victime-shema.js')
const Discord = require('discord.js');
const mongoose = require('mongoose')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('feurlist')
		.setDescription('Savoir qui a Feur qui')
    .addStringOption(option =>
			option
				.setName('user')
				.setDescription('Utilisateur dont on veux les détails')
        .setRequired(true)
        ),

	async execute(interaction) {
    const FeurModel = mongoose.model('feur-counts', feurCountSchema);
    const VictimeModel = mongoose.model('victime', victimeSchema);
    const victime = interaction.options.getString('victime');

    let x = await FeurModel.findOne({
      _id: interaction.user.id
    });

    let y = await VictimeModel.findOne({
      _id: interaction.user.id
    });

    console.log(y);

    const message = `Détails des Feur de ${interaction.user}\n
    Total des feurs : ${x.feurCount}\n
    suite`
		//await interaction.reply(message);
	},
};