export default function Topbar() {
  return (
    <header style={{
      height: '60px',
      background: 'var(--bg-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '1px solid #1e293b'
    }}>
      <input
        placeholder="Buscar..."
        style={{
          background: '#020617',
          border: 'none',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px'
        }}
      />

      <div>Admin</div>
    </header>
  )
}
