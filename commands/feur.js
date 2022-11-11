const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const config = require("../data/feur.json");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feur')
		.setDescription('Quoi ?'),
	async execute(interaction) {
        jsonReader("data/feur.json", (err, feur) => {
            if (err) {
              console.log("Error reading file:", err);
              return;
            }
            // increase customer order count by 1
            feur.feur += 1;
            fs.writeFile("data/feur.json", JSON.stringify(feur), err => {
              if (err) console.log("Error writing file:", err);
            });
          });
		await interaction.reply( "Compteur de Feur : " + feur.feur );;
	},
};

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
