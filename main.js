const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu   } = require('discord.js');
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
			{ body: commands },
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

const contentsDic = {};
const raidsDic = {};
const classDic = {};

//카오스 던전
contentsDic[1] = ['카오스 던전','https://cdn-lostark.game.onstove.com/uploadfiles/notice/17012ef4ba7d431daa0884121bb2d912.png'];
//가디언 토벌
contentsDic[2] = ['가디언 토벌','https://cdn-lostark.game.onstove.com/uploadfiles/notice/af2a2116f60441389eaa8a8db3624f26.png'];
//어비스 던전
contentsDic[3] = ['어비스 던전','https://cdn-lostark.game.onstove.com/uploadfiles/notice/a8d7c95daca24df0a33f561136de379a.png'];
//어비스 레이드
contentsDic[4] = ['어비스 레이드','https://cdn-lostark.game.onstove.com/uploadfiles/notice/8a845a8afd6347acb7ec1d468435419a.png'];
//도가토
contentsDic[5] = ['도전 가디언 토벌전','https://cdn-lostark.game.onstove.com/uploadfiles/notice/af2a2116f60441389eaa8a8db3624f26.png'];
//도비스
contentsDic[6] = ['도전 어비스 던전','https://ark.bynn.kr/assets/lostark/abyss_dungeon2.png'];
//기타
contentsDic[7] = ['기타','https://cdn-lostark.game.onstove.com/uploadfiles/notice/5f555811bd8443a8a8067466df3d4756.png'];
//발탄
raidsDic[1] = ['발탄(노말)','https://ark.bynn.kr/assets/lostark/commander0.png'];
raidsDic[2] = ['발탄(하드)','https://ark.bynn.kr/assets/lostark/commander0.png'];
raidsDic[8] = ['발탄(헬)','https://ark.bynn.kr/assets/lostark/commander0.png'];
//비아
raidsDic[3] = ['비아키스(노말)','https://ark.bynn.kr/assets/lostark/commander1.png'];
raidsDic[4] = ['비아키스(하드)','https://ark.bynn.kr/assets/lostark/commander1.png'];
raidsDic[9] = ['비아키스(헬)','https://ark.bynn.kr/assets/lostark/commander1.png'];
//쿠크
raidsDic[5] = ['쿠크세이튼(노말)','https://ark.bynn.kr/assets/lostark/commander2.png'];
raidsDic[10] = ['쿠크세이튼(헬)','https://ark.bynn.kr/assets/lostark/commander2.png'];
//아브
raidsDic[6] = ['아브렐슈드(노말)','https://ark.bynn.kr/assets/lostark/commander3.png'];
raidsDic[7] = ['아브렐슈드(하드)','https://ark.bynn.kr/assets/lostark/commander3.png'];
//일리아칸
raidsDic[11] = ['일리아칸(노말)','https://ark.bynn.kr/assets/lostark/commander4.png'];
raidsDic[12] = ['일리아칸(하드)','https://ark.bynn.kr/assets/lostark/commander4.png'];

classDic[1] = ['버서커'];
classDic[2] = ['디스트로이어'];
classDic[3] = ['워로드'];
classDic[4] = ['홀리나이트'];
classDic[5] = ['배틀마스터'];
classDic[6] = ['인파이터'];
classDic[7] = ['기공사'];
classDic[8] = ['창술사'];
classDic[9] = ['스트라이커'];
classDic[10] = ['데빌헌터'];
classDic[11] = ['블래스터'];
classDic[12] = ['호크아이'];
classDic[13] = ['스카우터'];
classDic[14] = ['건슬링어'];
classDic[15] = ['아르카나'];
classDic[16] = ['서머너'];
classDic[17] = ['바드'];
classDic[18] = ['소서리스'];
classDic[19] = ['데모닉'];
classDic[20] = ['블레이드'];
classDic[21] = ['리퍼'];
classDic[22] = ['도화가'];


