import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-surface relative">
      <div className="absolute -left-[200px] -top-[200px] w-[600px] h-[600px] rounded-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
      <div className="absolute -right-[200px] -bottom-[200px] w-[600px] h-[600px] rounded-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }} />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative z-[1]">
        <Outlet context={{ onOpenSidebar: () => setIsSidebarOpen(true) }} />
      </main>
    </div>
  )
}
