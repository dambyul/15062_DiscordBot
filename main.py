import logging
from discord.ext import commands
import personal.token

logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s: %(message)s'))
logger.addHandler(handler)

token = personal.token.token
bot = commands.Bot(command_prefix='!')

@bot.event
#봇 시작 확인
async def on_ready():
    print(f'{bot.user}으로 접속 성공했습니다.')
     
@bot.command()
async def 테스트(ctx):
    await ctx.send(f'테스트!')

bot.run(token)