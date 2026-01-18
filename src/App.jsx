import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'

import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Site from './pages/Site.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Clientes from './pages/Clientes.jsx'
import Configuracoes from './pages/Configuracoes.jsx'

import { useState } from 'react'

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <Routes>
      {/* ROTA PÚBLICA */}
      <Route path="/login" element={<Login />} />

      {/* ROTAS PROTEGIDAS */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
              <Sidebar
                aberto={menuAberto}
                onClose={() => setMenuAberto(false)}
              />

              <div style={{ flex: 1 }}>
                <Header
                  onMenu={() => setMenuAberto(!menuAberto)}
                  onLogout={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                  }}
                />

                <div style={{ padding: '20px' }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/site" element={<Site />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route
                      path="/configuracoes"
                      element={<Configuracoes />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
