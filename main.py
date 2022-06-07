import discord
import logging
import personal.token

logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s: %(message)s'))
logger.addHandler(handler)

token = personal.token.token
client = discord.Client()

@client.event
#봇 시작 확인
async def on_ready():
    print(f'{client.user}으로 접속 성공했습니다.')
     
@client.event
#메세지 이벤트
async def on_message(message):
    #봇 본인의 글에는 답장 안함
    if message.author == client.user:
        return

    if message.content.startswith('테스트'):
        await message.channel.send('테스트')


client.run(token)