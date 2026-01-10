import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

// --- Spotlight Wrapper ---
function SpotlightWrapper({ children, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-white/10 bg-[#0A0A0A] overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// --- Circular Progress ---
const CircularProgress = ({ level }) => {
  // FORCE NUMBER: If level is "90%", parseInt makes it 90. If undefined, it becomes 0.
  const safeLevel = parseInt(level) || 0; 
  
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(safeLevel), 500)
    return () => clearTimeout(timer)
  }, [safeLevel])

  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-800" />
        <circle
          cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={isNaN(strokeDashoffset) ? circumference : strokeDashoffset}
          strokeLinecap="round"
          className="text-purple-500 transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-slate-300">{progress}%</span>
    </div>
  )
}

const SkillCard = ({ skill }) => {
  // 1. SAFETY CHECK: If skill is undefined, return nothing (don't crash)
  if (!skill) return null;

  // 2. DEFAULTS: If properties are missing, use defaults
  const name = skill.name || 'Skill';
  const level = skill.level || 50;
  const icon = skill.icon || '⚡'; 

  return (
    <SpotlightWrapper className="rounded-2xl h-full p-5 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl shadow-inner text-slate-200">
           {/* Render icon directly since it's likely a string/emoji now */}
           {icon}
        </div>
        <CircularProgress level={level} />
      </div>

      <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{name}</h3>
      
      <div className="flex items-center gap-2 mt-3">
         <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] uppercase tracking-wider text-slate-500 font-bold border border-white/5">
           {parseInt(level) >= 90 ? 'Expert' : parseInt(level) >= 70 ? 'Advanced' : 'Intermediate'}
         </span>
      </div>
    </SpotlightWrapper>
  )
}

export default SkillCard