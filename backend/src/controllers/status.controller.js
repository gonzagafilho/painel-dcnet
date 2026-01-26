import os from 'os'
import fs from 'fs'

function getDiskUsage() {
  try {
    const stat = fs.statSync('/')
    return 0 // fallback simples (corrigimos depois)
  } catch {
    return 0
  }
}

export default {
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

      // DISK (simples, ajustaremos depois)
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
  }
}
