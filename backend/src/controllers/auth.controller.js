import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

// =======================
// LOGIN
// =======================
export async function login(req, res) {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        message: 'E-mail e senha obrigatórios'
      })
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(401).json({
        message: 'Usuário não encontrado'
      })
    }

    // se não existir o campo ativo, considera ativo
    if (admin.ativo === false) {
      return res.status(403).json({
        message: 'Usuário inativo'
      })
    }

    const senhaOk = await bcrypt.compare(senha, admin.senha)

    if (!senhaOk) {
      return res.status(401).json({
        message: 'Senha inválida'
      })
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: 'admin'
      },
      process.env.JWT_SECRET || 'dcnet_secret',
      { expiresIn: '1d' }
    )

    return res.json({
      token,
      admin: {
        id: admin._id,
        nome: admin.nome || 'Admin',
        email: admin.email
      }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({
      message: 'Erro interno no servidor'
    })
  }
}

// =======================
// RESET DE SENHA (API ONLY)
// =======================
export async function resetPassword(req, res) {
  try {
    const { email, novaSenha } = req.body
    console.log("teste husky")
    if (!email || !novaSenha) {
      return res.status(400).json({
        message: 'Email e novaSenha são obrigatórios'
      })
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10)

    const result = await Admin.updateOne(
      { email },
      { $set: { senha: senhaHash } }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      })
    }

    return res.json({
      message: 'Senha atualizada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao resetar senha:', error)
    return res.status(500).json({
      message: 'Erro ao resetar senha'
    })
  }
}
