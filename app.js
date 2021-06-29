const wa = require('@open-wa/wa-automate')
const mime = require('mime-types');
const { getNow, getMedia, getCode, addNow, addNowForTomorrow, getCodeForTomorrow, getNowForTomorrow } = require('./function.js');
const mongo = require('./mongo.js')
const nowSchema = require('./schemas/now-schema.js')
const keepAlive = require('./server.js')
const connect = async () => {
    await mongo().then(async mongoose => {
        try {
            console.log('Connected to Database')
        } finally {
            mongoose.connection.close()
        }
    })
}

// Regex
const dateRegex = new RegExp("^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$")
const intRegex = new RegExp("^\d+$")

wa.create({
    sessionId: "KayBot",
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
}).then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        // Arguments Variable
        const args = message.body.split(" ")

        // Check what is the id now
        if (message.body === 'now') {
            let now = await getNow()
           await client.sendText(message.from, `Now: ${now}`)
        }

        if (args[0] === 'setnow') {
            let date = args[1]
            let now = args[2]
           
            if (!dateRegex.test(date)) return await client.sendText(message.from, `Invalid Date (First Argument)`)
            if (!intRegex.test(now)) return await client.sendText(message.from, `Invalid Number (Second Argument)`)
            await method.setnow(date, now)
            await client.sendText(message.from, `Successfully setted *${now}* As Value For *${date}* Key.`)
        }

        // Ghost variable
        let media = ''

        // Check if message include media
        if (message.mimetype) {
            if (args[0] === `post`) {
                if (args[1] === '-t') {
                    media = await getMedia(message)
                    let code = getCodeForTomorrow()
                    let now = await getNowForTomorrow()
                    let filename = `${code}${now}`
                    let caption = `*${code}${now}*`
                    await client.sendImage(`6281230126250-1624938457@g.us`, media, filename, caption)
                    await addNowForTomorrow()
                    return console.log('Successfully posted ' + caption + 'for tomorrow')                    
                }
                media = await getMedia(message)
                let code = getCode()
                let now = await getNow()
                let filename = `${code}${now}`
                let caption = `*${code}${now}*`
                await client.sendImage(`6281230126250-1624938457@g.us`, media, filename, caption)
                await addNow()
                console.log('Successfully posted ' + caption)
                
                }
            } 
    })
}
keepAlive()
connect()