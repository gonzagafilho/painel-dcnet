import Atendimento from '../models/Atendimento.js'

export default {
  // Criar atendimento
  async create(req, res) {
    try {
      const atendimento = await Atendimento.create(req.body)
      res.status(201).json(atendimento)
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar atendimento' })
    }
  },

  // Listar atendimentos
  async list(req, res) {
    try {
      const atendimentos = await Atendimento.find().sort({ createdAt: -1 })
      res.json(atendimentos)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar atendimentos' })
    }
  },

  // Finalizar atendimento
  async finalizar(req, res) {
    try {
      const atendimento = await Atendimento.findByIdAndUpdate(
        req.params.id,
        { status: 'finalizado' },
        { new: true }
      )

      res.json(atendimento)
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao finalizar atendimento' })
    }
  }
}
