import { Router } from 'express'
import StatusController from '../controllers/status.controller.js'

const router = Router()

// STATUS ATUAL
router.get('/', StatusController.status)

// HISTÓRICO DO SERVIDOR
router.get('/history', StatusController.history)

export default router

