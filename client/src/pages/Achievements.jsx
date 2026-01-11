import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { 
  Trophy, Star, Target, Globe, Code, Zap, Medal, Crown, Flame, 
  ExternalLink, Flag, Award, Terminal, Hash, Cpu, Layers 
} from 'lucide-react'

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
    legendary: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    epic: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    rare: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
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
  
  // Adaptive Icon Colors
  const iconColor = item.rarity === 'legendary' 
    ? 'text-yellow-600 dark:text-yellow-400' 
    : item.rarity === 'epic' 
    ? 'text-purple-600 dark:text-purple-400' 
    : 'text-blue-600 dark:text-blue-400'

  // Adaptive Button Hover Colors
  const btnHoverColor = item.rarity === 'legendary' 
    ? 'hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 dark:hover:bg-yellow-500/20 dark:hover:text-yellow-300 dark:hover:border-yellow-500/50' 
    : item.rarity === 'epic' 
    ? 'hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 dark:hover:border-purple-500/50' 
    : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 dark:hover:border-blue-500/50'

  return (
    <TiltCard className="h-full">
      <div className={`relative h-full overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-1 group hover:border-purple-300 dark:hover:border-white/30 transition-colors shadow-lg dark:shadow-none`}>
        
        {/* Background Gradient Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative h-full rounded-[1.3rem] bg-slate-50/50 dark:bg-[#0F0F0F]/90 backdrop-blur-xl p-6 flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
             <div className={`p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 ${iconColor} shadow-sm dark:shadow-inner`}>
                {item.icon}
             </div>
             <RarityBadge type={item.rarity} />
          </div>

          {/* Title & Highlighted Platform */}
          <div className="mb-4">
             <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-white dark:group-hover:to-slate-400 transition-all">
               {item.title}
             </h4>
             
             {/* 🟢 HIGHLIGHTED PLATFORM NAME (Adaptive) */}
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-md shadow-sm">
                <Globe size={12} className="text-purple-600 dark:text-purple-400" /> 
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                  {item.org}
                </span>
             </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
             {item.description}
          </p>

          {/* Footer Stats & Profile Link */}
          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
             <div className="flex gap-1">
                {item.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-700" title={tag} />
                ))}
             </div>

             {/* Visit Profile Button */}
             {item.link ? (
               <a 
                 href={item.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all duration-300 ${btnHoverColor}`}
               >
                 Visit Profile <ExternalLink size={12} />
               </a>
             ) : (
               <span className="text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
                 {item.meta}
               </span>
             )}
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
    { label: 'Global Rank', value: 'Knight', sub: 'LeetCode', icon: Crown, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-[#0A0A0A]' },
    { label: 'Max Rating', value: '4 Stars', sub: 'CodeChef', icon: Star, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-[#0A0A0A]' },
    { label: 'Problems', value: '1500+', sub: 'Total Solved', icon: Code, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-[#0A0A0A]' },
    { label: 'Wins', value: '10x', sub: 'Hackathons', icon: Trophy, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-[#0A0A0A]' },
  ]

  // --- DATA ---
  const data = {
    cp: [
      {
        id: 1, title: 'Knight Badge', org: 'LeetCode', meta: '1920 Rating', rarity: 'legendary',
        description: 'Achieved Knight badge by consistently ranking in the top 5% of weekly contests.',
        tags: ['DSA', 'Graphs'], icon: <Crown size={24} />,
        link: 'https://leetcode.com/deepak2k03'
      },
      {
        id: 2, title: '4★ Coder', org: 'CodeChef', meta: 'Div 2', rarity: 'epic',
        description: 'Consistent performance in Long Challenges. Solved hard-level dynamic programming problems.',
        tags: ['Math', 'DP'], icon: <Star size={24} />,
        link: 'https://codechef.com/users/deepak2k03'
      },
      {
        id: 3, title: 'Specialist', org: 'Codeforces', meta: '1450 Rating', rarity: 'rare',
        description: 'Participated in 20+ rounds. Specialized in rapid C++ implementation.',
        tags: ['Speed', 'STL'], icon: <Target size={24} />,
        link: 'https://codeforces.com/profile/deepak2k03'
      },
      {
        id: 4, title: 'Institute Rank 1', org: 'GeeksForGeeks', meta: '500+ Solved', rarity: 'epic',
        description: 'Consistently solving POTD. Ranked 1st in institute leaderboard.',
        tags: ['DSA', 'Articles'], icon: <Terminal size={24} />,
        link: 'https://auth.geeksforgeeks.org/user/deepak2k03'
      },
      {
        id: 5, title: 'Green Coder', org: 'AtCoder', meta: '850 Rating', rarity: 'rare',
        description: 'Participating in Beginner Contests. Strong grasp of mathematical problems.',
        tags: ['Math', 'abc'], icon: <Target size={24} />,
        link: 'https://atcoder.jp/users/deepak2k03'
      },
      {
        id: 6, title: '5 Star Gold', org: 'HackerRank', meta: 'Problem Solving', rarity: 'legendary',
        description: 'Achieved 5 stars in Problem Solving and C++. Mastered core algorithms.',
        tags: ['Algorithms', 'C++'], icon: <Award size={24} />,
        link: 'https://www.hackerrank.com/deepak2k03'
      },
      {
        id: 7, title: 'Circuit Rank', org: 'HackerEarth', meta: 'Top 5%', rarity: 'rare',
        description: 'Active participant in monthly circuits and hiring challenges.',
        tags: ['Circuits', 'Hiring'], icon: <Globe size={24} />,
        link: 'https://www.hackerearth.com/@deepak2k03'
      },
      {
        id: 8, title: 'Level 6', org: 'CodeStudio', meta: 'Ninja', rarity: 'epic',
        description: 'Solved top interview problems. Expert in Guided Paths.',
        tags: ['Interviews', 'CN'], icon: <Zap size={24} />,
        link: 'https://www.codingninjas.com/codestudio/profile/deepak2k03'
      },
      {
        id: 9, title: 'Level 7', org: 'InterviewBit', meta: '200+ Days', rarity: 'epic',
        description: 'Maintained a 200-day streak. Cleared all level 7 programming checks.',
        tags: ['System Design', 'Puzzles'], icon: <Cpu size={24} />,
        link: 'https://www.interviewbit.com/profile/deepak2k03'
      }
    ],
    hackathons: [
      {
        id: 10, title: 'Smart India Hackathon', org: 'Govt of India', meta: 'Winner', rarity: 'legendary',
        description: 'National Winner. Built an IoT traffic system that reduced congestion by 30% in simulations.',
        tags: ['IoT', 'Leadership'], icon: <Trophy size={24} />
      },
      {
        id: 11, title: 'HackFest 2024', org: 'IIT Kanpur', meta: 'Finalist', rarity: 'epic',
        description: 'Created a decentralized voting dApp. Selected as top 10 from 500+ teams.',
        tags: ['Web3', 'React'], icon: <Flame size={24} />
      },
      {
        id: 15, title: 'HackByte 3.0', org: 'IIIT Jabalpur', meta: 'Finalist', rarity: 'Rare',
        description: 'Selected among Top 120 teams across India. Built a skill exchanging platform',
        tags: ['IoT', 'Leadership'], icon: <Trophy size={24} />
      },
      {
        id: 16, title: 'Zeros Arena', org: 'Code Geass', meta: 'Participant', rarity: 'epic',
        description: 'Created a web based virtual herbal garden using MERN stack.',
        tags: ['Web3', 'React'], icon: <Flame size={24} />
      },
      {
        id: 17, title: 'Hack-o-Gravity', org: 'KNIT Sultanpur', meta: 'Participant', rarity: 'epic',
        description: 'Built a decentralized public services transparency platform using blockchain.',
        tags: ['Web3', 'React'], icon: <Flame size={24} />
      },
      {
        id: 18, title: 'Purvanchal Tech Ideathon', org: 'KNIT Sultanpur', meta: 'Participant', rarity: 'epic',
        description: 'Presented an Startup idea on a decentralized public services transparency platform.',
        tags: ['Web3', 'React'], icon: <Flame size={24} />
      }
    ],
    competitions: [
      {
        id: 12, title: 'ICPC Regional', org: 'ICPC India', meta: 'Rank ~2000', rarity: 'legendary',
        description: 'The "Olympics of Competitive Programming". Solved 3 complex algorithmic problems under pressure.',
        tags: ['Algorithms', 'Team'], icon: <Globe size={24} />
      },
      {
        id: 13, title: 'Google Code Jam', org: 'Google', meta: 'Round 2', rarity: 'epic',
        description: 'Cleared qualification rounds. Tackled advanced graph theory and combinatorics.',
        tags: ['Global'], icon: <Flag size={24} />
      },
      {
        id: 14, title: 'Flipkart GRID', org: 'Flipkart', meta: 'Level 3', rarity: 'rare',
        description: 'Software Development Challenge. Optimized a supply chain algorithm.',
        tags: ['Optimization'], icon: <Medal size={24} />
      },
      {
        id: 19, title: 'TCS Codevita', org: 'TCS', meta: 'Round 2', rarity: 'epic',
        description: 'Cleared qualification rounds. Tackled advanced graph theory and combinatorics.',
        tags: ['Global'], icon: <Flag size={24} />
      },
      {
        id: 20, title: 'Flipkart GRID 6.0', org: 'Flipkart', meta: 'Round 1', rarity: 'rare',
        description: 'Software Development Challenge. Solved algorithimic problems.',
        tags: ['Optimization'], icon: <Medal size={24} />
      },
      {
        id: 21, title: 'Amazon ML Summer School', org: 'Amazon', meta: 'Round 1', rarity: 'rare',
        description: 'Software Development Challenge. Solved algorithimic problems.',
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-50 py-24 relative overflow-hidden transition-colors duration-300">
      
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
               className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
             >
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shadow-sm dark:shadow-lg`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.sub}</div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* 2. Sci-Fi Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-slate-200 dark:bg-[#0F0F0F] dark:border-white/10 relative shadow-sm dark:shadow-none">
             {tabs.map((tab) => {
               const isActive = activeTab === tab.id
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 z-10 ${isActive ? 'text-slate-900 dark:text-black' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                 >
                   {isActive && (
                     <motion.div
                       layoutId="activeTab"
                       className="absolute inset-0 bg-slate-100 dark:bg-white rounded-full shadow-sm"
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