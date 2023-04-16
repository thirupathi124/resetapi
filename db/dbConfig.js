const mongoose = require("mongoose")
require("dotenv").config()

const URI = process.env.MONGO_URI

const dbConnect = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("db connect sucess"))
        .catch((e) => console.log(e.message))
}


module.exports = dbConnect();