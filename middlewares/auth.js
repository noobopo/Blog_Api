import jwt from 'jsonwebtoken'
import { User } from '../models/users.js'

export const isAuthonticated = async(req,res,next) =>{
    const token = req.cookies.token
    if(!token) return res.status(404).json({
        sucess:false,
        message:"please login first"
    })
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decode._id)
    next()
}