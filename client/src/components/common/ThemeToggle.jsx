import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  // 1. Initialize state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'light'
  })

  // 2. Apply the theme to the HTML tag whenever state changes
  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

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