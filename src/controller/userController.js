const jwt = require('jsonwebtoken')
const User = require('../models/User')

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        //Buascar el usuario para verificar que existe el correo electronico en la bd
        //ahora con firebase-admin solo lo podemos poner asi 
        const userDoc = await User.findByEmail(email)

        //Si no existe el usuario
        if(!userDoc) {
            return res.status(404).json({
                message: 'USER NOT FOUND'
            })
        } 

        //Verificar si el password coincide 
        const isValidPass = await userDoc.verifyPassword(password)
        if(!isValidPass) {
            return res.status(401).json({
                message: 'INAVLID CREDENTIALS'
            })
        }

        //Generar el TOKEN
        const token = jwt.sign({email: userDoc.email}, process.env.SECRET, { expiresIn: '1h' })
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const existingUser = await User.findByEmail(email)
        if(existingUser){
            return res.status(404).json({
                message: 'User alredy exists'
            })
        }
        const newUser = await User.createUser(email, password)
        res.status(201).json({
            message: 'User Registered Successfully',
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = {registerUser, loginUser}