import express from 'express'
import auth from '../middlewares/auth.js'
import DashboardController from '../controllers/dashboard.controller.js'

const router = express.Router()

router.get('/resumo', auth, DashboardController.resumo)

export default router
