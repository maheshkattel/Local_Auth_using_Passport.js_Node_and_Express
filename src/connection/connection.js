const mongoose = require("mongoose")
const connectMongoDB = async (url) =>
{
    try {
        await mongoose.connect(url).then(console.log("Mongo DB Connected Successfully"))
    } catch (error) {
        console.log(`Error connectiong to MOngo DB ${error}`)
    }
}

module.exports = connectMongoDB;