import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors relative overflow-hidden group"
      aria-label="Toggle Theme"
    >
      <div className="relative z-10">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </button>
  )
}

export default ThemeToggle