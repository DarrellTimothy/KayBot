const mongo = require('./mongo.js')
const nowSchema = require('./schemas/now-schema.js')

// Get Now Method
module.exports.getNow = async (date) => {
    return await mongo().then(async mongoose => {
        try {
            const result = await nowSchema.findOne({
                date
            })
            let now = 1
            if (result) {
                now = result.now
            } else {
                await new nowSchema({
                    date,
                    now
                }).save()
            }
            return now
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.addNow = async (date) => {
    return await mongo().then(async mongoose => {
        try {
            const result = await nowSchema.findOneAndUpdate({
                date,
            }, {
                date,
                $inc: {
                    now: 1
                }
            }, {
                upsert: true,
                new: true
            })
            return result.now
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setNow = async (date, now) => {
    return await mongo().then(async mongoose => {
        try {
            const result = await nowSchema.findOneAndUpdate({
                date
            })
            if (result) {
                let now = now
            } else {
                await nowSchema({
                    date,
                    now
                }).save() 
             }
            return result
        } finally {
            mongoose.connection.close()
        }
    })
}