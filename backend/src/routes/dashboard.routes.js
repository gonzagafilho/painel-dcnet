import express from 'express'
import auth from '../middlewares/auth.js'
import DashboardController from '../controllers/dashboard.controller.js'

const router = express.Router()

// ✅ JÁ EXISTENTE (mantém)
router.get('/resumo', auth, DashboardController.resumo)

// 🆕 NOVA ROTA (PASSO C)
router.get('/atendimentos-dia', auth, DashboardController.atendimentosPorDia)

export default router
