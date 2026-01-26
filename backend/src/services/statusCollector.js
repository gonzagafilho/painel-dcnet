import os from 'os'
import StatusHistory from '../models/StatusHistory.js'
import { enviarAlerta } from './alert.service.js' // ⬅️ alerta aqui

export async function collectStatus() {
  // CPU
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

  // RAM
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const ram = Math.round(((totalMem - freeMem) / totalMem) * 100)

  // DISCO (mantemos 0 por enquanto)
  const disk = 0

  const uptime = os.uptime()

  // 💾 salva histórico
  await StatusHistory.create({
    api: 'online',
    cpu,
    ram,
    disk,
    uptime
  })

  // 🚨 ALERTAS
  if (cpu >= 85) {
    await enviarAlerta(`🚨 CPU CRÍTICA: ${cpu}%`)
  }

  if (ram >= 85) {
    await enviarAlerta(`🚨 RAM CRÍTICA: ${ram}%`)
  }

  if (disk >= 90) {
    await enviarAlerta(`🚨 DISCO CRÍTICO: ${disk}%`)
  }
}

