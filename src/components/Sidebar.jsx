export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      background: 'var(--bg-sidebar)',
      height: '100vh',
      padding: '20px'
    }}>
      <h2 style={{ color: 'var(--neon-blue)' }}>DC NET</h2>

      <nav style={{ marginTop: '30px' }}>
        <p>Dashboard</p>
        <p>Site</p>
        <p>Chatbot</p>
        <p>Clientes</p>
        <p>Configurações</p>
      </nav>
    </aside>
  )
}
