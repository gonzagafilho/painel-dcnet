import '../styles/sidebar.css'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ aberto, onClose }) {
  return (
    <>
      {/* Fundo escuro ao abrir no mobile */}
      {aberto && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9
          }}
        />
      )}

      <aside
        className="sidebar"
        style={{
          left: aberto ? '0' : '-240px',
          transition: 'left 0.3s ease'
        }}
      >
        <h2 className="sidebar-title">DC NET</h2>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            Painel
          </NavLink>

          <NavLink
            to="/site"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            Site
          </NavLink>

          <NavLink
            to="/chatbot"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            Chatbot
          </NavLink>

          <NavLink
            to="/clientes"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            Clientes
          </NavLink>

          <NavLink
            to="/configuracoes"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            Configurações
          </NavLink>
        </nav>
      </aside>
    </>
  )
}
