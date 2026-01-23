import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

export default function StatusChart({ data }) {
  return (
    <div
      style={{
        background: '#020617',
        padding: 20,
        borderRadius: 12,
        marginTop: 30
      }}
    >
      <h3 style={{ marginBottom: 16 }}>Uso do Servidor</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="cpu_load"
            stroke="#ef4444"
            name="CPU"
          />
          <Line
            type="monotone"
            dataKey="ram_percent"
            stroke="#22c55e"
            name="RAM"
          />
          <Line
            type="monotone"
            dataKey="disk_percent"
            stroke="#3b82f6"
            name="Disco"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
