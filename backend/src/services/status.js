import api from './api'

export async function getStatusHistory(hours = 24) {
  const res = await api.get(`/status/history?hours=${hours}`)
  return res.data
}
