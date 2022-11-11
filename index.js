const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Si on est en local, besoin de token.json, sinon va chercher le token dans les variables config de Heroku. Un peu fait à la zob
try {
    if(fs.existsSync("./token.json")){
        const token = require("./token.json");
        const TOKEN = token.token
        client.login(TOKEN).catch(console.error);
    }
    else {
        const TOKEN = process.env.TOKEN
        client.login(TOKEN).catch(console.error);
    }
} catch (err) {
    console.error(err)
}
