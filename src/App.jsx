import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}
pp
