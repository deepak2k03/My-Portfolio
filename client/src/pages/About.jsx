import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { personalInfo } from '../data/staticData'
import { User, Code, Cpu, Zap, Globe, Terminal, GraduationCap, Briefcase, Award, Sparkles } from 'lucide-react'

// --- 1. 3D Tilt Wrapper (Reused for consistency) ---
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// --- 2. Timeline Item Component ---
const EvolutionNode = ({ item, index, isLast }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 md:pl-0"
  >
    {/* Desktop: Alternate Sides Layout */}
    <div className={`md:flex items-center justify-between group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
       
       {/* Empty Spacer for Balance */}
       <div className="hidden md:block w-[50%]" />

       {/* The Node Dot (Center) */}
       <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 h-full flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-purple-500/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
             <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
          {!isLast && <div className="w-px h-full bg-gradient-to-b from-purple-500/50 to-transparent" />}
       </div>

       {/* The Content Card */}
       <div className={`md:w-[45%] mb-12 relative`}>
         <TiltCard>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all">
               <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                     {item.period}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{item.organization}</span>
               </div>
               <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
               <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
         </TiltCard>
       </div>

    </div>
  </motion.div>
)

const About = () => {
  const timeline = [
    {
      title: 'B.Tech in Information Technology',
      organization: 'University Name',
      period: '2021 – 2025',
      description: 'Final-year student mastering the fundamentals of CS. Focused on Data Structures, Algorithms, and System Architecture.',
    },
    {
      title: 'MERN Stack Evolution',
      organization: 'Self-taught / Projects',
      period: '2022 – Present',
      description: 'Transitioned from theory to practice. Built robust full-stack applications like "SkillSwap" and "DevDash" using React & Node.js.',
    },
    {
      title: 'Competitive Programming Arc',
      organization: 'CodeChef · LeetCode',
      period: '2021 – Present',
      description: 'Achieved 4★ on CodeChef and Knight rank on LeetCode. Solved 800+ problems to sharpen problem-solving reflexes.',
    },
  ]

  const highlightStats = [
    { label: 'Experience', value: '3+ Yrs', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Projects', value: '15+', icon: Terminal, color: 'text-purple-400' },
    { label: 'Problems', value: '800+', icon: Code, color: 'text-emerald-400' },
    { label: 'Stack', value: 'MERN', icon: Cpu, color: 'text-yellow-400' },
  ]

  const coreTech = ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Next.js', 'Tailwind', 'Git']

  return (
    <div className="min-h-screen bg-[#020202] text-slate-50 py-20 relative overflow-hidden">
      
      {/* Global Atmosphere */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        <SectionHeader
          tag="Profile"
          title="The Developer"
          subtitle="Decoding the person behind the code."
          centered
        />

        {/* --- SECTION 1: HOLOGRAPHIC ID & STATS HUD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 mb-24 items-start">
           
           {/* LEFT: ID CARD */}
           <div className="lg:col-span-5 relative">
              <TiltCard>
                 <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10 p-1 shadow-2xl">
                    
                    {/* Scanning Laser Effect */}
                    <motion.div 
                       className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-20 opacity-50"
                       animate={{ top: ['0%', '100%', '0%'] }}
                       transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    />
                    
                    <div className="bg-[#0F0F0F] rounded-[1.4rem] p-8 relative">
                       {/* ID Header */}
                       <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                          <div className="flex items-center gap-2">
                             <User size={16} className="text-purple-400" />
                             <span className="text-xs font-mono text-slate-500">ID: 8492-DEV</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                             <span className="text-xs font-bold text-emerald-500 tracking-wider">ONLINE</span>
                          </div>
                       </div>

                       {/* Bio Info */}
                       <div className="space-y-6">
                          <div>
                             <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Subject Name</p>
                             <h2 className="text-2xl font-bold text-white">{personalInfo.name}</h2>
                          </div>
                          
                          <div>
                             <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Class / Role</p>
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                                <Terminal size={14} /> {personalInfo.title}
                             </div>
                          </div>

                          <div>
                             <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Bio-Data</p>
                             <p className="text-sm text-slate-400 leading-relaxed">
                                Final-year B.Tech student obsessed with system architecture and pixel-perfect UIs. 
                                Currently leveling up in <span className="text-white font-medium">Full Stack Development</span> and 
                                <span className="text-white font-medium"> Competitive Programming</span>.
                             </p>
                          </div>
                       </div>

                       {/* Footer Decoder */}
                       <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-mono">
                          <span>LOC: INDIA</span>
                          <span>ENC: SHA-256</span>
                       </div>
                    </div>
                 </div>
              </TiltCard>
           </div>

           {/* RIGHT: STATS HUD & TECH */}
           <div className="lg:col-span-7 space-y-8">
              
              {/* 1. HUD Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {highlightStats.map((stat, i) => (
                    <motion.div 
                       key={stat.label}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 + (i * 0.1) }}
                       className="bg-[#0A0A0A] border border-white/10 p-4 rounded-2xl text-center group hover:border-purple-500/30 transition-colors"
                    >
                       <div className={`mx-auto w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${stat.color}`}>
                          <stat.icon size={20} />
                       </div>
                       <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
                       <p className="text-[10px] uppercase tracking-widest text-slate-500">{stat.label}</p>
                    </motion.div>
                 ))}
              </div>

              {/* 2. Tech Arsenal */}
              <div className="bg-[#0A0A0A]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                 <div className="flex items-center gap-3 mb-6">
                    <Cpu className="text-purple-400" size={20} />
                    <h3 className="text-lg font-bold text-white">Equipped Arsenal</h3>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {coreTech.map((tech, i) => (
                       <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + (i * 0.05) }}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default flex items-center gap-2"
                       >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          {tech}
                       </motion.div>
                    ))}
                 </div>
              </div>

           </div>
        </div>

        {/* --- SECTION 2: EVOLUTION LOG (TIMELINE) --- */}
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
              <span className="inline-block p-3 rounded-full bg-white/5 border border-white/5 mb-4 text-purple-400">
                 <Sparkles size={20} />
              </span>
              <h3 className="text-3xl font-bold text-white">Evolution Log</h3>
           </div>
           
           <div className="relative">
              {timeline.map((item, index) => (
                 <EvolutionNode 
                    key={index} 
                    item={item} 
                    index={index} 
                    isLast={index === timeline.length - 1} 
                 />
              ))}
           </div>
        </div>

      </div>
    </div>
  )
}

export default About