import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('dcnet_token')
    const savedUser = localStorage.getItem('dcnet_user')

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setLoading(false)
  }, [])

  function login(token, userData) {
    localStorage.setItem('dcnet_token', token)
    localStorage.setItem('dcnet_user', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('dcnet_token')
    localStorage.removeItem('dcnet_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
