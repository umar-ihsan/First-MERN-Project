const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const createToken =(_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
}



const login = async (req,res)=>{

    const {email,password}=req.body

    const emptyFields = []

    if(!email){
        emptyFields.push('email')
    }
    if(!password){
        emptyFields.push('password')
        }

    if(emptyFields.length>0){
            return res.status(400).json({error:'Please fill in all the fields',emptyFields})
        }
    
    try {
        const user= await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message,emptyFields})
    }

}

const signup = async (req,res)=>{

    const {email,password}=req.body

    const emptyFields = []

    if(!email){
        emptyFields.push('email')
    }
    if(!password){
        emptyFields.push('password')
        }

    if(emptyFields.length>0){
            return res.status(400).json({error:'Please fill in all the fields',emptyFields})
        }
    
    try {
        const user= await User.signup(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message,emptyFields})
    }
    

}


module.exports = {login,signup}
