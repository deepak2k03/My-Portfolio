import { motion } from 'framer-motion'
import { socialLinks } from '../../data/staticData'

const SocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Connect With Me
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {link.icon}
            </span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                {link.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

export default SocialLinks