function smallPartyEmbed(type, title, category, user, userAvatar) {
	if (type == 1) {
		categoryName = contentsDic[category][0]
		categoryImage = contentsDic[category][1]
	}
	else if (type == 2) {
		categoryName = raidsDic[category][0]
		categoryImage = raidsDic[category][1]
	}
	const exampleEmbed = new MessageEmbed()
		.setTitle(title)
		.setAuthor({
			name: categoryName,
			iconURL: categoryImage
		})
		.setColor("#e3c7ff")
		.addFields(
			{ name: '1파티', value: '공석\n공석\n공석\n공석', inline: true }
		)
		.setFooter({
			text: user,
			iconURL: userAvatar
		})
		.setTimestamp()

	return exampleEmbed
}

function bigPartyEmbed(type, title, category, user, userAvatar) {
	if (type == 1) {
		categoryName = contentsDic[category][0]
		categoryImage = contentsDic[category][1]
	}
	else if (type == 2) {
		categoryName = raidsDic[category][0]
		categoryImage = raidsDic[category][1]
	}
	const exampleEmbed = new MessageEmbed()
		.setTitle(title)
		.setAuthor({
			name: categoryName,
			iconURL: categoryImage
		})
		.setColor("#e3c7ff")
		.addFields(
			{ name: '1파티', value: '공석\n공석\n공석\n공석', inline: true },
			{ name: '2파티', value: '공석\n공석\n공석\n공석', inline: true }
		)
		.setFooter({
			text: user,
			iconURL: userAvatar
		})
		.setTimestamp()

	return exampleEmbed
}


const smallParty = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('attendFirstDps')
			.setLabel('1팟딜러')
			.setStyle('PRIMARY')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('attendFirstSup')
			.setLabel('1팟서폿')
			.setStyle('SUCCESS')
	);

const bigParty = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('attendFirstDps')
			.setLabel('1팟딜러')
			.setStyle('PRIMARY')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('attendFirstSup')
			.setLabel('1팟서폿')
			.setStyle('SUCCESS')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('attendSecondDps')
			.setLabel('2팟딜러')
			.setStyle('PRIMARY')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('attendSecondSup')
			.setLabel('2팟서폿')
			.setStyle('SUCCESS')
	);

const redButtons = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('cancel')
			.setLabel('취소하기')
			.setStyle('DANGER')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('delete')
			.setLabel('삭제하기')
			.setStyle('DANGER')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('magam')
			.setLabel('마감하기')
			.setStyle('SECONDARY')
	);

const editedredButtons = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('cancel')
			.setLabel('취소하기')
			.setStyle('DANGER')
	)
	.addComponents(
		new MessageButton()
			.setCustomId('delete')
			.setLabel('삭제하기')
			.setStyle('DANGER')
	);

const selectClassFirstDPS = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('selectClassFirstDPS')
			.setPlaceholder('참여할 직업을 선택해주세요 (1팟 딜러)')
			.addOptions([
				{
					label: '버서커',
					value: '1',
				},
				{
					label: '디스트로이어',
					value: '2',
				},
				{
					label: '워로드',
					value: '3',
				},
				{
					label: '홀리나이트',
					value: '4',
				},
				{
					label: '배틀마스터',
					value: '5',
				},
				{
					label: '인파이터',
					value: '6',
				},
				{
					label: '기공사',
					value: '7',
				},
				{
					label: '창술사',
					value: '8',
				},
				{
					label: '스트라이커',
					value: '9',
				},
				{
					label: '데빌헌터',
					value: '10',
				},
				{
					label: '블래스터',
					value: '11',
				},
				{
					label: '호크아이',
					value: '12',
				},
				{
					label: '스카우터',
					value: '13',
				},
				{
					label: '건슬링어',
					value: '14',
				},
				{
					label: '아르카나',
					value: '15',
				},
				{
					label: '서머너',
					value: '16',
				},
				{
					label: '바드',
					value: '17',
				},
				{
					label: '소서리스',
					value: '18',
				},
				{
					label: '데모닉',
					value: '19',
				},
				{
					label: '블레이드',
					value: '20',
				},
				{
					label: '리퍼',
					value: '21',
				},
				{
					label: '도화가',
					value: '22',
				},
				{
					label: '기상술사',
					value: '23',
				}
			]),
	);

