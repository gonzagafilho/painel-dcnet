export default function DashboardSkeleton() {
  return (
    <div style={{ padding: '24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}
      >
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              height: '100px',
              borderRadius: '12px',
              background:
                'linear-gradient(90deg,#020617 25%,#0f172a 37%,#020617 63%)',
              animation: 'pulse 1.5s infinite'
            }}
          />
        ))}
      </div>
    </div>
  )
}
