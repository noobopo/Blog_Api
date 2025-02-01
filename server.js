import express from 'express'
import mongoose, { get } from 'mongoose'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.js'
import blogRouter from './routes/blog.js'
import { config } from 'dotenv'
import cors from 'cors'


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POAST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

mongoose.connect(process.env.MONGO_URL,{
    dbName:"our_data"
}).then(()=>{
    console.log("mongodb connected...");  
})
// user routers
app.use('/api/users',userRouter)
//blog router
app.use('/api/blogs',blogRouter)




