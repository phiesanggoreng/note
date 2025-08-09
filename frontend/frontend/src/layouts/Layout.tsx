import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
interface LayoutProps {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 transition-all duration-200 ml-0 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
export default Layout


