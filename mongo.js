const mongoose = require('mongoose')
const mongoPath = 'mongodb://localhost:27017/database'
const { client } = require(`./index.js`)
const { notifier } = require('./index.js')

// Server Function
module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    return mongoose
}

mongoose.connection.on('error', err => {
    console.log(err);
  });