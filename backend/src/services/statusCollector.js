import os from 'os'
import StatusHistory from '../models/StatusHistory.js'
import { enviarAlerta } from './alert.service.js'

let ultimoEstado = 'ok'

export async function collectStatus() {
  try {
    const cpus = os.cpus()
    const idle = cpus.reduce((a, c) => a + c.times.idle, 0)
    const total = cpus.reduce(
      (a, c) =>
        a +
        c.times.user +
        c.times.nice +
        c.times.sys +
        c.times.idle +
        c.times.irq,
      0
    )
    const cpu = Math.round((1 - idle / total) * 100)

    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const ram = Math.round(((totalMem - freeMem) / totalMem) * 100)

    const disk = 0
    const uptime = os.uptime()

    await StatusHistory.create({
      api: 'online',
      cpu,
      ram,
      disk,
      uptime
    })

    const estadoAtual =
      cpu >= 85 || ram >= 85
        ? 'critico'
        : cpu >= 70 || ram >= 70
        ? 'alerta'
        : 'ok'

    if (estadoAtual !== ultimoEstado) {
      await enviarAlerta(
        `⚠️ *STATUS DO SERVIDOR*
Estado: *${estadoAtual.toUpperCase()}*
CPU: ${cpu}%
RAM: ${ram}%`
      )
      ultimoEstado = estadoAtual
    }
  } catch {
    // nunca derruba a API
  }
}

