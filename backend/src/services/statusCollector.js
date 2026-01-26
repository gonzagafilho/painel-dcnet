import StatusHistory from '../models/StatusHistory.js'
import { enviarAlerta } from './alert.service.js'

let ultimoNivel = 'OK'

function avaliarNivel({ cpu, ram, disk }) {
  if (cpu >= 85 || ram >= 85 || disk >= 90) return 'CRÍTICO'
  if (cpu >= 70 || ram >= 70 || disk >= 80) return 'ALERTA'
  return 'OK'
}

export async function collectStatus() {
  const status = await StatusHistory.create({
    api: 'online',
    cpu: global.serverStatus.cpu,
    ram: global.serverStatus.ram,
    disk: global.serverStatus.disk,
    uptime: global.serverStatus.uptime
  })

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
}
