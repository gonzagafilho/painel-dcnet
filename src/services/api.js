import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apiservidor.dcinfinity.net.br/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('dcnet_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
