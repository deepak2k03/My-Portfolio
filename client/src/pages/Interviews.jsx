import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { interviewsAPI } from '../utils/api'
import { 
  Building2, Briefcase, Search, ArrowUpRight, 
  Filter, Loader2, Terminal, Zap, Hash 
} from 'lucide-react'

// --- 1. The Holographic Spotlight Card ---
const SpotlightCard = ({ children, onClick, delay }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: delay }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="group relative border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
    >
      {/* The Spotlight Gradient Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Inner Content */}
      <div className="relative h-full p-6 z-20 flex flex-col">{children}</div>
    </motion.div>
  )
}

// --- 2. Neon Difficulty Badge ---
const DifficultyBadge = ({ level }) => {
  const getLevelColor = () => {
    const l = level?.toLowerCase() || 'medium'
    if (l.includes('easy')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    if (l.includes('hard')) return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
    return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  }

  const getIcon = () => {
      const l = level?.toLowerCase() || 'medium'
      if (l.includes('hard')) return <Zap size={10} fill="currentColor" />
      return <div className={`w-1.5 h-1.5 rounded-full ${l.includes('easy') ? 'bg-emerald-500' : 'bg-amber-500'}`} />
  }

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getLevelColor()}`}>
       {getIcon()}
       {level}
    </div>
  )
}

const Interviews = () => {
  const navigate = useNavigate()
  // 🟢 FIX 1: Initialize loading to TRUE. This prevents the "Error" state from flashing before the fetch starts.
  const [loading, setLoading] = useState(true) 
  const [interviews, setInterviews] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    // 🟢 FIX 2: Add an isMounted check to prevent race conditions during navigation
    let isMounted = true

    const fetchInterviews = async () => {
      try {
        // Only set loading if we are re-fetching, though with init=true this isn't strictly necessary, it's good practice.
        setError('') 
        
        console.log("Fetching interviews...") // Debug Log
        const res = await interviewsAPI.getAll()
        
        if (isMounted) {
            console.log("Interviews fetched:", res.data) // Debug Log
            setInterviews(res.data?.interviews || [])
            setLoading(false)
        }
      } catch (err) {
        console.error('[Interviews] fetch error:', err)
        if (isMounted) {
            setError('Unable to access the secure archives.')
            setLoading(false)
        }
      }
    }

    fetchInterviews()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array ensures this runs once on mount

  const filteredInterviews = useMemo(() => {
    return interviews.filter(item => {
      const query = search.toLowerCase()
      return (
        item.company?.toLowerCase().includes(query) ||
        item.role?.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })
  }, [interviews, search])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-slate-50 py-24 relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Background Matrix */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-mono mb-6"
          >
             <Terminal size={12} />
             <span>ENCRYPTED ARCHIVES_V2</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
             Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Logs.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400">
             A collection of declassified experiences, system design battles, and algorithmic conquests.
          </p>
        </div>

        {/* --- FLOATING COMMAND BAR --- */}
        <div className="sticky top-6 z-40 mb-12 flex justify-center">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-full max-w-xl p-2 rounded-2xl bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-purple-500/10 flex items-center gap-3"
           >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400">
                 <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search logs (e.g. 'Google', 'System Design')..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <div className="hidden md:flex items-center gap-1 pr-3">
                 <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-500 font-mono">CMD</kbd>
                 <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-500 font-mono">K</kbd>
              </div>
           </motion.div>
        </div>

        {/* --- LOADING & ERROR STATES --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            <span className="text-sm font-mono text-slate-500 animate-pulse">Decrypting data streams...</span>
          </div>
        )}
        
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 gap-2">
            <span className="text-lg font-bold">Connection Refused</span>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {!loading && !error && filteredInterviews.length === 0 && (
          <div className="text-center py-24 opacity-50">
             <Filter className="w-12 h-12 mx-auto mb-4 text-slate-400" />
             <p className="text-slate-500">No matching archives found.</p>
          </div>
        )}

        {/* --- THE HOLOGRAPHIC GRID --- */}
        {!loading && !error && filteredInterviews.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredInterviews.map((interview, index) => (
                <SpotlightCard 
                  key={interview._id} 
                  onClick={() => navigate(`/interviews/${interview._id}`)}
                  delay={index * 0.05} // Staggered entrance
                >
                    {/* Header: Company & Date */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {interview.company}
                                </h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                    <Briefcase size={10} />
                                    <span>{interview.role}</span>
                                </div>
                            </div>
                        </div>
                        {interview.date && (
                            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-mono font-bold text-slate-500 uppercase">
                                {new Date(interview.date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                            </span>
                        )}
                    </div>

                    {/* Body: Preview Text */}
                    <div className="flex-1 mb-6">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {interview.previewText || interview.detailedWriteup?.preparation || "Access encrypted log details..."}
                        </p>
                    </div>

                    {/* Footer: Meta & Action */}
                    <div className="flex flex-col gap-4 mt-auto">
                        
                        {/* Tags Row */}
                        <div className="flex flex-wrap gap-2">
                             <DifficultyBadge level={interview.difficulty} />
                             {interview.tags?.slice(0, 2).map((tag, i) => (
                                <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-full border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                   <Hash size={8} /> {tag}
                                </span>
                             ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-slate-100 dark:bg-white/5" />

                        {/* Bottom Action */}
                        <div className="flex items-center justify-between group/btn">
                             <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                Read Log
                             </span>
                             <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:-rotate-45">
                                <ArrowUpRight size={16} />
                             </div>
                        </div>
                    </div>
                </SpotlightCard>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default Interviews