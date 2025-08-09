import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  BarChartIcon,
  TagIcon,
  StarIcon,
  SettingsIcon,
  XIcon,
  FileTextIcon,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import ProgressBar from '../Components/ProgressBar/ProgressBar'
interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const { user } = useAppContext()
  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: HomeIcon,
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: StarIcon,
    },
    {
      name: 'Tags',
      path: '/tags',
      icon: TagIcon,
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: BarChartIcon,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: SettingsIcon,
    },
  ]
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16 z-10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 md:hidden">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Menu
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          {/* User profile summary */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt="User avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Level {user.level}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>XP: {user.xp}</span>
                <span>
                  {user.xp % 100}/{100} to next level
                </span>
              </div>
              <ProgressBar
                value={user.xp % 100}
                max={100}
                className="h-2 bg-gray-200 dark:bg-gray-700"
                barClassName="bg-indigo-500"
              />
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive(item.path) ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Recently edited */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Recently Edited
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                to="/note/note-1"
                className="block px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md truncate"
              >
                Getting Started with React
              </Link>
              <Link
                to="/note/note-5"
                className="block px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md truncate"
              >
                Meeting Notes: Q3 Planning
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
export default Sidebar
