const demoUser = require("../Schema/UserSchema")

const saveData = async (req, res) => {
    const { name, url, goal } = req.body
    try {
        const User = new demoUser({
            name: name,
            url: url,
            goal: goal
        })
        await User.save()
        res.json({
            message: "success",
            data: User
        })
    } catch (e) {
        console.log(e.message)
    }

}

const getData = async (req, res) => {
    try {
        const data = await demoUser.find()
        res.json({
            message: "success",
            data: data
        })
    }
    catch (e) {
        res.json(e.message)
    }

}

const delData = async (req, res) => {
    const id = req.params.id
    try {
        await demoUser.findByIdAndDelete(id).then((doc) => {
            if (doc) {
                res.json({
                    message: "del success",
                    data: doc
                })
            } else {
                res.json("object id not find")
            }

        })
    } catch (e) {
        res.json(e.message)
    }

}

const updateData = async (req, res) => {
    const id = req.params.id
    const { name, goal, url } = req.body
    const value = {
        name,
        goal,
        url
    }
    try {
        await demoUser.findByIdAndUpdate(id, value).then((doc) => {
            if (doc) {
                res.json({
                    message: "sucess",
                    doc,
                })
            } else {
                res.json({ message: "update doc is faild" })
            }
        })
    } catch (e) {
        res.json(e.message)
    }

}


module.exports = {
    saveData,
    getData,
    delData,
    updateData
} 