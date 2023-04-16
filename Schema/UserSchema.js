const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name: String,
    goal: String,
    url: String,
})

module.exports = mongoose.model("demo", UserSchema)