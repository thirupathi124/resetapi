const express = require("express")
require("dotenv").config();
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json())

const dbConfig = require("./db/dbConfig")

app.use("/", require("./router/authapi"))
app.use("/api", require("./router/router_file"))


const PORT = process.env.PORT

app.listen(PORT, dbConfig, () => {
    console.log(`server is running ${PORT}`)
})