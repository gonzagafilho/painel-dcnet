import os from 'os'
import StatusHistory from '../models/StatusHistory.js'

export default {
  // ===============================
  // STATUS EM TEMPO REAL (/api/status)
  // ===============================
  status(req, res) {
    try {
      // CPU
      const cpus = os.cpus()
      const idle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0)
      const total = cpus.reduce(
        (acc, cpu) =>
          acc +
          cpu.times.user +
          cpu.times.nice +
          cpu.times.sys +
          cpu.times.idle +
          cpu.times.irq,
        0
      )
      const cpu = Math.round((1 - idle / total) * 100)

      // RAM
      const totalMem = os.totalmem()
      const freeMem = os.freemem()
      const ram = Math.round(((totalMem - freeMem) / totalMem) * 100)

      // DISCO (por enquanto 0 — evoluímos depois)
      const disk = 0

      // UPTIME
      const uptime = os.uptime()

      res.json({
        api: 'online',
        cpu,
        ram,
        disk,
        uptime,
        updatedAt: new Date().toISOString()
      })
    } catch (err) {
      res.status(500).json({
        api: 'offline',
        error: 'Erro ao coletar status'
      })
    }
  },

  // =====================================
  // HISTÓRICO DE STATUS (/api/status/history)
  // =====================================
  async history(req, res) {
    try {
      const hours = Number(req.query.hours || 24)
      const since = new Date(Date.now() - hours * 60 * 60 * 1000)

      const data = await StatusHistory.find({
        createdAt: { $gte: since }
      })
        .sort({ createdAt: 1 })
        .lean()

      res.json(data)
    } catch (err) {
      res.status(500).json({ error: 'Erro ao carregar histórico' })
    }
  }
}
