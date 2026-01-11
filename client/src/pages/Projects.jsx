import { useState, useRef, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useNavigate } from 'react-router-dom' // 👈 1. Import Hook
import SectionHeader from '../components/common/SectionHeader'
import { projects, getAllCategories } from '../data/projectsData'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'

// --- 1. Spotlight Effect Component ---
// Added 'onClick' prop so the card can handle clicks
function SpotlightCard({ children, className = "", onClick }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      // 🟢 FIX: Adaptive Card Background & Border
      className={`group relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick} // 👈 2. Attach Click Handler
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
  const navigate = useNavigate() // 👈 3. Initialize Hook
  const allCategories = getAllCategories()

  // Logic to sort: Featured first, then the rest
  const visibleProjects = projects.filter(p => 
    selectedCategory === 'All' ? true : p.category === selectedCategory
  ).sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1))

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`) // 👈 4. Navigate to Detail Page
  }

  return (
    // 🟢 FIX: Main Background & Text Color
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-white py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* 2. Global Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* Background Grid Pattern - Adaptive Opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              // 🟢 FIX: Label Color
              className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-mono text-sm"
            >
              <Sparkles size={14} />
              <span>Dev_Portfolio_v2.0</span>
            </motion.div>
            {/* 🟢 FIX: Heading Color */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">Work.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-md text-lg">
              A curation of digital products, experiments, and system designs.
            </p>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                // 🟢 FIX: Adaptive Button Styles
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white'
                    : 'bg-transparent text-slate-600 border-slate-300 hover:bg-slate-100 dark:text-slate-500 dark:border-slate-800 dark:hover:border-slate-600 dark:hover:text-white dark:hover:bg-transparent'
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
                onClick={() => handleProjectClick(project.id)} // 👈 5. Pass click event
                className={`rounded-3xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
                }`}
              >
                <div className="h-full flex flex-col p-6 relative z-10 group">
                  
                  {/* Image/Preview Area */}
                  <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800/50 dark:to-slate-900/50 mb-4 overflow-hidden relative">
                    {/* Image Handling */}
                    {/* 🟢 FIX: Overlay Opacity */}
                    <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 group-hover:bg-slate-800/0 transition-colors duration-500 z-10" />
                    {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-900/20 dark:to-blue-900/20" />
                    )}
                    
                    {/* 🟢 FIX: Category Tag */}
                    <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
                      {project.category}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex items-end justify-between">
                    <div>
                      {/* 🟢 FIX: Title Color */}
                      <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-1 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Action Arrow */}
                    {/* 🟢 FIX: Arrow Colors */}
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white">
                      <ArrowUpRight size={isLarge ? 24 : 18} />
                    </div>
                  </div>

                  {/* Tech Stack (Only visible on hover) */}
                  <div className="mt-4 flex gap-2 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
                    {project.techStack?.slice(0, 3).map(tech => (
                      // 🟢 FIX: Pill Colors
                      <span key={tech} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </SpotlightCard>
            )
          })}
          
          {/* Decorative Filler Card */}
          {/* 🟢 FIX: Filler Card Styles */}
          <SpotlightCard className="md:col-span-1 md:row-span-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/20 border-dashed border-slate-300 dark:border-slate-800">
            <div className="text-center text-slate-400 dark:text-slate-600">
              <p className="text-xs uppercase tracking-widest mb-2">More Coming Soon</p>
              <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 border-t-purple-500 animate-spin mx-auto" />
            </div>
          </SpotlightCard>

        </div>
      </div>
    </div>
  )
}

export default Projects