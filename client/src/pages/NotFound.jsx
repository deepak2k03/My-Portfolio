import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    // 🟢 FIX: Main Background & Text Color
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* 🟢 FIX: Adaptive Gradient Text */}
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 🟢 FIX: Text Colors */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* 🟢 FIX: Button Styles */}
          <Link
            to="/"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Go Home
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 border border-slate-300 dark:border-purple-500/50 text-slate-700 dark:text-purple-400 bg-white dark:bg-transparent rounded-lg hover:bg-slate-50 dark:hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Animated illustration */}
        <motion.div
          className="mt-16"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="text-8xl animate-bounce filter drop-shadow-2xl">🚀</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound