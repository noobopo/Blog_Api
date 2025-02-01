import { Blog } from "../models/blogs.js";

export const createBlog =async(req,res)=>{
    const {title,description,imgUrl} = req.body;
    await Blog.create({title,description,imgUrl,user:req.user})
    res.status(200).json({
        sucess:true,
        message:"new blog added!",
    })
}

export const myBlog =async(req,res)=>{
    const userid = req.user._id
    const blogs = await Blog.find({user:userid})
    res.status(200).json({
        sucess:true,
        message:"your blogs",
        blogs
    })
}
export const updateBlog =async(req,res)=>{
    const {title,description,imgUrl} = req.body

    const id = req.params.id;

    const blog = await Blog.findById(id)
    if(!blog) return res.status(404).json({sucess:false,message:"invalid id"})
    
    blog.title = title,
    blog.description = description,
    blog.imgUrl = imgUrl
    blog.save()

    res.json({
        sucess:true,
        message:"updating blog",
        blog
    })
}
export const deleteBlog =async(req,res)=>{
    const id = req.params.id;

    const blog = await Blog.findById(id)

    if(!blog) return res.status(404).json({sucess:false,message:"invalid id"})
    
    await blog.deleteOne()

    res.json({
        sucess:true,
        message:"blog deleted",
    })
}