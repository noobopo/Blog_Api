import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'
export const isAuthonticated = async(req,res,next)=>{
    const {token} = req.cookies
    // console.log(token);
    if(!token) return res.status(404).json({sucess:false,message:"please login first.."})
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode);
    req.user = await User.findById(decode)

    next()
    
}