import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects, getAllCategories } from '../data/projectsData'
import { ArrowUpRight, Github, Code2, Monitor, Layers, Cpu } from 'lucide-react'

// --- 1. 3D TILT PREVIEW CARD (Optimized Size) ---
const TiltPreview = ({ activeProject }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Physics configuration
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"])

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    x.set((clientX - left) / width - 0.5)
    y.set((clientY - top) / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    // 🟢 FIX 1: Increased height to 600px for better visibility
    <div className="hidden lg:flex sticky top-24 h-[580px] w-full items-center justify-center pl-8 perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-[2.5rem] bg-[#0F0F0F] border border-white/10 shadow-2xl overflow-hidden group"
      >
        {/* Dynamic Background Glow */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Content Container */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.95, z: -50 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Image Section - 🟢 FIX 2: Increased height ratio to 65% */}
            <div className="relative h-[65%] w-full overflow-hidden bg-black/40 p-8 flex items-center justify-center">
               {activeProject.image ? (
                 <motion.img 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   src={activeProject.image} 
                   alt={activeProject.title} 
                   // Image is fully contained and has a nice border
                   className="w-full h-full object-contain drop-shadow-2xl relative z-10 border-2 border-white/10 rounded-lg bg-[#050505]"
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center opacity-20">
                    <Monitor size={80} />
                 </div>
               )}
               
               {/* Subtle reflection/gradient behind the image */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-0" />
            </div>

            {/* Info Section */}
            <div className="flex-1 p-8 flex flex-col justify-between relative z-10 bg-[#0F0F0F] border-t border-white/5">
               <div>
                  <div className="flex justify-between items-start mb-3">
                     <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-purple-300">
                        {activeProject.category}
                     </span>
                     {activeProject.githubRepo && (
                       <a href={activeProject.githubRepo} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors">
                          <Github size={20} />
                       </a>
                     )}
                  </div>
                  <h2 className="text-3xl font-black text-white leading-none mb-3">{activeProject.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                     {activeProject.description}
                  </p>
               </div>

               {/* Tech Stack */}
               <div className="flex flex-wrap gap-2 mt-2">
                  {activeProject.techStack?.slice(0, 4).map(tech => (
                     <span key={tech} className="px-2 py-1 rounded bg-black border border-white/10 text-[10px] text-slate-300 font-mono">
                        {tech}
                     </span>
                  ))}
                  {activeProject.techStack?.length > 4 && (
                     <span className="px-2 py-1 text-[10px] text-slate-500">+{activeProject.techStack.length - 4}</span>
                  )}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// --- 2. MAGNETIC LIST ITEM (The Left Side) ---
const ProjectListItem = ({ project, isActive, onHover, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={onHover}
      className={`group relative w-full cursor-pointer py-8 border-b border-dashed border-slate-200 dark:border-white/10 last:border-0 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-100 lg:opacity-40 lg:hover:opacity-100'}`}
    >
      {/* Active Indicator Line */}
      {isActive && (
         <motion.div 
           layoutId="activeLine"
           className="absolute left-[-20px] top-8 bottom-8 w-[3px] bg-purple-600 rounded-full hidden lg:block"
         />
      )}

      <div className="flex flex-col gap-4 pl-2">
        {/* Top Row: ID & Title */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-6">
              <span className={`text-xs font-mono transition-colors ${isActive ? 'text-purple-500 font-bold' : 'text-slate-400'}`}>
                0{project.id}
              </span>
              <h3 className={`text-2xl md:text-3xl font-bold transition-all duration-300 ${isActive ? 'text-slate-900 dark:text-white translate-x-2' : 'text-slate-600 dark:text-slate-400'}`}>
                {project.title}
              </h3>
           </div>
           
           {/* Mobile Arrow */}
           <div className={`lg:hidden transition-transform ${isActive ? 'rotate-45 text-purple-500' : 'text-slate-500'}`}>
              <ArrowUpRight size={20} />
           </div>
        </div>

        {/* MOBILE ONLY IMAGE */}
        <div className="block lg:hidden w-full h-56 rounded-2xl overflow-hidden my-2 shadow-lg bg-slate-100 dark:bg-white/5">
            {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Code2 className="opacity-20" />
                </div>
            )}
        </div>

        {/* Description & Action (Animates height) */}
        <motion.div 
            initial={false}
            animate={{ 
                height: isActive ? 'auto' : 0,
                opacity: isActive ? 1 : 0
            }}
            className="overflow-hidden"
        >
            <p className="text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed mb-4 pl-10 lg:block hidden">
                {project.description}
            </p>
            
            {/* Mobile Tags */}
            <div className="flex lg:hidden flex-wrap gap-2 mb-4">
                {project.techStack?.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/5">
                    {tech}
                  </span>
                ))}
            </div>

            <div className="flex items-center gap-2 pl-10 text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform">
                View Case Study <ArrowUpRight size={14} />
            </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// --- 3. MAIN PAGE ---
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || 1)
  const navigate = useNavigate()
  const allCategories = getAllCategories()

  const filteredProjects = projects.filter(p => 
    selectedCategory === 'All' ? true : p.category === selectedCategory
  )
  const activeProject = projects.find(p => p.id === activeProjectId) || filteredProjects[0] || projects[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white relative transition-colors duration-300 font-sans selection:bg-purple-500/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* Header Section */}
        <div className="mb-8 space-y-8">
             <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-purple-600 dark:text-purple-400 mb-4">
                    <Layers size={12} />
                    <span>PORTFOLIO_INDEX</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                   Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Works.</span>
                 </h1>
             </div>

             {/* Glass Dock Filter */}
             <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-white/50 dark:bg-[#111]/50 backdrop-blur-md border border-slate-200 dark:border-white/10 w-fit">
                 {allCategories.map(cat => {
                    const isActive = selectedCategory === cat;
                    return (
                        <button
                           key={cat}
                           onClick={() => setSelectedCategory(cat)}
                           className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                              isActive ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                           }`}
                        >
                           {isActive && (
                              <motion.div 
                                 layoutId="activeFilter"
                                 className="absolute inset-0 bg-slate-900 dark:bg-white/10 rounded-lg shadow-sm"
                                 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                           )}
                           <span className="relative z-10">{cat}</span>
                        </button>
                    )
                 })}
             </div>
        </div>

        {/* --- SPLIT LAYOUT --- */}
        {/* --- SPLIT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Project List (Scrollable) */}
          {/* 🟢 FIX: Added 'min-h-[150vh]' to force the column to be tall enough 
              for the sticky effect to work even with only 1 project. */}
          <div className="w-full lg:w-5/12 pb-20 min-h-[150vh]">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  isActive={activeProjectId === project.id}
                  onHover={() => setActiveProjectId(project.id)}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl text-slate-400">
                    <Cpu size={32} className="mx-auto mb-4 opacity-50" />
                    <p>No projects found in this category.</p>
                </div>
            )}
          </div>

          {/* RIGHT: Sticky 3D Preview */}
          <div className="hidden lg:block lg:w-7/12 relative">
             <TiltPreview activeProject={activeProject} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Projects