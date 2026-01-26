import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects, getAllCategories } from '../data/projectsData'
import { ArrowUpRight, Github, ExternalLink, Code2, Monitor } from 'lucide-react'

// --- 1. The Sticky Preview Window (Right Side - Desktop Only) ---
// 🔒 Locked to 'hidden lg:block' so it vanishes on mobile as intended
const PreviewWindow = ({ activeProject }) => {
  return (
    <div className="hidden lg:block sticky top-28 h-[550px] w-full pl-8">
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0F0F0F] shadow-2xl transition-all duration-500">
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-white dark:from-slate-900 dark:to-black opacity-50" />
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-10 p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
               <span className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                 {activeProject.category}
               </span>
               <div className="flex gap-2">
                  {activeProject.githubRepo && (
                    <a href={activeProject.githubRepo} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white transition-colors text-slate-900 dark:text-white">
                        <Github size={18} />
                    </a>
                  )}
               </div>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[60%] mt-4">
              {activeProject.image ? (
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                   <Monitor size={64} />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {activeProject.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack?.slice(0, 4).map(tech => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// --- 2. The Interactive List Item (Smart Responsive) ---
const ProjectListItem = ({ project, isActive, onHover, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={onHover}
      className={`group relative w-full cursor-pointer py-8 border-b border-slate-200 dark:border-white/5 last:border-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-100 lg:opacity-50 lg:hover:opacity-80'}`}
    >
      <div className="flex flex-col gap-4">
        
        {/* Top Row: ID & Title */}
        <div className="flex items-center gap-4">
          <span className={`text-xs font-mono transition-colors ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
            0{project.id}
          </span>
          <h3 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'}`}>
            {project.title}
          </h3>
        </div>

        {/* 🟢 MOBILE ONLY IMAGE: Visible on small screens, Hidden on LG screens */}
        <div className="block lg:hidden w-full h-48 rounded-xl overflow-hidden my-2">
            {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                    <Code2 className="opacity-20" />
                </div>
            )}
        </div>

        {/* Description & Action (Animates on Desktop, Always visible on Mobile) */}
        <motion.div 
            initial={false}
            animate={{ 
                height: isActive ? 'auto' : 'auto', // Always auto on mobile, strict on desktop via CSS classes below
                opacity: 1 
            }}
            // On desktop, we hide description unless active. On mobile, we always show it.
            className={`overflow-hidden transition-all duration-500 ${isActive ? 'lg:max-h-40 lg:opacity-100' : 'lg:max-h-0 lg:opacity-0'}`}
        >
            <p className="text-slate-600 dark:text-slate-400 max-w-lg line-clamp-2 lg:pl-8 lg:border-l-2 lg:border-purple-600 lg:ml-1 mb-4">
                {project.description}
            </p>
            
            {/* Mobile Tech Stack */}
            <div className="flex lg:hidden flex-wrap gap-2 mb-4">
                {project.techStack?.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-500">
                    {tech}
                  </span>
                ))}
            </div>

            <div className="flex items-center gap-2 lg:ml-9 text-xs font-bold uppercase tracking-widest text-purple-600 group-hover:underline decoration-2 underline-offset-4">
                View Case Study <ArrowUpRight size={14} />
            </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// --- 3. Main Projects Page ---
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || 1)
  const navigate = useNavigate()
  const allCategories = getAllCategories()

  const filteredProjects = projects.filter(p => 
    selectedCategory === 'All' ? true : p.category === selectedCategory
  )
  const activeProject = projects.find(p => p.id === activeProjectId) || filteredProjects[0] || projects[0]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white relative transition-colors duration-300">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24">
        
        {/* Header Section */}
        <div className="mb-12 lg:mb-20">
             <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-sm mb-4">
                 <Code2 size={16} />
                 <span className="uppercase tracking-widest">Selected Works</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white">
               Some Featured Projects of Mine <span className="text-slate-400 dark:text-slate-600"></span>
             </h1>

             {/* Filter Tabs */}
             <div className="flex flex-wrap items-center gap-2">
                 <span className="mr-4 text-xs font-bold uppercase tracking-widest text-slate-400 hidden md:block">Filter by:</span>
                 {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        selectedCategory === cat 
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-lg' 
                          : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-400 dark:hover:border-white/30'
                      }`}
                    >
                      {cat}
                    </button>
                 ))}
             </div>
        </div>

        {/* --- SPLIT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT: Project List (Becomes Feed on Mobile) */}
          <div className="w-full lg:w-5/12 pb-20">
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
                <div className="py-12 border-t border-dashed border-slate-200 dark:border-white/10 text-slate-400">
                    No projects found in this category.
                </div>
            )}
          </div>

          {/* RIGHT: Sticky Preview Window (Hidden on Mobile) */}
          <div className="hidden lg:block lg:w-7/12 relative">
             <PreviewWindow activeProject={activeProject} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Projects