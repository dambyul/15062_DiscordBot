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

client.run(token)