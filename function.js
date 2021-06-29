const moment = require('moment-timezone');
const mime = require('mime-types');
const method = require('./methods.js')
const { decryptMedia } = require('@open-wa/wa-automate')

module.exports = {
    getCode() {
        //  Get Today GMT+7 Time
        let date  = moment().tz("Asia/Jakarta").format();  

        // Ghost Variable
        let day = ""

        // Decrpyting 
    switch (new Date(date).getDay()) {
        case 0:
            day = "Mg";
        break;
        case 1:
            day = "Sn";
        break;
        case 2:
            day = "Sl";
        break;
        case 3:
            day = "Rb";
          break;
        case 4:
            day = "Km";
        break;
        case 5:
            day = "Jm";
        break;
        case 6:
            day = "Sb";
      }

        // Data Return
        return day
    },

    async getMedia(message) {
        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`

        return imageBase64
    },

    async getNow() {

        var today = new Date(moment().tz("Asia/Jakarta").format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return await method.getNow(today)
    },

    async addNow() {

        var today = new Date(moment().tz("Asia/Jakarta").format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;   
        console.log(`2`, today)
        return await method.addNow(today)
    },

    async addNowForTomorrow() {

        var today = new Date(moment().tz("Asia/Jakarta").add(1, 'days').format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;   
        console.log(`1`, today)
        return await method.addNow(today)
    },

    async getNowForTomorrow() {
        let date1  = moment().tz("Asia/Jakarta").add(1, 'days').format("DD/MM/YYYY");

        return await method.getNow(date1)
    },

    getCodeForTomorrow() {
        //  Get Today GMT+7 Time
        let date1  = moment().tz("Asia/Jakarta").add(1, 'days').format();  

        // Ghost Variable
        let day = ""

        // Decrpyting 
    switch (new Date(date1).getDay()) {
        case 0:
            day = "Mg";
        break;
        case 1:
            day = "Sn";
        break;
        case 2:
            day = "Sl";
        break;
        case 3:
            day = "Rb";
          break;
        case 4:
            day = "Km";
        break;
        case 5:
            day = "Jm";
        break;
        case 6:
            day = "Sb";
      }

        // Data Return
        return day
    },

    async setNow(date, now) {
        return await method.setNow(date, now)
    }

}