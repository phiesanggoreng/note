import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;