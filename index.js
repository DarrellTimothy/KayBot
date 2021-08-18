/* Import Module */

// Client: web-whatsapp.js
const { Client } = require('whatsapp-web.js');

// qrcode
const qrcode = require('qrcode-terminal');

// Functions 
const { processSPK } = require('./function.js');

// Mongo File
const mongo = require('./mongo.js')

// Keep Alive Server
const keepAlive = require('./server.js')

// Moment Timezone
const moment = require('moment-timezone');

// Image To Text
const { createWorker, createScheduler } = require(`tesseract.js`)

// Node Notifier
const NotificationCenter = require('node-notifier').NotificationCenter

var notifier = new NotificationCenter()

module.exports = { notifier }
// Mongoose
require(`./mongo.js`)

// FS
const fs = require('fs')

// Session File Path
const SESSION_FILE_PATH = './Data/session.json'

// Codes
const { setNow, getNow, getNowForTomorrow, loadWorker, getSpecificNow, getTodayDate, capital, addNowForTomorrow } = require('./codes.js')
const { getOrderData, checkCancel, checkMessage, getCaptionForTomorrow } = require('./function.js');

// Summon & Load Worker
const scheduler = createScheduler()

const worker = createWorker({
    logger: m => console.log(m)
});


/* Wake Up Phase */
// Load session data 
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Summon Client
const client = new Client({
    session: sessionData
});

let me = `6281230126250@c.us`

// Connect To Database Function
const connect = async () => {
    await mongo().then(async mongoose => {
        try {
            console.log('Connected to Database')
        } finally {
            mongoose.connection.close()
        }
    })
}

// Parse Argument & Set Variable
let groupID = `62811325432-1606056231@g.us`; // `6281230126250-1624938457@g.us` = Test; `62811325432-1606056231@g.us` = KPN 
var cArgs = process.argv.slice(2)
if (cArgs[0] === '-test') {
    groupID = `6281230126250-1624938457@g.us`
}
// QR
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
    console.log('QR Received, Waiting For Validation.')
})

client.on('ready', () => {
    console.log('KayBot Is Ready To Go!');
    let subtitle = 'Running Normal Version'
    if (groupID === `6281230126250-1624938457@g.us`) subtitle = "Running Test Version"
    notifier.notify({
        title: "KayBot Is Ready!",
        message: subtitle,
    })
});

setInterval(async function(){ 
    try {
    let target = await client.getChatById("639276827506@c.us")
    target.sendStateRecording()
    } catch (error) {
        
    }
}, 10000);

