import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { interviewsAPI } from '../utils/api'
import { Calendar, Building2, Briefcase, Search, ArrowUpRight, Signal, Filter, Loader2, AlertCircle } from 'lucide-react'

// --- Difficulty Visualizer Component ---
const DifficultyMeter = ({ level }) => {
  const getLevel = () => {
    const l = level?.toLowerCase() || 'medium'
    if (l.includes('easy')) return 1
    if (l.includes('hard')) return 3
    return 2 // medium
  }
  
  const score = getLevel()
  
  return (
    <div className="flex items-center gap-1" title={`Difficulty: ${level}`}>
      {[1, 2, 3].map((bar) => (
        <div 
          key={bar} 
          className={`w-1.5 h-4 rounded-sm transition-colors ${
            bar <= score 
              ? score === 3 ? 'bg-red-500' : score === 2 ? 'bg-yellow-500' : 'bg-green-500'
              : 'bg-white/10'
          }`} 
        />
      ))}
      <span className="ml-2 text-xs font-mono text-slate-400 uppercase">{level}</span>
    </div>
  )
}

const Interviews = () => {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await interviewsAPI.getAll()
        setInterviews(res.data?.interviews || [])
      } catch (err) {
        console.error('[Interviews] fetch error:', err)
        setError('Unable to decrypt interview archives.')
      } finally {
        setLoading(false)
      }
    }
    fetchInterviews()
  }, [])

  // Filter Logic
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
    <div className="min-h-screen bg-[#020202] text-slate-50 py-24 relative overflow-hidden">
      
      {/* 1. Background Atmosphere (Matches Home/Contact) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header & Search Area */}
        <div className="flex flex-col items-center justify-center mb-16">
          <SectionHeader
            tag="Archives"
            title="Interview Logs"
            subtitle="Declassified experiences, system design discussions, and coding rounds."
            centered
          />
          
          {/* Glass Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-lg mt-8 group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search by company, role, or stack..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all shadow-xl shadow-black/20"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">
                CMD+K
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            <p className="font-mono text-sm animate-pulse">Decrypting Archives...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-400 gap-4">
            <AlertCircle className="w-10 h-10" />
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredInterviews.length === 0 && (
          <div className="text-center py-20">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6 text-slate-600" />
             </div>
             <p className="text-slate-400">No logs found matching your criteria.</p>
          </div>
        )}

        {/* --- THE DOSSIER GRID --- */}
        {!loading && filteredInterviews.length > 0 && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence>
              {filteredInterviews.map((interview, index) => (
                <motion.div
                  layout
                  key={interview._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => navigate(`/interviews/${interview._id}`)}
                  className="group relative cursor-pointer"
                >
                  {/* Card Container */}
                  <div className="h-full rounded-3xl bg-[#0A0A0A]/50 border border-white/10 p-1 hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300">
                    
                    <div className="relative h-full rounded-[1.3rem] bg-[#0F0F0F] p-6 overflow-hidden">
                      
                      {/* Top Row: Meta */}
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
                               <Building2 size={20} />
                            </div>
                            <div>
                               <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                                  {interview.company}
                               </h3>
                               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                  <Briefcase size={12} />
                                  <span>{interview.role}</span>
                               </div>
                            </div>
                         </div>

                         {/* Date Badge */}
                         {interview.date && (
                           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400">
                              <Calendar size={10} />
                              <span>{new Date(interview.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}</span>
                           </div>
                         )}
                      </div>

                      {/* Content Preview */}
                      <div className="mb-6">
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                           {interview.previewText || interview.detailedWriteup?.preparation || "No preview available for this experience."}
                        </p>
                      </div>

                      {/* Footer: Tags & Difficulty */}
                      <div className="flex items-end justify-between mt-auto border-t border-white/5 pt-4">
                         
                         <div className="flex flex-col gap-3">
                            {/* Difficulty Visualizer */}
                            <DifficultyMeter level={interview.difficulty} />
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                               {interview.tags?.slice(0, 3).map((tag, i) => (
                                  <span key={i} className="text-[10px] px-2 py-1 rounded bg-slate-800/50 text-slate-400 border border-white/5">
                                     #{tag}
                                  </span>
                               ))}
                               {interview.tags?.length > 3 && (
                                  <span className="text-[10px] px-2 py-1 text-slate-500">+{interview.tags.length - 3}</span>
                               )}
                            </div>
                         </div>

                         {/* Action Arrow */}
                         <div className="p-2 rounded-full bg-white/5 text-slate-400 group-hover:bg-purple-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                            <ArrowUpRight size={18} />
                         </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Interviews