import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// Removed unused imports (Link, getFeaturedProjects, ProjectCard)
import HeroSection from '../components/layout/HeroSection'
import { skillsCategories } from '../data/skillsData'
import { 
  Code2, Layers, Terminal, Zap, Hash, Database, Cpu, Globe, Server, 
  Atom, Smartphone, Cloud, Layout, Shield
} from 'lucide-react'

const Home = () => {
  // Parallax Setup
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  // --- DATA PREP ---
  // Smart Icon Mapping Helper
  const getSkillIcon = (name) => {
    const n = name.toLowerCase()
    if (n.includes('react') || n.includes('next')) return Atom
    if (n.includes('node') || n.includes('express')) return Server
    if (n.includes('data') || n.includes('mongo') || n.includes('sql')) return Database
    if (n.includes('js') || n.includes('ts') || n.includes('python')) return Code2
    if (n.includes('cloud') || n.includes('aws')) return Cloud
    if (n.includes('design') || n.includes('ui') || n.includes('css')) return Layout
    if (n.includes('security') || n.includes('auth')) return Shield
    if (n.includes('app') || n.includes('native')) return Smartphone
    return Terminal // Default
  }

  const allSkills = skillsCategories.flatMap(cat => cat.skills)
  // Split into 3 rows for a denser, more impressive "Wall of Tech"
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 3))
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 3), Math.ceil(allSkills.length * 2 / 3))
  const row3 = allSkills.slice(Math.ceil(allSkills.length * 2 / 3))

  // --- COMPONENT: TECH BADGE ---
  const TechBadge = ({ name }) => {
    const Icon = getSkillIcon(name)
    return (
      <motion.div 
        whileHover={{ scale: 1.05, y: -2 }}
        className="relative flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A] hover:bg-slate-50 dark:hover:bg-[#111] hover:border-purple-300 dark:hover:border-purple-500/40 transition-colors group cursor-default shadow-sm dark:shadow-lg dark:shadow-black/20"
      >
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
        
        {/* Icon Box */}
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/10 transition-colors">
          <Icon size={18} />
        </div>
        
        {/* Text */}
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white tracking-wide">
          {name}
        </span>
      </motion.div>
    )
  }

  // --- COMPONENT: INFINITE SCROLL ROW ---
  const InfiniteRow = ({ items, direction = "left", speed = 25 }) => {
    return (
      // Added 'py-2' to create vertical space for the hover animation
      <div className="flex overflow-hidden group mask-linear-fade py-2">
        <motion.div 
          className="flex gap-4 pr-4"
          initial={{ x: direction === "left" ? 0 : "-50%" }}
          animate={{ x: direction === "left" ? "-50%" : 0 }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: speed,
          }}
        >
          {[...items, ...items, ...items, ...items].map((skill, i) => (
            <TechBadge key={`${skill.name}-${i}`} name={skill.name} />
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white font-sans overflow-hidden selection:bg-purple-500/30 transition-colors duration-300">
      
      {/* Background FX (Matching Projects Page) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <motion.div style={{ y: y1 }} className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <motion.div style={{ y: y2 }} className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        
        <HeroSection />

        {/* --- UPGRADED TECH STREAM SECTION --- */}
        <div className="py-24 relative overflow-hidden">
          {/* Using global background grid now instead of localized grid overlay */}

          {/* Section Label */}
          <div className="container-custom mb-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-500/20 bg-purple-100 dark:bg-purple-500/5 text-purple-600 dark:text-purple-400 text-xs font-mono uppercase tracking-[0.2em]"
            >
              <Cpu size={14} />
              <span>Core_Stack_V.2.0</span>
            </motion.div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-500">
              Technologies & Tools
            </h2>
          </div>

          {/* The Stream Container */}
          <div className="space-y-6 relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">

            {/* Row 1: Fast Left */}
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-500">
              <InfiniteRow items={row1} direction="left" speed={40} />
            </div>

            {/* Row 2: Slow Right (The "Hero" Row) */}
            <div className="opacity-100 hover:z-10 relative scale-110 origin-center py-2">
               {/* This row is slightly larger to create depth perception */}
              <InfiniteRow items={row2} direction="right" speed={50} />
            </div>

            {/* Row 3: Fast Left */}
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-500">
              <InfiniteRow items={row3} direction="left" speed={45} />
            </div>
          </div>
          
        </div>
        {/* --- END UPGRADE --- */}

      </div>
    </div>
  )
}

export default Home