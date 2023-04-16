const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const auth = require("../Schema/authSchema")

const register = async (req, res) => {

    const { email, password } = req.body

    const findUser = await auth.findOne({ email })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    console.log(findUser)

    if (findUser) {
        res.json("User already register")
    } else {
        const reg = new auth({
            email: email,
            password: hashPassword
        })

        await reg.save()
        res.json({
            message: "success user register",
            data: reg
        })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    const saveUser = await auth.findOne({ email: email })
    const hashpass = saveUser && saveUser.password
    const hash = hashpass ? hashpass : "wrong"
    console.log(hash)
    const resPass = bcrypt.compareSync(password.toString(), hash)
    console.log(resPass)
    if (saveUser && resPass) {
        const user = saveUser._id
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign({ saveUser }, process.env.REFRESH_TOKEN)


        saveUser.accessToken = accessToken
        saveUser.refreshToken = refreshToken
        // accessTokens.push(refreshToken)

        res.send({
            message: "ok",
            status: "email login success",
            user: saveUser
        })
    } else {
        res.json("email not exit in db")

    }
}

function generateAccessToken(user) {
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, { expiresIn: "30s" })
    return accessToken
}



module.exports = {
    register,
    login
}