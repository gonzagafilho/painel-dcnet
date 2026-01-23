import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Clientes', path: '/clientes' },
    { label: 'Atendimentos', path: '/atendimentos' },
    { label: 'Chatbot', path: '/chatbot' },
    { label: 'Relatórios', path: '/relatorios' },
    { label: 'Status do Servidor', path: '/status' }, // ✅ NOVO
    { label: 'Configurações', path: '/configuracoes' }
  ]

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
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: '10px',
              color: 'var(--muted)',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </div>
        ))}
      </nav>

      {/* 🔻 BOTÃO SAIR */}
      <button
        onClick={() => {
          logout()
          navigate('/login')
        }}
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
