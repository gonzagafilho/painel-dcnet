import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const adminStorage = localStorage.getItem('admin')
    if (adminStorage) {
      setAdmin(JSON.parse(adminStorage))
    }
  }, [])

  // ✅ LOGIN REAL COM API
  async function login(email, senha) {
    const res = await api.post('/auth/login', {
      email,
      senha
    })

    // JWT REAL
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('admin', JSON.stringify({ email }))

    setAdmin({ email })
  }

  function logout() {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
