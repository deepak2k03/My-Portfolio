import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { 
  ArrowLeft, Github, ExternalLink, Layers, 
  Cpu, Code2, CheckCircle2, Zap, Globe, Calendar, User, ArrowUpRight 
} from 'lucide-react'
import { getProjectById } from '../data/projectsData'

// --- 3D Gyroscopic Tilt Component ---
const TiltCard = ({ children }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    // Calculate tilt based on mouse position
    x.set((clientX - left) / width - 0.5)
    y.set((clientY - top) / height - 0.5)
  }

  return (
    <motion.div
      style={{
        rotateY: useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]),
        rotateX: useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="perspective-1000 w-full cursor-pointer"
    >
      <div className="transition-transform duration-200 ease-out">
         {children}
      </div>
    </motion.div>
  )
}

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  
  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    window.scrollTo(0, 0)
    const foundProject = getProjectById(id)
    if (foundProject) setProject(foundProject)
    else navigate('/projects') 
  }, [id, navigate])

  if (!project) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white font-sans transition-colors duration-500 selection:bg-purple-500/30">
      
      {/* Top Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Texture */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 md:px-12 pt-28 pb-12 md:py-20 relative z-10 max-w-[1800px]">
        
        {/* Navigation Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-16"
        >
            <button 
                onClick={() => navigate(-1)}
                className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-500 dark:hover:border-purple-500/50 transition-all shadow-sm hover:shadow-md"
            >
                <ArrowLeft size={18} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                    {project.category}
                </span>
            </div>
        </motion.div>

        {/* --- SPLIT LAYOUT (Content Left | Image Right) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* LEFT COLUMN: Scrollable Content */}
            <div className="order-2 lg:order-1 space-y-16 pb-24">
                
                {/* 1. Title & Intro */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                        {project.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {project.longDescription || project.description}
                    </p>
                </motion.div>

                {/* 2. Metadata Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs font-bold uppercase tracking-wider">
                            <User size={14} /> Role
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">{project.role || "Lead Developer"}</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs font-bold uppercase tracking-wider">
                            <Calendar size={14} /> Timeline
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">{project.duration || "2024"}</div>
                    </div>
                </div>

                {/* 3. Tech Stack */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <Layers size={16} /> Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech, i) => (
                            <motion.span 
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                                className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors cursor-default shadow-sm dark:shadow-none"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* 4. Features List */}
                {project.features && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <Zap size={24} className="text-amber-500" /> Key Features
                        </h3>
                        <div className="space-y-4">
                            {project.features.map((feature, i) => (
                                <div 
                                    key={i}
                                    className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-purple-500/30 transition-all group hover:bg-slate-50 dark:hover:bg-white/10"
                                >
                                    <div className="mt-1 min-w-[20px] text-slate-300 group-hover:text-purple-500 transition-colors">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Mobile Actions (Shown at bottom on Mobile) */}
                <div className="lg:hidden grid grid-cols-1 gap-4 pt-4">
                     {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noreferrer" className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2 shadow-lg">
                            <Globe size={18} /> Launch Project
                        </a>
                     )}
                </div>
            </div>


            {/* RIGHT COLUMN: Sticky Image Showcase */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-32">
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <TiltCard>
                        <div className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-purple-900/10 group">
                            
                            {/* Browser Header */}
                            <div className="h-10 bg-slate-100 dark:bg-[#1A1A1A] border-b border-slate-200 dark:border-white/5 flex items-center px-6 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="ml-4 flex-1 h-6 rounded-md bg-slate-200 dark:bg-black/20 flex items-center px-3 opacity-50">
                                    <span className="text-[10px] font-mono text-slate-500 truncate">
                                        {project.liveDemo ? new URL(project.liveDemo).host : 'https://localhost:3000'}
                                    </span>
                                </div>
                            </div>

                            {/* THE IMAGE (Full width, natural height) */}
                            <div className="relative bg-slate-50 dark:bg-black/50">
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-auto object-cover"
                                    />
                                ) : (
                                    <div className="w-full aspect-square flex items-center justify-center opacity-10">
                                        <Code2 size={64} />
                                    </div>
                                )}
                                {/* Gloss Shine Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </div>
                    </TiltCard>

                    {/* Quick Actions (Desktop Only) */}
                    <div className="hidden lg:grid grid-cols-2 gap-4 mt-8">
                        {project.liveDemo ? (
                            <a 
                                href={project.liveDemo} 
                                target="_blank" 
                                rel="noreferrer"
                                className="group flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl"
                            >
                                <Globe size={18} /> Visit Website
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        ) : (
                            <button disabled className="flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-400 font-bold cursor-not-allowed">
                                <Globe size={18} /> Demo Offline
                            </button>
                        )}

                        {project.githubRepo && (
                            <a 
                                href={project.githubRepo} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold transition-colors"
                            >
                                <Github size={18} /> Source Code
                            </a>
                        )}
                    </div>

                </motion.div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail