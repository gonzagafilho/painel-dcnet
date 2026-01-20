import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([])
  const [cliente, setCliente] = useState('')
  const [loading, setLoading] = useState(false)

  async function carregarAtendimentos() {
    try {
      const { data } = await api.get('/atendimentos')
      setAtendimentos(data)
    } catch (err) {
      console.error('Erro ao carregar atendimentos', err)
    }
  }

  async function criarAtendimento(e) {
    e.preventDefault()
    if (!cliente) return

    setLoading(true)
    try {
      await api.post('/atendimentos', { cliente })
      setCliente('')
      carregarAtendimentos()
    } catch (err) {
      console.error('Erro ao criar atendimento', err)
    } finally {
      setLoading(false)
    }
  }

  async function finalizarAtendimento(id) {
    try {
      await api.put(`/atendimentos/${id}`)
      carregarAtendimentos()
    } catch (err) {
      console.error('Erro ao finalizar atendimento', err)
    }
  }

  useEffect(() => {
    carregarAtendimentos()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Atendimentos</h2>

      {/* FORMULÁRIO */}
      <form onSubmit={criarAtendimento} style={{ marginBottom: 24 }}>
        <input
          placeholder="Nome do cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button disabled={loading}>
          {loading ? 'Criando...' : 'Criar atendimento'}
        </button>
      </form>

      {/* LISTA */}
      <table width="100%" cellPadding="8">
        <thead>
          <tr>
            <th align="left">Cliente</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos.map(at => (
            <tr key={at._id}>
              <td>{at.cliente}</td>
              <td>{at.status}</td>
              <td>
                {at.status === 'aberto' && (
                  <button onClick={() => finalizarAtendimento(at._id)}>
                    Finalizar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
