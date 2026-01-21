import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#ef4444']

export default function DashboardStatusChart({ dados }) {
  // 🔒 BLINDAGEM
  if (!Array.isArray(dados) || dados.length === 0) {
    return null
  }

  const data = dados.map(item => ({
    name: item._id,
    value: item.total
  }))

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#fff', marginBottom: '16px' }}>
        Atendimentos por Status
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
