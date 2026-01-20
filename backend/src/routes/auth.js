import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(401).json({ message: 'Usuário não encontrado' })
    }

    const senhaValida = await admin.comparePassword(senha)

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ message: 'Erro interno no servidor' })
  }
})

// ROTA PROTEGIDA (TESTE)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ admin: req.admin })
})

export default router

