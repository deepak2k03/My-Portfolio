import { useState, useRef, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader' // Keep your header
import ProjectCard from '../components/projects/ProjectCard' // Keep your card
import { projects, getAllCategories } from '../data/projectsData'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'

// --- 1. Spotlight Effect Component ---
// This handles the "flashlight" effect following the mouse
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-slate-800 bg-slate-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* The Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* The Content */}
      <div className="relative h-full">{children}</div>
    </div>
  )
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const allCategories = getAllCategories()

  // Logic to sort: Featured first, then the rest
  const visibleProjects = projects.filter(p => 
    selectedCategory === 'All' ? true : p.category === selectedCategory
  ).sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1))

  return (
    <div className="min-h-screen bg-[#020202] text-white py-24 relative overflow-hidden">
      
      {/* 2. Global Noise Texture (Adds premium grit) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-2 text-purple-400 font-mono text-sm"
            >
              <Sparkles size={14} />
              <span>Dev_Portfolio_v2.0</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Work.</span>
            </h1>
            <p className="text-slate-400 max-w-md text-lg">
              A curation of digital products, experiments, and system designs.
            </p>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. The BENTO GRID Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
          
          {visibleProjects.map((project, index) => {
            // Determine size based on importance (Featured = Big)
            const isLarge = project.featured && index < 2; 
            
            return (
              <SpotlightCard
                key={project.id}
                className={`rounded-3xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
                }`}
              >
                <div className="h-full flex flex-col p-6 relative z-10 group">
                  
                  {/* Image/Preview Area */}
                  <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 mb-4 overflow-hidden relative">
                    {/* Placeholder for Project Image - Use real <img> here */}
                    <div className="absolute inset-0 bg-slate-800/50 group-hover:scale-105 transition-transform duration-500" />
                     {/* If you have images: <img src={project.img} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" /> */}
                    
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-300">
                      {project.category}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className={`font-bold text-slate-100 mb-1 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <a href="#" className="p-3 rounded-full bg-white/10 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-500">
                      <ArrowUpRight size={isLarge ? 24 : 18} />
                    </a>
                  </div>

                  {/* Tech Stack (Only visible on hover or large cards) */}
                  <div className="mt-4 flex gap-2 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
                    {project.techStack?.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </SpotlightCard>
            )
          })}
          
          {/* Decorative Filler Card (Optional - adds to the 'Grid' aesthetic) */}
          <SpotlightCard className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-slate-900/20 border-dashed border-slate-800">
            <div className="text-center text-slate-600">
              <p className="text-xs uppercase tracking-widest mb-2">More Coming Soon</p>
              <div className="w-8 h-8 rounded-full border border-slate-700 border-t-purple-500 animate-spin mx-auto" />
            </div>
          </SpotlightCard>

        </div>
      </div>
    </div>
  )
}

export default Projects