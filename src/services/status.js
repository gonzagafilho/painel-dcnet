import api from './api'

// STATUS ATUAL (cards)
export async function getStatusAtual() {
  const res = await api.get('/status')
  return res.data
}

// HISTÓRICO (gráfico)
export async function getStatusHistory(hours = 24) {
  const res = await api.get(`/status/history?hours=${hours}`)
  return res.data
}
