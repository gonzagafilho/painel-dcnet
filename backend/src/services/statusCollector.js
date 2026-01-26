import StatusHistory from '../models/StatusHistory.js'
<<<<<<< HEAD
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
=======
import { enviarAlerta } from './alert.service.js'

let ultimoNivel = 'OK'

function avaliarNivel({ cpu, ram, disk }) {
  if (cpu >= 85 || ram >= 85 || disk >= 90) return 'CRÍTICO'
  if (cpu >= 70 || ram >= 70 || disk >= 80) return 'ALERTA'
  return 'OK'
}

export async function collectStatus() {
  const status = await StatusHistory.create({
>>>>>>> b15539c4d8a3239bdba9ef0b7f20b36d1665b0b0
    api: 'online',
    cpu: global.serverStatus.cpu,
    ram: global.serverStatus.ram,
    disk: global.serverStatus.disk,
    uptime: global.serverStatus.uptime
  })

<<<<<<< HEAD
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
=======
  const nivelAtual = avaliarNivel(status)

  // 🚨 ALERTA SÓ SE MUDAR DE NÍVEL
  if (nivelAtual !== ultimoNivel) {
    ultimoNivel = nivelAtual

    if (nivelAtual !== 'OK') {
      await enviarAlerta(
        `🚨 *ALERTA DC NET*\n\n` +
        `Status: *${nivelAtual}*\n` +
        `CPU: ${status.cpu}%\n` +
        `RAM: ${status.ram}%\n` +
        `DISCO: ${status.disk}%`
      )
    }
  }

  return status
>>>>>>> b15539c4d8a3239bdba9ef0b7f20b36d1665b0b0
}

