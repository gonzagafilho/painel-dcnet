import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  const token = localStorage.getItem('token')

  if (loading) {
    return null
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

