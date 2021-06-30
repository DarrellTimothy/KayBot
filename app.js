const wa = require('@open-wa/wa-automate')
const moment = require('moment-timezone');
const { getNow, getMedia, getCode, addNow, addNowForTomorrow, getCodeForTomorrow, getNowForTomorrow, setNow } = require('./function.js');
const mongo = require('./mongo.js')
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
    headless: false,
}).then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        // Arguments Variable
        const args = message.body.split(" ")

        if (args[0] === 'help') {
            if (!args[1]) {
            return await client.sendText(message.from, 
                `*KayBot* Help Page\n\n- \`\`\`post [flag] <media||text>\`\`\`\nFor Posting New Order.\n\n-\`\`\`now <date||flag>\`\`\`\n To Check What Is The "Now".\n\n-\`\`\`setnow <date||flag> <now>\`\`\`\n To set up "now" data.\n\n See specific help by using \`\`\`help [commandName]\`\`\``
                )
            } else if (args[1] === `now`) {
                return await client.sendText(message.from, 
                 `*KayBot* Help Page - \`\`\`now\`\`\`\n\n\`\`\`now [date||flag]\`\`\`\nDate Format: DD/MM/YY, or:\nFlag: -t (for tomorrow).\nIf argument is not filled, it will return now for this day`
                )
            }  else if (args[1] === `setnow`) {
                return await client.sendText(message.from, 
                 `*KayBot* Help Page - \`\`\`setnow\`\`\`\n\n\`\`\`setnow <date||flag> <now>\`\`\`\nDate Format: DD/MM/YY, or:\nFlag: -n (for today); -t (for tomorrow).\nNow: Positive Number (1-Infinity).`
                )
            }  else if (args[1] === `post`) {
                return await client.sendText(message.from, 
                 `*KayBot* Help Page - \`\`\`post\`\`\`\n\n\`\`\`post [flag] <media||text>\`\`\`\nFlag: -t (For Tomorrow) (If skipped, will aut-post for today.)\nMedia: File Type Image\nText: Any Text, Less then 65.000 Characthers`
                )
            }
        }
        // Check what is the id now
        if (args[0] === 'now') {
            if (args[1] === '-t') {
                let date = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");  
                let now = await getNowForTomorrow()
                return await client.sendText(message.from, `Getting *Now* For ${date}.\nNow: ${now}`)
            }
            let date = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");  
            let now = await getNow()
           return await client.sendText(message.from, `Getting *Now* For ${date}.\nNow: ${now}`)
        }

        if (args[0] === 'setnow') {
            let date = args[1]
            let now = args[2]
            if (date === '-n') {
                let time = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");
                await setNow(time, now)
                return await client.sendText(message.from, `Successfully setted *${now}* As Value For *${time}* Key.`)
            } else if (date === '-t') {
                let time = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");
                await setNow(time, now)
                return await client.sendText(message.from, `Successfully setted *${now}* As Value For *${time}* Key.`)
            } else {
            if (!dateRegex.test(date)) return await client.sendText(message.from, `${date} is invalid (First Argument)`)
            if (!intRegex.test(now)) return await client.sendText(message.from, `${now} is invalid (Second Argument)`)
            await setNow(date, now)
            return await client.sendText(message.from, `Successfully setted *${now}* As Value For *${date}* Key.`)
            }
        }

        // Ghost variable
        let media = ''

        // Check if message include media
        
            if (args[0] === `post`) {
                if (args[1] === '-t') {
                    if (message.mimetype) {
                    media = await getMedia(message)
                    let code = getCodeForTomorrow()
                    let now = await getNowForTomorrow()
                    let filename = `${code}${now}`
                    let caption = `*${code}${now}*`
                    await client.sendImage(`6281230126250-1624938457@g.us`, media, filename, caption)
                    await addNowForTomorrow()
                    return client.sendText(message.from, `Succesfully Posted ${caption} For Tommorow.!`)                   
                } else {
                    delete args[0]
                    delete args[1]
                    let order = args.join(" ")
                    let code = getCodeForTomorrow()
                    let now = await getNowForTomorrow()
                    let caption = `*${code}${now}*`
                    await client.sendText(`6281230126250-1624938457@g.us`, `${order}\n\n${caption}`)
                    await addNowForTomorrow()         
                    return client.sendText(message.from, `Succesfully Posted ${caption} For Tommorow.!`)           
                } 
            } else {
                if (message.mimetype) {
                media = await getMedia(message)
                let code = getCode()
                let now = await getNow()
                let filename = `${code}${now}`
                let caption = `*${code}${now}*`
                await client.sendImage(`6281230126250-1624938457@g.us`, media, filename, caption)
                await addNow()
                return client.sendText(message.from, `Succesfully Posted ${caption}.!`)
            } else {
                delete args[0]
                let order = args.join(" ")
                let code = getCode()
                let now = await getNow()
                let caption = `*${code}${now}*`
                await client.sendText(`6281230126250-1624938457@g.us`, `${order}\n\n${caption}`)
                await addNow()
                }
            }
         }
            
    })
}
keepAlive()
connect()