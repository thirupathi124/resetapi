const mongoose = require("mongoose")



const authSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: String
})

module.exports = mongoose.model("Auth", authSchema)