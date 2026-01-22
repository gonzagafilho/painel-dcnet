import { Router } from 'express'
import {
  listarRelatorios,
  enviarRelatorioPorEmail
} from '../controllers/relatorios.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const relatoriosRoutes = Router()

relatoriosRoutes.get('/relatorios', authMiddleware, listarRelatorios)
relatoriosRoutes.post('/relatorios/email', authMiddleware, enviarRelatorioPorEmail)

export { relatoriosRoutes }


