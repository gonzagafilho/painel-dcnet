console.log('🔥 ROTAS AUTH CARREGADAS')
import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' })
  }

  const admin = await Admin.findOne({ email })

  if (!admin) {
    return res.status(401).json({ message: 'Usuário não encontrado' })
  }

  if (!admin.ativo) {
    return res.status(403).json({ message: 'Usuário desativado' })
  }

  if (admin.senha !== senha) {
    return res.status(401).json({ message: 'Senha inválida' })
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )

  res.json({
    token,
    user: {
      id: admin._id,
      email: admin.email,
      nome: admin.nome,
      role: admin.role
    }
  })
})

// 🔐 ROTA PROTEGIDA
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    role: req.userRole
  })
})

export default router
import authMiddleware from '../middlewares/authMiddleware.js'

router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  })
})
