import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import PrivateRoute from './routes/PrivateRoute'
import { useAuth } from './context/AuthContext'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Site from './pages/Site'
import Chatbot from './pages/Chatbot'
import Clientes from './pages/Clientes'
import Atendimentos from './pages/Atendimentos'
import Configuracoes from './pages/Configuracoes'
import Relatorios from './pages/Relatorios' // 👈 NOVO

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Routes>
      {/* ROTA PÚBLICA */}
      <Route path="/login" element={<Login />} />

      {/* ROTAS PROTEGIDAS */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div
              style={{
                display: 'flex',
                minHeight: '100vh',
                background: 'var(--bg-dark)',
                color: 'var(--text)'
              }}
            >
              <Sidebar />

              <div style={{ flex: 1 }}>
                <Header
                  onMenu={() => setMenuAberto(!menuAberto)}
                  onLogout={() => {
                    logout()
                    navigate('/login')
                  }}
                />

                <main
                  style={{
                    padding: '24px',
                    background: 'var(--bg-dark)',
                    minHeight: 'calc(100vh - 60px)'
                  }}
                >
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="site" element={<Site />} />
                    <Route path="chatbot" element={<Chatbot />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="atendimentos" element={<Atendimentos />} />
                    <Route path="relatorios" element={<Relatorios />} /> {/* 👈 NOVO */}
                    <Route path="configuracoes" element={<Configuracoes />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
