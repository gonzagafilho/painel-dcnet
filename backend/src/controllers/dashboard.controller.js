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

  // ✅ GRÁFICO DIÁRIO
  async atendimentosPorDia(req, res) {
    try {
      const resultado = await Atendimento.aggregate([
        {
          $group: {
            _id: {
              dia: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt"
                }
              }
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.dia": 1 }
        },
        {
          $project: {
            _id: 0,
            dia: "$_id.dia",
            total: 1
          }
        }
      ])

      // ✅ SEMPRE ARRAY
      res.json(Array.isArray(resultado) ? resultado : [])

    } catch (error) {
      console.error('Erro atendimentosPorDia:', error)
      res.status(500).json([])
    }
  }, // ⬅️ ESSA VÍRGULA É O PULO DO GATO 🐱


  // 🆕 GRÁFICO DE STATUS
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
