export default function Card({ title, value }) {
  return (
    <div style={{
      background: '#111',
      border: '1px solid var(--neon-blue)',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h3>{title}</h3>
      <strong>{value}</strong>
    </div>
  )
}