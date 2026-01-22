import { Router } from 'express'
import dashboardController from '../controllers/dashboard.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

// 🔐 Todas as rotas protegidas
router.use(authMiddleware)

// 📊 Resumo
router.get('/resumo', dashboardController.resumo)

// 📈 Gráfico diário
router.get('/atendimentos-dia', dashboardController.atendimentosPorDia)

// 🥧 Gráfico de status (NOVO)
router.get('/atendimentos-status', dashboardController.atendimentosStatus)

export default router

