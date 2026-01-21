import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const adminSalvo = localStorage.getItem('admin')

    if (token && adminSalvo) {
      setUser(JSON.parse(adminSalvo))
    }

    setLoading(false)
  }, [])

  async function login(email, senha) {
    const response = await api.post('/api/auth/login', {
      email,
      senha
    })

    const { token, admin } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('admin', JSON.stringify(admin))

    setUser(admin)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

