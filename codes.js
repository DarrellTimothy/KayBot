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
        await worker1.initialize('ind+eng')
        scheduler.addWorker(worker1)
    }, 

    checkShopType(text) {
        text.toLowerCase()
        const arrayText = text.split(" ")
        if (arrayText.includes('tokopedia')) {
            return true
        }
        else return false
    },

    getReceiverNameShopee(text) {
        text = text.toLowerCase()
        const arrayText = text.split("\n")
        let receiverLine;
        for (let i = 0; i < arrayText.length; i++) {
            if (arrayText[i].includes("penerima")) {
                receiverLine = arrayText[i]
            }
        }
        let receiverArr = receiverLine.split(" ");
        receiverArr = receiverArr.filter(function(item) {
            return item !== 'penerima:' && item !== 'penerima' && item !== ':'  && item !== 'enerima' && item !== 'enerima:' && item !== 'karyapangannusantara' && item !== 'karya' && item !== 'pangan' && item !== 'nusantara' && item !== 'pengirim' && item !== 'pengirim:' && item !== 'karva'
        })

        let receiver = receiverArr.join(" ")
        const arrText = text.split(" ")
        if (arrText.includes("reg")) {
            receiver += `\nReguler`
        } else if (arrText.includes("halu")) {
            receiver += `\nSiCepat Halu`
        } else if (arrText.includes("gokil")) {
            receiver += `\nSiCepat Gokil`
        } else if (arrText.includes("eco")) {
            receiver += `\nAnterAja PakEkoAja`
        } else if (arrText.includes("reguler")) {
            receiver += `\nJNE Reguler`
        } else if (arrText.includes("instant")) {
            receiver += `\nInstant Courier`
        }

        return receiver
    },

    getReceiverNameToped(text) {
        text = text.toLowerCase()
        const arrayText = text.split("\n")
        let receiver;
        for (let i = 0; i < arrayText.length; i++) {
            if (arrayText[i].includes("kepada")) {
                receiver = arrayText[i+1]
            }
        }
        let receiverArr = receiver.toLowerCase().split(" ")
        receiverArr = receiverArr.filter(function(item) {
            return item !== 'karya' && item !== 'pangan' && item !== 'nusantara' 
        })
        let data = receiverArr.join(" ")

        const arrText = text.split(" ")
        if (arrText.includes("gosend")) {
            data += `\nGoSend`
        } else if (arrText.includes("anteraja") && arrText.includes("sicepat")) {
            data += `\nKurir Rekomendasi`
        } else if (arrText.includes("anteraja")) {
            data += `\nAnterAja`
        } else if (arrText.includes("grabexpress")) {
            data += `\nGrabExpress`
        } else if (arrText.includes("trucking")) {
            data += `\nJNE Trucking`
        } 

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
        h = checkTime(h)
        m = checkTime(m)
        
        time = dd + '/' + mm + '/' + yyyy + " - " + h + ":" + m

        return time 

    },

    capital(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    checkNumber(str){
        var regexp = /\d/g;
        return regexp.test(str);
      }



}