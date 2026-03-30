import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

const TiltCard = ({ children, className = "", depth = 20 }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 ${className}`}
    >
      <div style={{ transform: `translateZ(${depth}px)` }}>
        {children}
      </div>
    </motion.div>
  )
}

export default TiltCard
