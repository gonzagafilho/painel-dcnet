import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    try {
      await login(email, senha)
      navigate('/')
    } catch (err) {
      setErro('Email ou senha inválidos')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: 'white'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '320px',
          padding: '24px',
          background: '#020617',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(0,0,0,0.6)'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Login DC NET</h2>

        {erro && (
          <p style={{ color: 'red', marginBottom: '10px' }}>{erro}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Entrar
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: 'none'
}

const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: 'none',
  background: '#2563eb', // ✅ CORRIGIDO
  color: 'white',
  cursor: 'pointer'
}
