import express from 'express'
import { userLogin, userRegister, userLogout ,getMyProfile, getUserById} from '../controllers/user.js'
import { isAuthonticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/register',userRegister)

router.post('/login',userLogin)

router.get('/logout',userLogout)

router.get('/myprofile', isAuthonticated, getMyProfile)

router.get('/:id',getUserById)

export default router