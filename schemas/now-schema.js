const mongoose = require('mongoose')

const nowSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    now: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('now', nowSchema)