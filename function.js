const { getNow, getCode, addNow, addNowForTomorrow, getCodeForTomorrow, getNowForTomorrow, setNow, checkShopType, getReceiverNameShopee, getReceiverNameToped, checkNumber  } = require('./codes.js')
const moment = require('moment-timezone');

// Functions 
const getCaption = async () => {
    let code = await getCode()
    let now = await getNow()
    return `${code}${now}`
}

const getCaptionForTomorrow = async () => {
    let code = await getCodeForTomorrow()
    let now = await getNowForTomorrow()
    return `${code}${now}`
}

// Exports
module.exports = {
    async getOrderData(base64, scheduler) {
        var image = `data:image/jpg;base64,${base64.toString('base64')}`
        let receiver;
        const { data : { text }} = await scheduler.addJob('recognize', image)

        if (checkShopType(text)) {
            receiver = await getReceiverNameToped(text)
        } else {
            receiver = await getReceiverNameShopee(text)
        }
  
        return receiver

    }, 

    async processSPK(args, media) {
        let data = {
            caption: '',
            code: '',
        }

        let flags = args.join().toLowerCase().split(',')
        // Check Media
        if (media) {
            data.code = 'M'
        } else {
            data.code = 'P'
        }
        // Check Tomorrow Flag
        if (flags.includes('-t')) {
            args = args.filter(function(item) {
                return item !== '-t'
            })
            data.caption = await getCaptionForTomorrow()
            data.code += 'T'
            await addNowForTomorrow()
        } else {
            data.caption = await getCaption();
            data.code += 'N'
            await addNow()
        }
        // Check Info/OTW Flag
        if (flags.includes('-i')) {
            args = args.filter(function(item) {
                return item !== '-i'
            })
            data.caption += ' Info'
            data.code += 'I'
        } else if (flags.includes('-o')) {
            args = args.filter(function(item) {
                return item !== '-o'
            })
            data.caption += ' Otw'
            data.code += 'O'
        } 

        if (flags.includes('-cc')) {
            args = args.filter(function(item) {
                return item !== '-cc'
            })
            data.caption += ' COC'
            data.code += 'COC'
        } else if (flags.includes('-cd')) {
            args = args.filter(function(item) {
                return item !== '-cd'
            })
            data.caption += ' COD'
            data.code += 'COD'
        } else if (flags.includes('-u')) {
            args = args.filter(function(item) {
                return item !== '-u'
            })
            data.caption += ' Urgent'
            data.code += 'U'
        }

        if (args) {
            data.order = args.join(" ")
        } 
        return data
    },

    async checkCancel(code) {
        if (!checkNumber(code)) return false
        var date = code.replace(/[0-9]/g, '');
        let today = await getCode()
        let tomorrow = await getCodeForTomorrow()
        if (date === today) return today
        else if (date === tomorrow) return tomorrow
        else return false
    },

    async checkMessage(msg) {
        let now = new Date(moment().tz("Asia/Jakarta")).getDate()
        let tomorrow = new Date(moment().tz("Asia/Jakarta").add(1, 'days')).getDate()
        let timestamp = new Date(msg.timestamp * 1000).getDate()
        if (timestamp != now && timestamp != tomorrow) return false
        else return true
        
    }



}