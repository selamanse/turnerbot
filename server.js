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
  ctx.reply('Aye! Just give me something to turn')
})

const turnerMiddleware = (ctx, next) => {
  if (!ctx.turnerInput) {
    next()
  }
  console.log("RECIEVED TURNER INPUT: '" + ctx.turnerInput + "'")

  Turner.validate(ctx.turnerInput)
    .then(function (res) {
      if (res === true) {
        ctx.reply('Aye! that be right @' + ctx.from.username + '! <b>' + ctx.turnerInput + '</b> is valid', {parse_mode: 'Html'})
      } else {
        ctx.reply("Walk th' plank ye scallywag @" + ctx.from.username + '! <b>' + ctx.turnerInput + '</b> is not valid', {parse_mode: 'Html'})
      }
    })
    .catch(function (rej) { ctx.reply('Arr! some error happened.') })
}

// Turn RegEx
app.hears(/turn (.*)/, (ctx, next) => {
  ctx.turnerInput = ctx.match[1]
  next()
}, turnerMiddleware)

app.startPolling()
