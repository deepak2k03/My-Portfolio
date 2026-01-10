import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/layout/HeroSection'
import SectionHeader from '../components/common/SectionHeader'
import { skillsCategories } from '../data/skillsData'
import { getFeaturedProjects } from '../data/projectsData'
import ProjectCard from '../components/projects/ProjectCard'
import { ArrowRight, Code2, Layers, Terminal, Zap, Hash, Database, Cpu, Globe, Server } from 'lucide-react'

// ... (Keep your existing SpotlightCard component here) ...
// ... (Keep your existing SpotlightCard component here) ...

const Home = () => {
  const featuredProjects = getFeaturedProjects()
  
  // Parallax Setup
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  // --- PREPARING DATA FOR THE STREAMS ---
  // We split skills into two arrays to create two opposite-moving rows
  const allSkills = skillsCategories.flatMap(cat => cat.skills).filter(s => s.level > 70)
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2))
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 2))

  // Helper for the Pill Design
  const SkillPill = ({ name, icon: Icon }) => (
    <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-colors group cursor-default">
      <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
        {Icon ? <Icon size={16} /> : <Hash size={16} />}
      </span>
      <span className="text-sm font-medium tracking-wide text-slate-300 font-mono">
        {name}
      </span>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-[#020202] text-slate-50 overflow-hidden selection:bg-purple-500/30">
      
      {/* Background Noise & Blobs (Keep existing code) */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <motion.div style={{ y: y1, x: -100 }} className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <motion.div style={{ y: y2, x: 100 }} className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        
        <HeroSection />

        {/* --- 3. THE UPGRADED "TECH HIGHWAY" --- */}
        <div className="py-20 relative space-y-8 overflow-hidden">
          
          {/* Gradient Masks for smooth fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-60 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-60 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

          {/* Label */}
          <div className="text-center mb-10 opacity-60">
             <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">
                Core Technologies
             </span>
          </div>

          {/* Row 1: Scrolling Left (Slower, elegant) */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-4 pr-4"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }} // Slower duration = more premium
            >
              {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
                <SkillPill key={`r1-${i}`} name={skill.name} icon={Code2} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Scrolling Right (Opposite direction) */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-4 pr-4"
              initial={{ x: "-50%" }}
              animate={{ x: 0 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 45 }} // Slightly different speed creates depth
            >
              {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
                <SkillPill key={`r2-${i}`} name={skill.name} icon={Database} />
              ))}
            </motion.div>
          </div>
          
        </div>
        {/* --- END UPGRADE --- */}

        {/* ... Rest of your sections (Bento Grid, Projects, etc.) ... */}
        
        {/* Bento Grid Metrics */}
        <section className="py-24 container-custom">
            {/* ... Keep existing Bento Grid code ... */}
        </section>

        {/* ... Keep rest of the file same ... */}

      </div>
    </div>
  )
}

export default Home