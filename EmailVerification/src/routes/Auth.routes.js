import express from 'express'
const router = express.Router()
import { register, verifyEmail } from '../controllers/Auth.controller.js';


router.post('/register', register)
router.post('/verifyEmail', verifyEmail)

export default router;