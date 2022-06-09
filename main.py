import logging
import discord
from discord.ext import commands
from discord_buttons_plugin import *
import personal.token

logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s: %(message)s'))
logger.addHandler(handler)

token = personal.token.token
intents = discord.Intents.all()
bot = commands.Bot(command_prefix='!', intents=intents)
buttons = ButtonsClient(bot)

#봇 시작 확인
@bot.event
async def on_ready():
    print(f'{bot.user}으로 접속 성공했습니다.')


@buttons.click
async def first_dps(ctx):
    print("??")
    exit()
    await ctx.reply("1")

@buttons.click
async def first_sup(ctx):
    await ctx.reply("2")

@buttons.click
async def second_dps(ctx):
    await ctx.reply("3")

@buttons.click
async def second_sup(ctx):
    await ctx.reply("4")

@buttons.click
async def cancel(ctx):
	await ctx.reply("5")

@bot.command()
async def 큰파티(ctx):
    await buttons.send(
        content="이 부분에 정보 입력 예정",
        channel=ctx.channel.id,
        components=[
            ActionRow([
                Button(
                    label="1팟 딜러",
                    style=ButtonType().Primary,
                    custom_id="first_dps"
                ), Button(
                    label="1팟 서폿",
                    style=ButtonType().Success,
                    custom_id="first_sup"
                ), Button(
                    label="2팟 딜러",
                    style=ButtonType().Primary,
                    custom_id="second_dps"
                ), Button(
                    label="2팟 서폿",
                    style=ButtonType().Success,
                    custom_id="second_sup"
                )
            ]), ActionRow([
                Button(
                    label="취소",
                    style=ButtonType().Danger,
                    custom_id="cancel"
                )
            ])
        ]
    )

@bot.command()
async def 작은파티(ctx):
    await buttons.send(
        content="이 부분에 정보 입력 예정",
        channel=ctx.channel.id,
        components=[
            ActionRow([
                Button(
                    label="딜러 지원",
                    style=ButtonType().Primary,
                    custom_id="first_dps"
                ), Button(
                    label="서포터 지원",
                    style=ButtonType().Success,
                    custom_id="first_sup"
                ), Button(
                    label="취소하기",
                    style=ButtonType().Danger,
                    custom_id="cancel"
                )
            ])
        ]
    )
bot.run(token)