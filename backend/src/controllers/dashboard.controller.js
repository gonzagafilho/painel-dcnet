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

  // ✅ GRÁFICO DIÁRIO COM FILTRO POR PERÍODO
  async atendimentosPorDia(req, res) {
    try {
      const dias = parseInt(req.query.dias || '7', 10)

      const dataInicial = new Date()
      dataInicial.setDate(dataInicial.getDate() - dias)

      const resultado = await Atendimento.aggregate([
        {
          $match: {
            createdAt: { $gte: dataInicial }
          }
        },
        {
          $group: {
            _id: {
              dia: {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$createdAt'
                }
              }
            },
            total: { $sum: 1 }
          }
        },
        { $sort: { '_id.dia': 1 } },
        {
          $project: {
            _id: 0,
            dia: '$_id.dia',
            total: 1
          }
        }
      ])

      res.json(Array.isArray(resultado) ? resultado : [])
    } catch (error) {
      console.error('Erro atendimentosPorDia:', error)
      res.status(500).json([])
    }
  },

  // 🆕 GRÁFICO DE STATUS COM FILTRO POR PERÍODO
  async atendimentosStatus(req, res) {
    try {
      const dias = parseInt(req.query.dias || '7', 10)

      const dataInicial = new Date()
      dataInicial.setDate(dataInicial.getDate() - dias)

      const resultado = await Atendimento.aggregate([
        {
          $match: {
            createdAt: { $gte: dataInicial }
          }
        },
        {
          $group: {
            _id: '$status',
            total: { $sum: 1 }
          }
        }
      ])

      const resposta = {}
      resultado.forEach(item => {
        resposta[item._id] = item.total
      })

      res.json(resposta)
    } catch (error) {
      console.error('Erro atendimentosStatus:', error)
      res.status(500).json({})
    }
  }
}

