/*
* TurnerBot - Word Turner Bot
* Author: Selamanse <selamanse@scheinfrei.info>
*/

const Telegraf = require('telegraf')
const TurnerModule = require('./lib/turner.js')
const Turner = new TurnerModule()
const app = new Telegraf(process.env.BOT_TOKEN)

app.command('start', (ctx) => {
  console.log('start', ctx.from)
  ctx.reply('Aye!')
})

app.on('text', (ctx) => {
  console.log(ctx.message)
  var promise = Turner.validate(ctx.message.text)

  promise.then(function (res) {
    if (res === true) {
      ctx.reply('Aye! that be right!')
    } else {
      ctx.reply("Walk th' plank ye scallywag!")
    }
  }).catch(function (rej) {
    ctx.reply('Arr! some error happened.')
  })
})

app.on('sticker', (ctx) => ctx.reply('Arr!'))

app.startPolling()
