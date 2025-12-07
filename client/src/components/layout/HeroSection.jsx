import { motion } from 'framer-motion'
import { personalInfo, stats } from '../../data/staticData'
import StatsCard from './StatsCard'

const HeroSection = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Floating elements for background animation
  const floatingElements = [
    { id: 1, size: 'w-32 h-32', top: '10%', left: '10%', delay: '0s', duration: '6s' },
    { id: 2, size: 'w-24 h-24', top: '70%', left: '80%', delay: '2s', duration: '8s' },
    { id: 3, size: 'w-40 h-40', top: '20%', left: '60%', delay: '4s', duration: '7s' },
    { id: 4, size: 'w-20 h-20', top: '80%', left: '20%', delay: '1s', duration: '5s' },
    { id: 5, size: 'w-36 h-36', top: '50%', left: '50%', delay: '3s', duration: '9s' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg animate-gradient" />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating geometric shapes */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} floating-shape bg-white/10`}
          style={{
            top: element.top,
            left: element.left,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: parseFloat(element.duration),
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 container-custom">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-center text-white"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-xl md:text-2xl font-medium opacity-90">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 opacity-95"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90 px-4"
          >
            {personalInfo.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/projects'}
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open(personalInfo.resume, '_blank')}
            >
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <StatsCard stat={stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection