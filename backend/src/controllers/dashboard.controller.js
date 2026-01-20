import Atendimento from '../models/Atendimento.js'

export default {
  // ✅ JÁ EXISTENTE (mantido)
  resumo(req, res) {
    res.json({
      clientes: 154,
      atendimentos: 23,
      chatbot: 'Ativo',
      servidor: 'Online'
    })
  },

  // 🆕 NOVO MÉTODO (PASSO C)
  async atendimentosPorDia(req, res) {
    try {
      const dados = await Atendimento.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            total: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      res.json(
        dados.map(item => ({
          data: item._id,
          total: item.total
        }))
      )
    } catch (error) {
      console.error('Erro dashboard diário:', error)
      res.status(500).json({ erro: 'Erro ao gerar dados do gráfico' })
    }
  }
}
