/* Import Module */

// Client: web-whatsapp.js
const { Client } = require('whatsapp-web.js');

// qrcode
const qrcode = require('qrcode-terminal');

// Functions 
const { process } = require('./function.js');

// Mongo File
const mongo = require('./mongo.js')

// Keep Alive Server
const keepAlive = require('./server.js')

// Moment Timezone
const moment = require('moment-timezone');

// Image To Text
const { createWorker } = require(`tesseract.js`)

// Codes
const { setNow, getNow, getNowForTomorrow, loadWorker } = require('./codes.js')
const { getOrderData } = require('./function.js')

// Summon & Load Worker
const worker = createWorker({
    logger: m => console.log(m)
});

loadWorker(worker)
/* Wake Up Phase */
// Summon Client
const client = new Client();

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

// QR
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
    console.log('QR Received, Waiting For Validation.')
})

client.on('ready', () => {
    console.log('KayBot Is Ready To Go!');
});

client.on('message', async message => {
    const groupID = `62811325432-1606056231@g.us` // `6281230126250-1624938457@g.us` = Test; `62811325432-1606056231@g.us` = KPN 
    const prefix = 'k'
    const args = message.body.slice(prefix.length)
    .trim()
    .split(" ");

    const command = args.shift().toLowerCase() 
    if (command === 'ping') {
        message.reply(`Pong!`);
    }

    if(command === 'post') {
        let data;
        let media;

        message.reply(`Ok! Processing Data...\nPlease Wait!`)

        // Check Media--
        if (message.hasMedia) {
            media = await message.downloadMedia()
            data = await process(args, media, worker)
        } else {
            data = await process(args)
        }
        

        // Check if it plain type
        if (data.code.split()[0] === 'P') {
            client.sendMessage(groupID, `${data.caption}\n${data.order}`)
        } else {
            if (!data.order) {
            client.sendMessage(groupID, `${data.caption}`, {
                media: media
            })
            } else {
                client.sendMessage(groupID, `${data.caption}\n${data.order}`, {
                    media: media
                })                
            }
        }
        console.log(data)
        // Check if there's receiver
        if (!data.receiver) return message.reply(`Successfully posted ${data.caption}\nType: ${data.code}`)
        else return message.reply(`Successfully posted ${data.caption}\nType: ${data.code}`)
    } 

    if (command === 'now') {
        if (args[0]) {
        if (args[0].toLowerCase() === '-t') {
            let date = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");  
            let now = await getNowForTomorrow()
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
        if (!args[0]) {
        return await message.reply(
            `*KayBot* Help Page\n\n- \`\`\`post [flag] <media||text>\`\`\`\nFor Posting New Order.\n\n-\`\`\`now <date||flag>\`\`\`\n To Check What Is The "Now".\n\n-\`\`\`setnow <date||flag> <now>\`\`\`\n To set up "now" data.\n\n-\`\`\`ping\`\`\`\nTo check the bot ping.\n\nSee specific help by using \`\`\`help [commandName]\`\`\` or see flags by using \`\`\`help flags\`\`\``
            )
        } else if (args[0] === 'flags') {
            message.reply(
                `*KayBot* Help Page - \`\`\`Flags\`\`\`\n\n"-n" : Now\n\n "-t": Tomorrow\n\n"-o": OTW\n\n "-i": Info\n\n "-cc": COC\n\n"-cd": COD`
            )
            }
    }





})

client.initialize()
keepAlive()
connect()