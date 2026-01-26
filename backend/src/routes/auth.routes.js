import { Router } from 'express'
import { login, resetPassword } from '../controllers/auth.controller.js'

const router = Router()

// POST /api/auth/login
router.post('/login', login)

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword)

export default router

