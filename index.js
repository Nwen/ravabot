const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose')
const dotenv = require('dotenv'); dotenv.config();

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages
] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	mongoose.connect(process.env.MONGO_URI, {
		keepAlive: true
	})
		.then(()=> {console.log("MongoDB connected")})
		.catch(error => console.log(error));
	console.log('Ravabot enclanché !');
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

client.login(process.env.TOKEN).catch(console.error);
