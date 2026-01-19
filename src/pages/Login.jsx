import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', {
        email,
        senha
      })

      login(data.token, data.user)
      navigate('/')
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <span style={styles.logo}>DC</span>
          <h1 style={styles.title}>DC NET</h1>
        </div>

        <p style={styles.subtitle}>Painel Administrativo</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={styles.input}
            required
          />

          {erro && <div style={styles.error}>{erro}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.footer}>
          © {new Date().getFullYear()} DC NET
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-main)'
  },
  card: {
    width: '100%',
    maxWidth: '360px',
    background: 'var(--bg-card)',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid var(--border-soft)',
    boxShadow: '0 0 30px rgba(0,170,255,.15)',
    textAlign: 'center'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'var(--neon-blue)',
    color: '#000',
    fontWeight: 'bold'
  },
  title: {
    color: 'var(--text-main)',
    fontSize: '22px',
    letterSpacing: '1px'
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '14px',
    marginBottom: '24px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '14px',
    borderRadius: '6px',
    border: '1px solid var(--border-soft)',
    background: '#050b14',
    color: '#fff',
    outline: 'none',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    borderRadius: '6px',
    border: 'none',
    background:
      'linear-gradient(135deg, #00aaff, #0066ff)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    background: '#2a0f14',
    color: '#ff6b6b',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
    fontSize: '13px'
  },
  footer: {
    marginTop: '20px',
    fontSize: '12px',
    color: 'var(--text-muted)'
  }
}
