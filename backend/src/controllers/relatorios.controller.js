import Atendimento from '../models/Atendimento.js'

async function listarRelatorios(req, res) {
  try {
    const { inicio, fim, status } = req.query

    const filtro = {}

    if (inicio && fim) {
      filtro.createdAt = {
        $gte: new Date(inicio),
        $lte: new Date(fim)
      }
    }

    if (status) {
      filtro.status = status
    }

    const atendimentos = await Atendimento
      .find(filtro)
      .sort({ createdAt: -1 })

    return res.json(atendimentos)
  } catch (error) {
    console.error('Erro relatório:', error)
    return res.status(500).json({ error: 'Erro ao gerar relatório' })
  }
}

export { listarRelatorios }

