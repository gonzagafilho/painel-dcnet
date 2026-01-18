import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setErro('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          senha
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.message || 'Erro ao fazer login')
        setLoading(false)
        return
      }

      // salva token e usuário
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // mantém o fluxo que você já tinha
      onLogin()

    } catch (err) {
      setErro('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-main)'
      }}
    >
      <div
        style={{
          width: '320px',
          padding: '30px',
          background: 'var(--bg-card)',
          borderRadius: '8px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Login DC NET
        </h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px'
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px'
          }}
        />

        {erro && (
          <p style={{ color: 'red', marginBottom: '10px' }}>
            {erro}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            background: 'var(--neon-blue)',
            border: 'none',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  )
}
