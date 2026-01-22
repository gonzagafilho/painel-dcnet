import { Router } from 'express'
import {
  listarRelatorios,
  enviarRelatorioPorEmail
} from '../controllers/relatorios.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/relatorios', authMiddleware, listarRelatorios)
router.post('/relatorios/email', authMiddleware, enviarRelatorioPorEmail)

export default router

