// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./personal/token.json');
const fs = require('node:fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//작동 테스트
client.once('ready', () => {
	console.log(`client ready`)
});

//슬래시 커맨드
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//길드 아이디는 추후 정식 서비스 할 땐 사용하지 않을 예정 (테스트용)
const clientId = '983640794126766112';
const guildId = '983640497711087636';

//commands 폴더에서 .js 파일 가져오기
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '9' }).setToken(token);

//글로벌
(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: [] },
		);
		console.log('slash command reload - global');
	} catch (error) {
		console.error(error);
	}
})();

//단독 채널용
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('slash command reload - guild');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	console.log(interaction);

	if (interaction.commandName === '모집') {
		await interaction.reply('처리 완료');
	}
	
	if (interaction.commandName === '군단장') {
		await interaction.reply('처리 완료');
	}
});

client.login(token);