const selectClassFirstSup = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('selectClassFirstSup')
			.setPlaceholder('참여할 직업을 선택해주세요 (1팟 서폿)')
			.addOptions([
				{
					label: '홀리나이트',
					value: '4',
				},
				{
					label: '바드',
					value: '17',
				},
				{
					label: '도화가',
					value: '22',
				},
			]),
	);

const selectClassSecondDPS = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('selectClassSecondDPS')
			.setPlaceholder('참여할 직업을 선택해주세요 (2팟 딜러)')
			.addOptions([
				{
					label: '버서커',
					value: '1',
				},
				{
					label: '디스트로이어',
					value: '2',
				},
				{
					label: '워로드',
					value: '3',
				},
				{
					label: '홀리나이트',
					value: '4',
				},
				{
					label: '배틀마스터',
					value: '5',
				},
				{
					label: '인파이터',
					value: '6',
				},
				{
					label: '기공사',
					value: '7',
				},
				{
					label: '창술사',
					value: '8',
				},
				{
					label: '스트라이커',
					value: '9',
				},
				{
					label: '데빌헌터',
					value: '10',
				},
				{
					label: '블래스터',
					value: '11',
				},
				{
					label: '호크아이',
					value: '12',
				},
				{
					label: '스카우터',
					value: '13',
				},
				{
					label: '건슬링어',
					value: '14',
				},
				{
					label: '아르카나',
					value: '15',
				},
				{
					label: '서머너',
					value: '16',
				},
				{
					label: '바드',
					value: '17',
				},
				{
					label: '소서리스',
					value: '18',
				},
				{
					label: '데모닉',
					value: '19',
				},
				{
					label: '블레이드',
					value: '20',
				},
				{
					label: '리퍼',
					value: '21',
				},
				{
					label: '도화가',
					value: '22',
				},
				{
					label: '기상술사',
					value: '23',
				},
			]),
	);

const selectClassSecondSup = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('selectClassSecondSup')
			.setPlaceholder('참여할 직업을 선택해주세요. (2팟서폿)')
			.addOptions([
				{
					label: '홀리나이트',
					value: '4',
				},
				{
					label: '바드',
					value: '17',
				},
				{
					label: '도화가',
					value: '22',
				},
			]),
	);

//슬래시커맨드 인터렉션
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === '모집') {
		const pCate = interaction.options.getString('분류');
		const pNum = interaction.options.getString('모집인원');
		const pTitle = interaction.options.getString('제목');
		let pType = smallParty
		let pEmbed = smallPartyEmbed
		if (pNum == 1) {
			pType = smallParty
			pEmbed = smallPartyEmbed
		} else {
			pType = bigParty
			pEmbed = bigPartyEmbed
		}
		await interaction.reply({
			embeds: [pEmbed(1, pTitle, pCate, interaction.member.nickname, interaction.user.avatarURL())],
			components: [pType, redButtons]
		});
	}
	
	if (interaction.commandName === '군단장') {
		const pCate = interaction.options.getString('분류');
		const pTitle = interaction.options.getString('제목');
		let pType = smallParty
		let pEmbed = smallPartyEmbed
		if (['5','10'].includes(pCate)) {
			pType = smallParty
			pEmbed = smallPartyEmbed
		}
		else {
			pType = bigParty
			pEmbed = bigPartyEmbed
		}
		await interaction.reply({
			embeds: [ pEmbed(2,pTitle,pCate,interaction.member.nickname,interaction.user.avatarURL()) ],
			components: [pType, redButtons]
		});
	}
});

