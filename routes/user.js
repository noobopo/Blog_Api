import express from 'express'
import { userLogin, userRegister, userLogout ,getMyProfile} from '../controllers/user.js'
import { isAuthonticated } from '../middlewares/auth.js';

const router = express.Router();

// user register
router.post('/register',userRegister)
// user login
router.post('/login',userLogin)
//user logout
router.get('/logout',userLogout)

router.get('/myprofile', isAuthonticated, getMyProfile)

export default router