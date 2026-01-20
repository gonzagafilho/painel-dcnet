import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function DashboardChart({ dados }) {
  const data = [
    { name: 'Clientes', valor: dados?.clientes || 0 },
    { name: 'Atendimentos', valor: dados?.atendimentos || 0 }
  ]

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #0b1220, #0f1a33)',
        borderRadius: '16px',
        padding: '20px',
        marginTop: '32px',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }}
    >
      <h3 style={{ color: '#fff', marginBottom: '16px' }}>
        📈 Atividade Geral
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
