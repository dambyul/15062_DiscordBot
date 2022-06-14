const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('군단장')
	.setDescription('군단장 파티를 모집합니다.')
	.addStringOption(option =>
		option.setName('분류')
			.setDescription('어떠한 파티를 모집할 것인지 설정해주세요.')
			.setRequired(true)
			.addChoices(
				{ name: '발탄(노말)', value: '1' },
				{ name: '발탄(하드)', value: '2' },
				{ name: '비아키스(노말)', value: '3' },
				{ name: '비아키스(하드)', value: '4' },
				{ name: '쿠크세이튼(노말)', value: '5' },
				{ name: '아브렐슈드(노말)', value: '6' },
				{ name: '아브렐슈드(하드)', value: '7' },
				{ name: '발탄(헬)', value: '8' },
				{ name: '비아키스(헬)', value: '9' },
				{ name: '쿠크세이튼(헬)', value: '10' },
			))
	.addStringOption(option =>
		option.setName('제목')
			.setDescription('출발 시간, 조건 등을 포함하여 작성해주세요.')
			.setRequired(true))


exports.data = data;