//버튼 인터렉션
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	let ifParty = false
	switch (interaction.customId) {
		case "attendFirstDps" :
			bigLoop :
			for (let i of interaction.message.embeds[0].fields){
				const tmpValues = i.value.split('\n')
				for (let j of tmpValues){
					let startIndex = j.indexOf("<@") + 2;
					let endIndex = j.indexOf(">");
					if (j.substring(startIndex, endIndex) == interaction.user.id) {
						ifParty = true
						await interaction.reply({
							ephemeral: true, content: '이미 참여중인 파티에요.'
						});
						break bigLoop;
					}
				}
			}
			if (ifParty == false){
				await interaction.reply({
					ephemeral: true, components: [selectClassFirstDPS]
				});
			}
			break;
		case "attendFirstSup" :
			bigLoop :
			for (let i of interaction.message.embeds[0].fields){
				const tmpValues = i.value.split('\n')
				for (let j of tmpValues){
					let startIndex = j.indexOf("<@") + 2;
					let endIndex = j.indexOf(">");
					if (j.substring(startIndex, endIndex) == interaction.user.id) {
						ifParty = true
						await interaction.reply({
							ephemeral: true, content: '이미 참여중인 파티에요.'
						});
						break bigLoop;
					}
				}
			}
			if (ifParty == false){
				await interaction.reply({
					ephemeral: true, components: [selectClassFirstSup]
				});
			}
			break;
		case "attendSecondDps" :
			bigLoop :
			for (let i of interaction.message.embeds[0].fields){
				const tmpValues = i.value.split('\n')
				for (let j of tmpValues){
					let startIndex = j.indexOf("<@") + 2;
					let endIndex = j.indexOf(">");
					if (j.substring(startIndex, endIndex) == interaction.user.id) {
						ifParty = true
						await interaction.reply({
							ephemeral: true, content: '이미 참여중인 파티에요.'
						});
						break bigLoop;
					}
				}
			}
			if (ifParty == false){
				await interaction.reply({
					ephemeral: true, components: [selectClassSecondDPS]
				});
			}
			break;
		case "attendSecondSup" :
			bigLoop :
			for (let i of interaction.message.embeds[0].fields){
				const tmpValues = i.value.split('\n')
				for (let j of tmpValues){
					let startIndex = j.indexOf("<@") + 2;
					let endIndex = j.indexOf(">");
					if (j.substring(startIndex, endIndex) == interaction.user.id) {
						ifParty = true
						await interaction.reply({
							ephemeral: true, content: '이미 참여중인 파티에요.'
						});
						break bigLoop;
					}
				}
			}
			if (ifParty == false){
				await interaction.reply({
					ephemeral: true, components: [selectClassSecondSup]
				});
			}
			break;
		case "cancel" :
			const originalEmbed = interaction.message.embeds[0];
			let editEmbed = new MessageEmbed(originalEmbed)
			embedList = editEmbed.fields[0].value.split('\n')
			for (let i = 0; i < 4; i++){
				let startIndex = embedList[i].indexOf("<@")+2;
				let endIndex = embedList[i].indexOf(">");
				if(embedList[i].substring(startIndex, endIndex) == interaction.user.id) {
					embedList[i] = "공석"
				}
			}
			editList = embedList.join('\n')
			editEmbed.fields[0].value = editList
			if (editEmbed.fields[1]) {
				embedList = editEmbed.fields[1].value.split('\n')
				for (let i = 0; i < 4; i++) {
					let startIndex = embedList[i].indexOf("<@") + 2;
					let endIndex = embedList[i].indexOf(">");
					if (embedList[i].substring(startIndex, endIndex) == interaction.user.id) {
						embedList[i] = "공석"
					}
				}
				editList = embedList.join('\n')
				editEmbed.fields[1].value = editList
			}
			interaction.message.edit({ embeds: [editEmbed] })
			await interaction.reply({ephemeral: true, content:"취소가 완료되었어요!"})
			break;
		case "delete" :
			if(interaction.member.nickname == interaction.message.embeds[0].footer.text){
				interaction.message.delete();
			}
			else {
				await interaction.reply({ephemeral: true, content:"본인이 작성한 글만 삭제할 수 있어요."})
			}
			break;
		case "magam" :
			if(interaction.member.nickname == interaction.message.embeds[0].footer.text){
				interaction.message.edit({ components: [editedredButtons] })
			}
			else {
				await interaction.reply({ephemeral: true, content:"본인이 작성한 글만 마감시킬 수 있어요."})
			}
			break;
		default :
			await interaction.reply("오류 발생! 개발자에게 보고해주세요.")
			break;
	}
});

