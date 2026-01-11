import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Github, ExternalLink, Layers, 
  Cpu, Code2, CheckCircle2, Terminal, Globe 
} from 'lucide-react'
import { getProjectById } from '../data/projectsData'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const foundProject = getProjectById(id)
    if (foundProject) {
      setProject(foundProject)
    } else {
      navigate('/projects') 
    }
  }, [id, navigate])

  if (!project) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-200 selection:bg-purple-500/30 font-sans transition-colors duration-300">
      
      {/* Background FX */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-32 pb-12 relative z-10 max-w-6xl">
        
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <div className="p-2 rounded-full border border-slate-200 bg-white dark:bg-white/5 dark:border-white/5 group-hover:border-purple-500/30 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-mono text-sm uppercase tracking-wider">Back_To_Base</span>
        </motion.button>

        {/* 🟢 MOVED: Title & Category (Top Center) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-purple-600 dark:text-purple-400 font-mono inline-block border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/5 px-4 py-1.5 rounded-full">
            {project.tagline || project.category || "Full Stack Application"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hero Image Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group shadow-xl dark:shadow-purple-900/10">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                 <div className="aspect-video bg-slate-100 dark:bg-[#0A0A0A] flex items-center justify-center relative">
                    {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        />
                    ) : (
                        <Terminal size={64} className="text-slate-300 dark:text-white/10" />
                    )}
                 </div>
              </div>
            </motion.div>

            {/* Project Story */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="prose prose-lg max-w-none text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                <Layers className="text-purple-600 dark:text-purple-400" size={24} /> Mission Brief
              </h3>
              <p>{project.longDescription || project.description}</p>
            </motion.div>

            {/* Core Features */}
            {project.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                  <Cpu className="text-blue-600 dark:text-blue-400" size={24} /> Core Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] flex items-start gap-3 hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-none">
                      <CheckCircle2 className="text-purple-600 dark:text-purple-500 shrink-0 mt-1" size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Sidebar (Sticky) */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="sticky top-32 space-y-8" 
            >
              
              {/* Visiting Links */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0F0F0F]/50 backdrop-blur-md shadow-lg dark:shadow-none">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Globe size={16} /> Visiting Links
                </h4>
                
                <div className="flex flex-col gap-4">
                  {/* Link 1: Live Demo */}
                  {project.liveDemo && (
                    <a 
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-500/20"
                    >
                      <ExternalLink size={18} /> Visit Live Site
                    </a>
                  )}
                  
                  {/* Link 2: Github */}
                  {project.githubRepo && (
                    <a 
                      href={project.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors"
                    >
                      <Github size={18} /> View Source Code
                    </a>
                  )}

                  {!project.liveDemo && !project.githubRepo && (
                     <div className="text-center text-slate-500 text-sm py-2">
                        Links private or in progress.
                     </div>
                  )}
                </div>
              </div>

              {/* Tech Stack Section */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] shadow-lg dark:shadow-none">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Code2 size={16} /> Tech Arsenal
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack && project.techStack.length > 0 ? (
                    project.techStack.map((t, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors cursor-default"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">No tech stack listed.</span>
                  )}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail