import express from 'express'
import { isAuthonticated } from '../middlewares/auth.js'
import {createBlog,myBlog,updateBlog,deleteBlog,getAllBlogs,getBlogByid} from '../controllers/blog.js'

const router = express.Router()

router.post('/new',isAuthonticated,createBlog)

router.get('/myblogs',isAuthonticated,myBlog)

router.put('/:id',isAuthonticated,updateBlog)

router.delete('/:id',isAuthonticated,deleteBlog)

router.get('/allblogs',getAllBlogs)

router.get('/blog/:id',isAuthonticated,getBlogByid)




export default router;