import { Router } from 'express'
import { listarRelatorios } from '../controllers/relatorios.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const relatoriosRoutes = Router()

relatoriosRoutes.get('/relatorios', authMiddleware, listarRelatorios)

export { relatoriosRoutes }

