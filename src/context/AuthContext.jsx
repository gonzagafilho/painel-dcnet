import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export const AuthContext = createContext(null)

// 🔹 HOOK OFICIAL
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  async function login(email, senha) {
    try {
      const response = await api.post('/auth/login', {
        email,
        senha
      })

      const { token, admin } = response.data

      localStorage.setItem('token', token)
      setUser(admin)

      navigate('/dashboard')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Erro no login')
      } else {
        alert('Erro de conexão com o servidor')
      }
    }
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
