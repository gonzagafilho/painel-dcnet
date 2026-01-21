import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  // 🔒 Token não enviado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' })
  }

  // 🔒 Formato esperado: "Bearer TOKEN"
  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token malformado' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 🔹 ID do usuário disponível para as rotas
    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
