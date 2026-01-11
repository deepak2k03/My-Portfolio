import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Experience', path: '/experience' },
    { name: 'Interviews', path: '/interviews' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          // 🔴 FIX: Added white bg for light mode, kept dark for dark mode
          ? 'bg-white/80 dark:bg-[#020202]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsOpen(false)}
        >
          <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 group-hover:border-purple-500/50 transition-colors">
            <Terminal size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          {/* 🔴 FIX: Updated text gradient to be visible on white background */}
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-slate-600 dark:from-white dark:to-slate-400">
            Deepak<span className="text-purple-600 dark:text-purple-500">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-sm mr-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-nav"
                      className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm dark:shadow-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              )
            })}
          </div>
          
          <ThemeToggle />
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            // 🔴 FIX: Added white bg for mobile menu in light mode
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-[#020202]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10"
          >
            <div className="container-custom py-8 flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                        isActive 
                          ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' 
                          : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar