const express = require("express")
const router = express.Router()
const { saveData, getData, delData, updateData } = require("../controller/curd_file")


router.post("/saveuser", saveData)
router.get("/alldata", getData)
router.delete("/userdel/:id", delData)
router.patch("/update/:id", updateData)

module.exports = router