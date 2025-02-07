import { User } from '../models/users.js';
import bcrypt from 'bcrypt' 
import { generateCookie } from '../utils/featuer.js';

//register
export const userRegister = async(req,res)=>{
    const {name,email,password} = req.body
    let user = await User.findOne({email})
    if(user) return res.status(404).json({sucess:false,message:"user already exist!"})
    const hasepassword = await bcrypt.hash(password,10)
    user = await User.create({ name,email,password:hasepassword })
    generateCookie(user,res,201,"user register succesfully!")
}
//login
export const userLogin = async(req,res)=>{
    const {email,password} = req.body
    let user = await User.findOne({email})
    if(!user) return res.status(400).json({ sucess:false,message:"user not found"})
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({ sucess:false,message:"wrong email or password"})
    generateCookie(user,res,201,`${user.name} login succesfully!`)
}
//logout
export const userLogout = (req,res)=>{
    res.status(200).clearCookie("token").json({
        sucess:true,
        message:"logout Sucessfull!"
    })
}
//get myprofile
export const getMyProfile = (req,res)=>{
    res.status(200).json({message:"Hello",user:req.user})
}

export const getUserById=async(req,res)=>{
    const id = req.params.id;
        const user = await User.findById(id)
        if(!user) return res.status(404).json({sucess:false,message:"invalid id"})
        res.json({
            sucess:true,
            message:"your data",
            user
        })
}