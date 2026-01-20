import Atendimento from '../models/Atendimento.js'
import { getDb } from '../database/mongoNative.js'

export default {
  // Criar atendimento (DESATIVADO TEMPORARIAMENTE PARA DEBUG)
  async create(req, res) {
    console.log('🚨 ROTA ATENDIMENTO CREATE FOI CHAMADA')
    return res.status(200).json({ msg: 'CREATE DESATIVADO PARA DEBUG' })
  },

  // Listar atendimentos (MONGOOSE OK PARA LEITURA)
  async list(req, res) {
    try {
      const atendimentos = await Atendimento.find().sort({ createdAt: -1 })
      res.json(atendimentos)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar atendimentos' })
    }
  },

  // Finalizar atendimento (MONGOOSE OK PARA UPDATE)
  async finalizar(req, res) {
    try {
      const atendimento = await Atendimento.findByIdAndUpdate(
        req.params.id,
        { status: 'finalizado', updatedAt: new Date() },
        { new: true }
      )

      res.json(atendimento)
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao finalizar atendimento' })
    }
  }
}

