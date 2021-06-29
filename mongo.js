const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://DarrellTimothy:Dts21208@database.iwdu7.mongodb.net/database?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    return mongoose
}