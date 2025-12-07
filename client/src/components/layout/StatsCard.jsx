import { motion } from 'framer-motion'

const StatsCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      }}
      className="glass-morphism rounded-xl p-4 md:p-6 text-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
    >
      <div className="text-3xl mb-3">{stat.icon}</div>
      <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
      <div className="text-sm md:text-base opacity-90">{stat.label}</div>
    </motion.div>
  )
}

export default StatsCard