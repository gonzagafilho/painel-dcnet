import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const adminStorage = localStorage.getItem('admin')
    if (adminStorage) {
      setAdmin(JSON.parse(adminStorage))
    }
  }, [])

  function login(adminData, token) {
    localStorage.setItem('admin', JSON.stringify(adminData))
    localStorage.setItem('token', token)
    setAdmin(adminData)
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