//select 인터렉션
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	switch (interaction.customId) {
		case "selectClassFirstDPS" :
			selectedClass = classDic[interaction.values[0]][0]
			originalMessage = interaction.message.fetchReference()
				.then(value => client.channels.fetch(value.channelId)
					.then(channels => channels.messages.fetch(value.id)
						.then(message => {
							const originalEmbed = message.embeds[0];
							let editEmbed = new MessageEmbed(originalEmbed)
							const userId = "<@" + interaction.user.id + ">"
							let embedSplit = editEmbed.fields[0].value.split('\n')
							for (let i = 0; i < 4; i++) {
								if (embedSplit[i] == "공석") {
									embedSplit[i] = selectedClass + '(' + userId + ')'
									let embedValue = embedSplit.join('\n')
									editEmbed.fields[0].value = embedValue
									message.edit({embeds: [editEmbed]})
									break;
								}
							}
						})))
			break;
		case "selectClassFirstSup" :
			selectedClass = classDic[interaction.values[0]][0]
			originalMessage = interaction.message.fetchReference()
				.then(value => client.channels.fetch(value.channelId)
					.then(channels => channels.messages.fetch(value.id)
						.then(message => {
							const originalEmbed = message.embeds[0];
							let editEmbed = new MessageEmbed(originalEmbed)
							const userId = "<@" + interaction.user.id + ">"
							let embedSplit = editEmbed.fields[0].value.split('\n')
							for (let i = 4; i >= 0; i--) {
								if (embedSplit[i] == "공석") {
									embedSplit[i] = selectedClass + '(' + userId + ')'
									let embedValue = embedSplit.join('\n')
									editEmbed.fields[0].value = embedValue
									message.edit({embeds: [editEmbed]})
									break;
								}
							}
						})))
			break;
		case "selectClassSecondDPS" :
			selectedClass = classDic[interaction.values[0]][0]
			originalMessage = interaction.message.fetchReference()
				.then(value => client.channels.fetch(value.channelId)
					.then(channels => channels.messages.fetch(value.id)
						.then(message => {
							const originalEmbed = message.embeds[0];
							let editEmbed = new MessageEmbed(originalEmbed)
							const userId = "<@" + interaction.user.id + ">"
							let embedSplit = editEmbed.fields[1].value.split('\n')
							for (let i = 0; i < 4; i++) {
								if (embedSplit[i] == "공석") {
									embedSplit[i] = selectedClass + '(' + userId + ')'
									let embedValue = embedSplit.join('\n')
									editEmbed.fields[1].value = embedValue
									message.edit({embeds: [editEmbed]})
									break;
								}
							}
						})))
			break;
		case "selectClassSecondSup" :
			selectedClass = classDic[interaction.values[0]][0]
			originalMessage = interaction.message.fetchReference()
				.then(value => client.channels.fetch(value.channelId)
					.then(channels => channels.messages.fetch(value.id)
						.then(message => {
							const originalEmbed = message.embeds[0];
							let editEmbed = new MessageEmbed(originalEmbed)
							const userId = "<@" + interaction.user.id + ">"
							let embedSplit = editEmbed.fields[1].value.split('\n')
							for (let i = 4; i >= 0; i--) {
								if (embedSplit[i] == "공석") {
									embedSplit[i] = selectedClass + '(' + userId + ')'
									let embedValue = embedSplit.join('\n')
									editEmbed.fields[1].value = embedValue
									message.edit({embeds: [editEmbed]})
									break;
								}
							}
						})))
			break;
		default :
			break;
	}
	await interaction.reply({ephemeral: true, content:"참여 완료되었어요! 직업 선택창은 재선택하면 오류가 발생할 수 있으니, 삼가 부탁드려요."})
});

client.login(token);