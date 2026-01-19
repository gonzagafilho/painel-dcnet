export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      background: 'var(--bg-sidebar)',
      height: '100vh',
      padding: '20px'
    }}>
      <h2 style={{ color: 'var(--primary)' }}>DC NET</h2>

      <nav style={{ marginTop: '40px' }}>
        {['Dashboard','Clientes','Atendimentos','Chatbot','Relatórios','Configurações']
          .map(item => (
            <div key={item} style={{
              padding: '10px',
              color: 'var(--muted)',
              cursor: 'pointer'
            }}>
              {item}
            </div>
        ))}
      </nav>
    </aside>
  )
}
