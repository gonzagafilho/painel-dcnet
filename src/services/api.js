import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apiservidor.dcinfinity.net.br'
})

// interceptor para enviar token automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

