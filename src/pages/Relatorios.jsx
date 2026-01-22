import { useEffect, useState } from 'react'
import api from '../services/api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

  // 🔽 EXPORTAÇÃO CSV
  function exportarCSV() {
    if (!dados.length) {
      alert('Não há dados para exportar')
      return
    }

    const headers = ['Cliente', 'Status', 'Data']

    const rows = dados.map(item => [
      item.cliente || '',
      item.status || '',
      new Date(item.createdAt).toLocaleDateString()
    ])

    const csv =
      headers.join(';') +
      '\n' +
      rows.map(row => row.join(';')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `relatorios_${Date.now()}.csv`
    link.click()

    URL.revokeObjectURL(url)
  }

  // 🔽 EXPORTAÇÃO PDF
  function exportarPDF() {
    if (!dados.length) {
      alert('Não há dados para exportar')
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text('Relatório de Atendimentos - DC NET', 14, 15)

    doc.setFontSize(10)
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 14, 22)

    autoTable(doc, {
      startY: 28,
      head: [['Cliente', 'Status', 'Data']],
      body: dados.map(item => [
        item.cliente || '',
        item.status,
        new Date(item.createdAt).toLocaleDateString()
      ])
    })

    doc.save(`relatorios_${Date.now()}.pdf`)
  }

  useEffect(() => {
    buscarRelatorios()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>Relatórios</h1>

      {/* CARD */}
      <div
        style={{
          background: '#0f172a',
          borderRadius: 12,
          padding: 20,
          maxWidth: 900
        }}
      >
        {/* FILTROS */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 20
          }}
        >
          <input
            type="date"
            value={inicio}
            onChange={e => setInicio(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={fim}
            onChange={e => setFim(e.target.value)}
            style={inputStyle}
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="">Todos</option>
            <option value="aberto">Aberto</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <button onClick={buscarRelatorios} style={btnPrimary}>
            Filtrar
          </button>

          <button onClick={exportarCSV} style={btnSecondary}>
            CSV
          </button>

          <button onClick={exportarPDF} style={btnSecondary}>
            PDF
          </button>
        </div>

        {/* TABELA */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
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
                    <td colSpan="3" style={{ textAlign: 'center', padding: 20 }}>
                      Nenhum registro encontrado
                    </td>
                  </tr>
                )}

                {dados.map(item => (
                  <tr key={item._id}>
                    <td>{item.cliente || '-'}</td>
                    <td>
                      <span style={statusStyle(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= ESTILOS ================= */

const inputStyle = {
  background: '#020617',
  border: '1px solid #1e293b',
  borderRadius: 8,
  padding: '8px 10px',
  color: '#e5e7eb'
}

const btnPrimary = {
  background: '#2563eb',
  border: 'none',
  borderRadius: 8,
  padding: '8px 14px',
  color: '#fff',
  cursor: 'pointer'
}

const btnSecondary = {
  background: '#020617',
  border: '1px solid #1e293b',
  borderRadius: 8,
  padding: '8px 14px',
  color: '#e5e7eb',
  cursor: 'pointer'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
}

const statusStyle = status => ({
  padding: '4px 10px',
  borderRadius: 20,
  fontSize: 12,
  textTransform: 'capitalize',
  background:
    status === 'aberto'
      ? '#1e40af'
      : status === 'finalizado'
      ? '#166534'
      : '#7f1d1d',
  color: '#fff'
})
