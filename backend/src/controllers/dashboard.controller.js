export default {
  async resumo(req, res) {
    try {
      // EXEMPLO (depois liga no banco)
      return res.json({
        clientes: 154,
        atendimentos: 23,
        chatbot: 'Ativo',
        servidor: 'Online'
      })
    } catch (err) {
      return res.status(500).json({ erro: 'Erro no dashboard' })
    }
  }
}
