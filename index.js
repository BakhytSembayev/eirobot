const { Telegraf,Markup } = require('telegraf')
require('dotenv').config()
const text = require ('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'} !`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('projects', async (ctx)=>{
    try{
         await ctx.replyWithHTML('<b>Проекты</b>',Markup.inlineKeyboard(
        [
            [Markup.button.callback('Facade','btn_1'),Markup.button.callback('interier','btn_2')],
            [Markup.button.callback('Facade2','btn_3'),Markup.button.callback('interier2','btn_4')]
        ]
    ))
    } catch(e) {
        console.error(e)
    }
});

function addActionBot(name,src, text){
    bot.action(name,async (ctx)=>{
        try{
            await ctx.answerCbQuery()
            if (src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
          await ctx.replyWithHTML(text,{
            disable_web_page_preview:true
            }) 
        } catch (e) {
            console.error(e)
        }
    })
}
addActionBot('btn_1','./img/1.jpg', text.text1)
addActionBot('btn_2','./img/2.jpg', text.text2)
addActionBot('btn_3','./img/3.jpg', text.text3)
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));