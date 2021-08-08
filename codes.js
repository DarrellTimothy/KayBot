const moment = require('moment-timezone');
const method = require('./methods.js')

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

    async getNow() {

        var today = new Date(moment().tz("Asia/Jakarta").format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return await method.getNow(today)
    },

    async getSpecificNow(date) {
        return await method.getNow(date)
    },

    async addNow() {
        var today = new Date(moment().tz("Asia/Jakarta").format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;   
        return await method.addNow(today)
    },

    async addNowForTomorrow() {

        var today = new Date(moment().tz("Asia/Jakarta").add(1, 'days').format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;   
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
    }, 

    async loadWorker(scheduler, worker1) {
        await worker1.load()
        await worker1.loadLanguage('ind+eng')
        scheduler.addWorker(worker1)
    }, 

    checkShopType(text) {
        text.toLowerCase()
        const arrayText = text.split(" ")
            console.log(true, 'SHOP TYPE IS SHOPEE')
            return true
        }
        else return false
    },

    getReceiverNameShopee(text) {
        const arrayText = text.split("\n")
        let receiverLine = arrayText[2].toString().toLowerCase().split(" ")
        receiverLine = receiverLine.filter(function(item) {
            return item !== 'karyapangannusantara' && item !== 'penerima:' && item !== 'pengirim:' 
        })
        for (names in receiverLine) {
            names = names.charAt(0).toUpperCase() + names.slice(1)
        }
        const receiver = receiverLine.join(" ")
        return receiver
    },

    getReceiverNameToped(text) {
        const arrayText = text.split("\n")
        let receiver;
        for (let i = 0; i < arrayText.length; i++) {
            let low = arrayText[i].toLowerCase()
            if (low.includes("kepada")) {
                receiver = arrayText[i+1]
            }
        }
        let receiverArr = receiver.toLowerCase().split(" ")
        receiverArr = receiverArr.filter(function(item) {
            return item !== 'karya' && item !== 'pangan' && item !== 'nusantara' 
        })
        let data = receiverArr.join(" ")
        return data
    },

    getTodayDate() {
        
        function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }

        var today = new Date(moment().tz("Asia/Jakarta").format());
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        m = checkTime(h)
        m = checkTime(m)
        time = dd + '/' + mm + '/' + yyyy + " - " + h + ":" + m

        return time 

    }



}