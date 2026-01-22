export default function Sidebar() {
  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <aside
      style={{
        width: '240px',
        background: 'var(--bg-sidebar)',
        height: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2 style={{ color: 'var(--primary)' }}>DC NET</h2>

      <nav style={{ marginTop: '40px', flexGrow: 1 }}>
        {[
          'Dashboard',
          'Clientes',
          'Atendimentos',
          'Chatbot',
          'Relatórios',
          'Configurações'
        ].map((item) => (
          <div
            key={item}
            style={{
              padding: '10px',
              color: 'var(--muted)',
              cursor: 'pointer'
            }}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* 🔻 BOTÃO SAIR (SEMPRE VISÍVEL) */}
      <button
        onClick={logout}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ef4444',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '12px',
          textAlign: 'left'
        }}
      >
        ⏻ Sair
      </button>
    </aside>
  )
}

