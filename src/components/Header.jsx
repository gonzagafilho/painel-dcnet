import '../styles/header.css'
export default function Header({ onLogout, onMenu }) {
  return (
    <header
      style={{
        height: '60px',
        background: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}
    >
      <button
        onClick={onMenu}
        style={{
          fontSize: '22px',
          background: 'transparent',
          border: 'none',
          color: 'var(--neon-blue)',
          cursor: 'pointer'
        }}
      >
        ☰
      </button>

      <strong>Painel Administrativo</strong>

      <button
        onClick={onLogout}
        style={{
          background: 'transparent',
          color: 'var(--neon-blue)',
          border: '1px solid var(--neon-blue)',
          padding: '6px 12px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </header>
  )
}
