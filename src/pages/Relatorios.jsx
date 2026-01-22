import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Relatorios() {
  const [dados, setDados] = useState([])
  const [inicio, setInicio] = useState('')
  const [fim, setFim] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function buscarRelatorios() {
    try {
      setLoading(true)

      const params = {}
      if (inicio && fim) {
        params.inicio = inicio
        params.fim = fim
      }
      if (status) {
        params.status = status
      }

      const response = await api.get('/relatorios', { params })
      setDados(response.data)
    } catch (error) {
      console.error('Erro ao buscar relatórios', error)
      alert('Erro ao buscar relatórios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarRelatorios()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Relatórios</h1>

      {/* FILTROS */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="date"
          value={inicio}
          onChange={e => setInicio(e.target.value)}
        />

        <input
          type="date"
          value={fim}
          onChange={e => setFim(e.target.value)}
        />

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="aberto">Aberto</option>
          <option value="finalizado">Finalizado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button onClick={buscarRelatorios}>
          Filtrar
        </button>
      </div>

      {/* TABELA */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {dados.length === 0 && (
              <tr>
                <td colSpan="3">Nenhum registro encontrado</td>
              </tr>
            )}

            {dados.map(item => (
              <tr key={item._id}>
                <td>{item.cliente || '-'}</td>
                <td>{item.status}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
