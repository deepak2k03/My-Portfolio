import { motion } from 'framer-motion'

const SectionHeader = ({ title, subtitle, centered = false }) => {
  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`${centered ? 'text-center' : ''}`}
    >
      <motion.h2
        variants={textVariants}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeader