export default function Card({ titulo, valor, cor = '#1e90ff', icone }) {
  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #0b1220, #0f1a33)',
        borderRadius: '16px',
        padding: '22px',
        color: '#fff',
        boxShadow: `0 0 20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
        transition: 'all 0.3s ease',
        cursor: 'default'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.7), 0 0 12px ${cor}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow =
          '0 0 20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: cor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          {icone}
        </div>

        <span style={{ fontSize: '15px', opacity: 0.8 }}>{titulo}</span>
      </div>

      <div
        style={{
          marginTop: '16px',
          fontSize: '32px',
          fontWeight: 'bold',
          color: cor
        }}
      >
        {valor}
      </div>
    </div>
  )
}

