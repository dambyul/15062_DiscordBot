const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('모집')
	.setDescription('군단장 모집은 /군단장')
	.addStringOption(option =>
		option.setName('분류')
			.setDescription('어떠한 파티를 모집할 것인지 설정해주세요.')
			.setRequired(true)
			.addChoices(
				{ name: '카오스 던전', value: '1' },
				{ name: '가디언 토벌', value: '2' },
				{ name: '어비스 던전', value: '3' },
				{ name: '어비스 레이드', value: '4' },
				{ name: '도가토', value: '5' },
				{ name: '도비스', value: '6' },
				{ name: '기타', value: '7' }
			))
	.addStringOption(option =>
		option.setName('모집인원')
			.setDescription('모집할 인원 수를 선택해주세요.')
			.setRequired(true)
			.addChoices(
				{ name: '4인', value: '1' },
				{ name: '8인', value: '2' },
				{ name: '제한없음', value: '3' }
			))
	.addStringOption(option =>
		option.setName('제목')
			.setDescription('상세 콘텐츠 종류(예: 카앙겔 2종)와 출발 시간 등을 입력해주세요.')
			.setRequired(true))


exports.data = data;
