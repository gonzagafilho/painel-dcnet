import Card from '../components/Card.jsx'

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
    <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    marginTop: '24px'
  }}
>
  <Card titulo="Clientes" valor="128" />
  <Card titulo="Atendimentos Hoje" valor="23" />
  <Card titulo="Vendas do Mês" valor="R$ 4.580" />
  <Card titulo="Status do Sistema" valor="Online" />
</div>  
    </>
  )
}
