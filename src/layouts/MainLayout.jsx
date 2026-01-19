import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
