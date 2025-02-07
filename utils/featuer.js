import jwt from 'jsonwebtoken'

export const generateCookie=(user,res,statusCode,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 4*900000),
        sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
        secure:process.env.NODE_ENV === "Development" ?false:true
    }).json({
        sucess:true,
        message
    })
}
