import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { skillsCategories } from '../data/skillsData'
import { 
  Layers, Code2, Database, Terminal, Cpu, 
  Globe, Server, Layout, Smartphone, Zap, Hexagon, Search
} from 'lucide-react'

// --- 1. SMART ICON RENDERER ---
const SkillIcon = ({ icon, name, className }) => {
  if (!icon) return <span className="font-mono font-bold text-xs">{name?.substring(0, 2).toUpperCase()}</span>;

  if (typeof icon === 'function' || typeof icon === 'object') {
    const IconComponent = icon
    return <IconComponent className={className} />
  }
  if (typeof icon === 'string' && (icon.includes('/') || icon.includes('.'))) {
    return <img src={icon} alt={name} className={`object-contain ${className}`} />
  }
  return <span className={`font-bold ${className.includes('text-4xl') ? 'text-2xl' : 'text-sm'}`}>{icon}</span>
}

// --- 2. NEURAL CARD (Adaptive Light/Dark) ---
const NeuralCard = ({ skill, index, isDimmed, onHover, onLeave }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: isDimmed ? 0.95 : 1,
        filter: isDimmed ? 'grayscale(100%) blur(1px)' : 'grayscale(0%) blur(0px)'
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
      // 🟢 FIX: Added white background for Light mode, kept #111 for Dark mode
      className={`group relative flex flex-col items-center justify-between p-5 rounded-2xl 
        bg-white dark:bg-[#111] 
        border border-slate-200 dark:border-white/10 
        shadow-sm dark:shadow-none
        overflow-hidden cursor-pointer transition-all 
        hover:border-purple-500/50 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]`}
    >
      {/* Liquid Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Icon Container */}
      <div className="relative z-10 w-12 h-12 mb-3 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white dark:group-hover:bg-white/10">
         {/* 🟢 FIX: Icon color adapts to theme */}
         <SkillIcon icon={skill.icon} name={skill.name} className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-white" />
      </div>

      {/* Info */}
      <div className="relative z-10 text-center w-full">
         <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-white truncate w-full transition-colors">{skill.name}</h3>
         
         {/* Proficiency Bar */}
         <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full mt-3 overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: skill.level || "85%" }}
               transition={{ duration: 1, delay: 0.2 }}
               className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
         </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <Zap size={10} className="text-yellow-500 dark:text-yellow-400 fill-current" />
      </div>
    </motion.div>
  )
}

// --- 3. CATEGORY HEADER ---
const CategorySection = ({ category, skills, hoveredSkill, setHoveredSkill }) => {
  const Icon = category.icon || Layers;
  
  return (
    <div className="mb-12">
       {/* 🟢 FIX: Border color for light mode */}
       <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
             <Icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">{category.name}</h3>
          <span className="text-xs font-mono text-slate-500 ml-auto bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
             {skills.length} MODULES
          </span>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, idx) => {
             const isDimmed = hoveredSkill && hoveredSkill.name !== skill.name;
             return (
                <NeuralCard 
                   key={skill.name || idx} 
                   skill={skill} 
                   index={idx}
                   isDimmed={isDimmed}
                   onHover={setHoveredSkill}
                   onLeave={() => setHoveredSkill(null)}
                />
             )
          })}
       </div>
    </div>
  )
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  if (!skillsCategories) return null;

  const displayCategories = useMemo(() => {
     let cats = skillsCategories;
     if (activeTab !== 'All') {
        cats = skillsCategories.filter(c => c.id === activeTab);
     }
     if (searchTerm) {
        return cats.map(cat => ({
           ...cat,
           skills: cat.skills.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        })).filter(cat => cat.skills.length > 0);
     }
     return cats;
  }, [activeTab, searchTerm]);

  const categoriesList = [
    { id: 'All', name: 'System Overview', icon: Hexagon },
    ...skillsCategories.map(cat => ({
       ...cat,
       icon: cat.id === 'Frontend' ? Layout : cat.id === 'Backend' ? Server : Terminal
    }))
  ]

  return (
    // 🟢 FIX: Main background adapts to Slate-50 (Light) vs Black (Dark)
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white py-24 relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* --- BACKGROUND MATRIX (Adaptive) --- */}
      {/* Light Mode: Grey grid. Dark Mode: White transparent grid. */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />
      
      {/* Gradient Fade Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-black dark:via-transparent dark:to-black pointer-events-none z-0" />
      
      {/* Glowing Orb (Adaptive) */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs mb-4"
               >
                  <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
                  SYSTEM_STATUS: OPTIMAL
               </motion.div>
               <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                  Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500">Stack</span>
               </h1>
               <p className="text-slate-600 dark:text-slate-400 max-w-lg text-lg">
                  An interactive map of my technical capabilities. Hover nodes to analyze connections.
               </p>
            </div>

            {/* Search Bar (Adaptive) */}
            <div className="relative w-full md:w-96 group">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-10 group-hover:opacity-30 transition-opacity" />
               <div className="relative bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl flex items-center p-1 focus-within:border-purple-500/50 transition-colors shadow-sm">
                  <Search className="text-slate-400 ml-3" size={18} />
                  <input 
                     type="text" 
                     placeholder="Search database..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-transparent border-none text-slate-900 dark:text-white px-3 py-2 outline-none placeholder:text-slate-400 font-mono text-sm"
                  />
                  <div className="hidden md:block px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-[10px] text-slate-500 font-mono mr-2">CTRL+K</div>
               </div>
            </div>
        </div>

        {/* --- CONTROLS (Adaptive Tabs) --- */}
        <div className="sticky top-4 z-50 mb-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
           <div className="flex p-1.5 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full w-fit mx-auto shadow-lg dark:shadow-2xl">
              {categoriesList.map(cat => {
                 const isActive = activeTab === cat.id;
                 return (
                    <button
                       key={cat.id}
                       onClick={() => setActiveTab(cat.id)}
                       className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                          isActive 
                            ? 'text-white' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                       }`}
                    >
                       {isActive && (
                          <motion.div 
                             layoutId="activeTab"
                             className="absolute inset-0 bg-purple-600 rounded-full shadow-lg"
                          />
                       )}
                       <span className="relative z-10 flex items-center gap-2">
                          <cat.icon size={14} /> {cat.name}
                       </span>
                    </button>
                 )
              })}
           </div>
        </div>

        {/* --- THE GRID --- */}
        <LayoutGroup>
           <motion.div layout className="min-h-[500px]">
              <AnimatePresence mode='popLayout'>
                 {displayCategories.map((category) => (
                    <motion.div
                       layout
                       key={category.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       transition={{ duration: 0.4 }}
                    >
                       <CategorySection 
                          category={category} 
                          skills={category.skills} 
                          hoveredSkill={hoveredSkill}
                          setHoveredSkill={setHoveredSkill}
                       />
                    </motion.div>
                 ))}
              </AnimatePresence>

              {/* Empty State (Adaptive) */}
              {displayCategories.length === 0 && (
                 <div className="text-center py-32 text-slate-400 dark:text-slate-500">
                    <Database size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-mono text-lg">NO DATA FOUND</p>
                 </div>
              )}
           </motion.div>
        </LayoutGroup>

      </div>
    </div>
  )
}

export default Skills