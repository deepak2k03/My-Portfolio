import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'dark'
  })

  // Sync theme with HTML class (Standard React Way)
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = async (event) => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    // 1. Fallback: If browser doesn't support View Transitions, just switch
    if (!document.startViewTransition || !event) {
      setTheme(newTheme)
      return
    }

    // 2. Get click coordinates
    const x = event.clientX
    const y = event.clientY

    // 3. Calculate radius to cover the screen
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // 4. Start the transition
    const transition = document.startViewTransition(() => {
      // A. Update React State
      setTheme(newTheme)
      
      // B. FORCE DOM UPDATE INSTANTLY (The Fix)
      // We manually toggle the class here so the browser sees the change immediately
      const root = document.documentElement
      root.classList.remove(theme)
      root.classList.add(newTheme)
    })

    // 5. Run the animation
    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}