client.on('disconnected', () => {
    console.log('Client has disconnected')
    notifier.notify({
        title: "KayBot Has Disconnected!",
        message: "Please Reconnect.",
    })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

// Variable


client.on('message', async message => {

    const prefix = '-'
    const args = message.body.slice(prefix.length)
    .trim()
    .split(" ");

    const command = args.shift().toLowerCase() 

    const logID = `6281230126250-1624938457@g.us` // `6281230126250-1624938457@g.us` = Test;

    // Security Check.
   
    let gate = []
    if (message.from === `6281330900175@c.us`) gate.push(true)
    if (message.from === `62811325432@c.us`) gate.push(true)
    if (message.from === `6281230126250@c.us`) gate.push(true)
    if (message.from === `6282143316219@c.us`) gate.push(true)
    if (message.from === `6281330900157@c.us`) gate.push(true)
    if (!gate.includes(true)) return
   

    if (!message.body.toLowerCase().startsWith(prefix)) return
    if (command === 'ping') {
        let now = new Date()
        let timestamp = new Date(message.timestamp * 1000)
        let ping = Math.round(now - timestamp)
        return message.reply(`*Pong!*\nPing: ${ping}ms`)
    }

    if (command === 'send') {
        if (message.hasMedia) {
            media = await message.downloadMedia()
            client.sendMessage(groupID, `${args.join(" ")}`, {
                media: media
            })
            return message.reply('Sended!')
        } else {
            client.sendMessage(groupID, `${args.join(" ")}`)
            return message.reply(`Sended!`)
        }
    }

    if (command === 'post' || command === 'p') {
        let data;
        let media;
        let receiver;
        if (message.body === '-post' && !message.hasMedia) return message.reply('Media/Argument Needed.')
        message.reply(`Ok! Processing Data...\nPlease Wait!`)

        // Check Media--
        if (message.hasMedia) {
            media = await message.downloadMedia()
            try {
            data = await processSPK(args, media, worker)
            } catch (error) {
                message.reply(`An Error Occurred:\n${error.message}`)
            }
        } else { 
        try { 
            data = await processSPK(args)
        } catch (error) {
            message.reply(`An Error Occurred:\n${error.message}`)
        }
        }
        
        const confirmMessage = `Successfully posted ${data.caption}\nType: ${data.code}`;

        // Check if it plain type
        if (data.code.split()[0] === 'P') {
            await client.sendMessage(groupID, `${data.caption}\n${data.order}`)
            .then((msg) => {
                data.message = msg
            })
        } else {
            if (!data.order) {
            await client.sendMessage(groupID, `${data.caption}`, {
                media: media
            })
            .then((msg) => {
                data.message = msg
            })
            } else {
                await client.sendMessage(groupID, `${data.caption}\n${data.order}`, {
                    media: media
                })
                .then((msg) => {
                    data.message = msg
                })                
            }
        }
        await data.message.reply(confirmMessage, message.from)
        if (message.hasMedia) receiver = await getOrderData(media.data, scheduler)
        let time = getTodayDate()
        await data.message.reply(`Posted ${data.caption}.\nRequested By: ${message.from}\nReceiverᴮᴱᵀᴬ: ${receiver}\nTime: ${time}`, logID)
        delete data.message
        console.log(data)
        return notifier.notify({
            title: `Posted ${data.caption}`,
            message: `Requested By: ${message.from}`,
        })

    } 

    if (command === 'now') {
        const dateRegex = new RegExp("^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$")
        if (args[0]) {
        if (args[0].toLowerCase() === '-t') {
            let date = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");  
            let now = await getNowForTomorrow()
            return message.reply(`Getting *Now* For ${date}.\nNow: ${now}`)
        } else if (dateRegex.test(args[0])) {
            let now = await getSpecificNow(args[0])
            return message.reply(`Getting *Now* For ${date}.\nNow: ${now}`)
        }
    } 
        let date = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");  
        let now = await getNow()
       return await message.reply(`Getting *Now* For ${date}.\nNow: ${now}`)
    }

    if (command === 'setnow') {
        if (!args[0]) return message.reply(`No Date/Flag Input!`)
        if (!args[1]) return message.reply(`No value input!`)
        const dateRegex = new RegExp("^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$")
        let date = args[0].toLowerCase()
        let now = args[1]
        if (!date || date === '-n') {
            let time = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");
            await setNow(time, now)
            return message.reply(`Successfully setted *${now}* As Value For *${time}* Key.`)
        } else if (date === '-t') {
            let time = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");
            await setNow(time, now)
            return message.reply(`Successfully setted *${now}* As Value For *${time}* Key.`)
        } else {
        if (dateRegex.test(now)) return message.reply('Invalid Date')
        await setNow(date, now)
        return message.reply(`Successfully setted *${now}* As Value For *${date}* Key.`)
        }
    }
    
    if (command === 'help') {
        return message.reply(`See full markdown at GitHub:\nhttps://github.com/DarrellTimothy/KayBot#readme`)
    }

    if (command === 'itt') {
        message.reply('Please Wait! Processing Data...')
        let base64 = (await message.downloadMedia()).data
        var image = `data:image/jpg;base64,${base64.toString('base64')}`
        const { data: { text } } = await scheduler.addJob('recognize', image)
        return message.reply(`${text}`)
    }

    if (command === 'cancel') {
        if (!args) return message.reply('Error: Argument Needed.')
        message.reply('Cancelling...')
        let tlc = args[0].toLowerCase();
        let query = capital(tlc)
        let value = await checkCancel(query, false)
        if (!value) return message.reply('Error: Argument Not Valid')

        let msg = await client.searchMessages(query, {chatId: groupID, limit: 1})
        let msgArg = msg[0].body.split(" ")
        if (msgArg[0] != query) return message.reply("Not Found")
        let check = await checkMessage(msg[0], false)
        if (!check) return message.reply(`Error: No ${query} Founded During Tomorrow & Today`)
        if (msg[0].from != me) return message.reply(`Error: Message Is Not From Me`)
        await msg[0].reply(`${query} Cancel.`)
        await msg[0].delete(true)
        let time = getTodayDate()
        await message.reply('Canceled, Please delete the message.')
        await client.sendMessage(logID, `Cancelled ${query}.\nRequested By: ${message.from}\nTime: ${time}`)
        return notifier.notify({
            title: `Cancelled ${query}`,
            message: `Requested By: ${message.from}`,
        })
    }

    if (command === 'reschedule' || command === 'rs') {
        if (!args) return message.reply('Error: Argument Needed.')
        message.reply("Rescheduling...")
        let tlc = args[0].toLowerCase();
        let query = capital(tlc)
        let value = await checkCancel(query, true)
        if (!value) return message.reply('Error: Argument Not Valid')
        let msg = await client.searchMessages(query, {chatId: groupID, limit: 1})
        let msgArg = msg[0].body.split(" ")
        if (msgArg[0] != query) return message.reply("Not Found")
        let check = await checkMessage(msg[0], true)
        if (!check) return message.reply(`Error: No ${query} Founded During Today`)
        if (msg[0].from != me) return message.reply(`Error: Message Is Not From Me`)
        let processCaption;
        if (msgArg[1]) {
            msgArg.shift()
            processCaption = msgArg.join(" ")
        } else {
            processCaption = " "
        }
        let code = await getCaptionForTomorrow()
        await addNowForTomorrow()
        await msg[0].reply(`${query} Rescheduled => ${code}`)    
        let caption = `${code} ${processCaption}\n*Reschedule* From ${query}.`
        if (msg[0]) {
            media = await msg[0].downloadMedia()
            client.sendMessage(groupID, `${caption}`, {
                media: media
            })
        } else {
            client.sendMessage(groupID, `${caption}`)
        }
        let time = getTodayDate()
        await message.reply(`Success Rescheduled ${query} to ${code}`)
        await client.sendMessage(logID, `Rescheduled ${query}.\nRequested By: ${message.from}\nTime: ${time}`)
        return notifier.notify({
            title: `Rescheduled ${query}`,
            message: `Requested By: ${message.from}`,
        })
    }

    if (command === 'search') {
        if (!args) return message.reply('Error: Argument Needed.')
        message.reply("Searching...")
        let log = await client.searchMessages(args.join(" "), {chatId: groupID, limit: 1})
        if (log[0]) {
            let spk = await log[0].getQuotedMessage()
            log[0].reply(`Here's The Log (Quoted Message)`, message.from)
            spk.reply(`Here's The SPK`, message.from)
        } else {
            return message.reply(`Error, Not Found.`)
        }
    }
})

loadWorker(scheduler, worker)
client.initialize()
connect()

