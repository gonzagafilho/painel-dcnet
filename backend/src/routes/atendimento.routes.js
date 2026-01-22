import { Router } from 'express'
import atendimentoController from '../controllers/atendimento.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', atendimentoController.create)
router.get('/', atendimentoController.list)
router.put('/:id', atendimentoController.finalizar)

export default router
