import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { Trophy, Star, Target, Globe, Code, Zap, Medal, Cpu, Award, Flag, Crown, Flame } from 'lucide-react'

// --- 1. 3D Tilt Card Component ---
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

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
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// --- 2. Rarity Badge Helper ---
const RarityBadge = ({ type }) => {
  const styles = {
    legendary: "bg-yellow-500/10 text-yellow-400 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    epic: "bg-purple-500/10 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    rare: "bg-blue-500/10 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  }
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest border ${styles[type] || styles.rare}`}>
      {type}
    </span>
  )
}

// --- 3. The "Item Drop" Card ---
const AchievementCard = ({ item }) => {
  const glowColor = item.rarity === 'legendary' ? 'from-yellow-500/20' : item.rarity === 'epic' ? 'from-purple-500/20' : 'from-blue-500/20'
  const iconColor = item.rarity === 'legendary' ? 'text-yellow-400' : item.rarity === 'epic' ? 'text-purple-400' : 'text-blue-400'

  return (
    <TiltCard className="h-full">
      <div className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-1 group hover:border-white/30 transition-colors`}>
        
        {/* Background Gradient Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative h-full rounded-[1.3rem] bg-[#0F0F0F]/90 backdrop-blur-xl p-6 flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
             <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${iconColor} shadow-inner`}>
                {item.icon}
             </div>
             <RarityBadge type={item.rarity} />
          </div>

          {/* Title & Meta */}
          <div className="mb-4">
             <h4 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
               {item.title}
             </h4>
             <p className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <Globe size={10} /> {item.org}
             </p>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
             {item.description}
          </p>

          {/* Footer Stats */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
             <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded">
                {item.meta}
             </span>
             <div className="flex gap-1">
                {item.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="w-2 h-2 rounded-full bg-slate-700" title={tag} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('cp')

  // --- TOP HUD STATS ---
  const stats = [
    { label: 'Global Rank', value: 'Top 4%', sub: 'LeetCode', icon: Crown, color: 'text-yellow-400' },
    { label: 'Max Rating', value: '1842', sub: 'CodeChef', icon: Star, color: 'text-purple-400' },
    { label: 'Problems', value: '800+', sub: 'Solved', icon: Code, color: 'text-blue-400' },
    { label: 'Wins', value: '3x', sub: 'Hackathons', icon: Trophy, color: 'text-emerald-400' },
  ]

  // --- DATA ---
  const data = {
    cp: [
      {
        id: 1, title: 'Knight Badge', org: 'LeetCode', meta: '1920 Rating', rarity: 'legendary',
        description: 'Achieved Knight badge by consistently ranking in the top 5% of weekly contests.',
        tags: ['DSA', 'Graphs'], icon: <Crown size={24} />
      },
      {
        id: 2, title: '4★ Coder', org: 'CodeChef', meta: 'Div 2', rarity: 'epic',
        description: 'Consistent performance in Long Challenges. Solved hard-level dynamic programming problems.',
        tags: ['Math', 'DP'], icon: <Star size={24} />
      },
      {
        id: 3, title: 'Specialist', org: 'Codeforces', meta: '1450 Rating', rarity: 'rare',
        description: 'Participated in 20+ rounds. Specialized in rapid C++ implementation.',
        tags: ['Speed', 'STL'], icon: <Target size={24} />
      }
    ],
    hackathons: [
      {
        id: 4, title: 'Smart India Hackathon', org: 'Govt of India', meta: 'Winner', rarity: 'legendary',
        description: 'National Winner. Built an IoT traffic system that reduced congestion by 30% in simulations.',
        tags: ['IoT', 'Leadership'], icon: <Trophy size={24} />
      },
      {
        id: 5, title: 'HackFest 2024', org: 'IIT Kanpur', meta: 'Finalist', rarity: 'epic',
        description: 'Created a decentralized voting dApp. Selected as top 10 from 500+ teams.',
        tags: ['Web3', 'React'], icon: <Flame size={24} />
      }
    ],
    competitions: [
      {
        id: 6, title: 'ICPC Regional', org: 'ICPC India', meta: 'Rank ~2000', rarity: 'legendary',
        description: 'The "Olympics of Competitive Programming". Solved 3 complex algorithmic problems under pressure.',
        tags: ['Algorithms', 'Team'], icon: <Globe size={24} />
      },
      {
        id: 7, title: 'Google Code Jam', org: 'Google', meta: 'Round 2', rarity: 'epic',
        description: 'Cleared qualification rounds. Tackled advanced graph theory and combinatorics.',
        tags: ['Global'], icon: <Flag size={24} />
      },
      {
        id: 8, title: 'Flipkart GRID', org: 'Flipkart', meta: 'Level 3', rarity: 'rare',
        description: 'Software Development Challenge. Optimized a supply chain algorithm.',
        tags: ['Optimization'], icon: <Medal size={24} />
      }
    ]
  }

  const tabs = [
    { id: 'cp', label: 'CP Ranks', icon: Code },
    { id: 'hackathons', label: 'Hackathons', icon: Zap },
    { id: 'competitions', label: 'Competitions', icon: Trophy }
  ]

  return (
    <div className="min-h-screen bg-[#020202] text-slate-50 py-24 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
           <SectionHeader
             tag="Trophy Case"
             title="Hall of Fame"
             subtitle="Milestones unlocked through code, consistency, and coffee."
             centered
           />
        </div>

        {/* 1. HUD Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
           {stats.map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
             >
                <div className={`p-3 rounded-xl bg-[#0A0A0A] ${stat.color} shadow-lg`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <div className="text-xl font-bold text-white">{stat.value}</div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.sub}</div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* 2. Sci-Fi Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full bg-[#0F0F0F] border border-white/10 relative">
             {tabs.map((tab) => {
               const isActive = activeTab === tab.id
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 z-10 ${isActive ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                 >
                   {isActive && (
                     <motion.div
                       layoutId="activeTab"
                       className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                   )}
                   <tab.icon size={16} className="relative z-10" />
                   <span className="relative z-10">{tab.label}</span>
                 </button>
               )
             })}
          </div>
        </div>

        {/* 3. The Inventory Grid (Masonry feel) */}
        <div className="min-h-[400px]">
           <AnimatePresence mode='wait'>
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.4 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
             >
               {data[activeTab].map((item, index) => (
                 <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                 >
                    <AchievementCard item={item} />
                 </motion.div>
               ))}
             </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

export default Achievements