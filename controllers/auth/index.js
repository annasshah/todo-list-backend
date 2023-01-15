const User = require("../../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const { AUTH_TOKEN_SECRET_KEY } = process.env

const signUp = async (req, res) => {
    const { email, username, password } = req.body


    if (!username || !email || !password) {
        return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
    }

    // const find_user = await User.findOne({email})
    const find_user = await User.exists({ email })

    if (find_user) {
        return res.status(409).json({ success: false, message: 'User with this email already exist!' })
    }

    const salt = await bcrypt.genSalt(12)
    const secure_password = await bcrypt.hash(password, salt)

    const create_user = await User.create({
        email, username, password: secure_password
    })


    const data = {
        id: create_user.id
    }

    const auth_token = jwt.sign(data, AUTH_TOKEN_SECRET_KEY)
    
    return res.json({ success: true, message: 'User successfuly created!', token: auth_token })

}



const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
    }

    // const find_user = await User.findOne({email})
    const find_user = await User.findOne({ email })

    if (!find_user) {
        return res.status(409).json({ success: false, message: 'Please login with correct credential' })
    }

    const compare_password = await bcrypt.compare(password,find_user.password)

    if(!compare_password){
        return res.status(401).json({
            success: false,
            message: 'Please try to login with correct credentials!'
        })
    }

    const data = {
        id: find_user.id
    }

    const auth_token = jwt.sign(data, AUTH_TOKEN_SECRET_KEY)

    res.cookie('token',auth_token)

    return res.json({ success: true, message: 'Logged in successfuly!', token: auth_token })

}







module.exports = { signUp, login }