import { Router } from 'express'
import whatsappController from '../controllers/whatsapp.controller.js'

const router = Router()

// Verificação do webhook (Meta)
router.get('/webhook', whatsappController.verify)

// Recebimento de mensagens
router.post('/webhook', whatsappController.receive)

export default router
