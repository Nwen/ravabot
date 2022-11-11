const { SlashCommandBuilder } = require('@discordjs/builders');
const { feurCountSchema } = require('../data/feur-count-schema.js')
const Discord = require('discord.js');
const mongoose = require('mongoose')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('feur')
		.setDescription('Quoi ?'),
	async execute(interaction) {
    const FeurModel = mongoose.model('feur-counts', feurCountSchema);
    await FeurModel.findOneAndUpdate({
      _id: interaction.user.id
      }, {
      _id: interaction.user.id,
      $inc : {
        feurCount: 1
      }
      }, {
      upsert: true
    });
  
    let x = await Feur.findOne({
      _id: interaction.user.id
    });
    console.log(x.feurCount);

    const message = `Compteur de Feur de ${interaction.user} : ${x.feurCount}`
		await interaction.reply(message);
	},
};