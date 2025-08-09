import React from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import DarkModeToggle from '../Components/DarkModeToggle/DarkModeToggle'
interface NavbarProps {
  toggleSidebar: () => void
}
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user } = useAppContext()
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              NoteSync
            </span>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/new"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">New Note</span>
          </Link>
          <DarkModeToggle />
          <Link to="/stats" className="flex items-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt="User avatar"
                className="h-8 w-8 rounded-full border-2 border-indigo-500"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {user.level}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
export default Navbar
