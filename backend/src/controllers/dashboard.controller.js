import Atendimento from '../models/Atendimento.js'

export default {
  // ✅ RESUMO DO DASHBOARD
  resumo(req, res) {
    res.json({
      clientes: 154,
      atendimentos: 23,
      chatbot: 'Ativo',
      servidor: 'Online'
    })
  },

  // ✅ GRÁFICO DIÁRIO (PASSO C)
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
  },

  // 🆕 GRÁFICO DE STATUS (PASSO D)
  async atendimentosStatus(req, res) {
    try {
      const resultado = await Atendimento.aggregate([
        {
          $group: {
            _id: '$status',
            total: { $sum: 1 }
          }
        }
      ])

      let abertos = 0
      let finalizados = 0

      resultado.forEach(item => {
        if (item._id === 'aberto') abertos = item.total
        if (item._id === 'finalizado') finalizados = item.total
      })

      res.json({ abertos, finalizados })
    } catch (error) {
      console.error('Erro dashboard status:', error)
      res.status(500).json({ erro: 'Erro ao gerar status dos atendimentos' })
    }
  }
}
