const mongoose = require("mongoose")
const passport = require("passport")


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true        // ← only this should be unique
    },
    password: {
        type: String,
        required: true
    }
})


const User = mongoose.model("user", UserSchema);

module.exports = User;