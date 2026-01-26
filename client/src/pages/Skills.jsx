import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { skillsCategories } from '../data/skillsData'
import { 
  Layers, Code2, Database, Terminal, Cpu, 
  Globe, Server, Layout, Smartphone, Zap, Hexagon, Search,
  Box, Activity, Command
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
  
  // Auto-fetch from Devicon
  const normalizeName = (n) => {
      const lower = n.toLowerCase().replace(/\./g, '').replace(/\s/g, '');
      const map = {
        'c++': 'cplusplus', 'c#': 'csharp', 'c': 'c', 'net': 'dotnetcore',
        'aws': 'amazonwebservices', 'gcp': 'googlecloud', 'html': 'html5',
        'css': 'css3', 'js': 'javascript', 'ts': 'typescript', 'express': 'express', 
        'node': 'nodejs', 'react': 'react', 'nextjs': 'nextjs', 'tailwind': 'tailwindcss',
        'mongo': 'mongodb', 'postgres': 'postgresql', 'sql': 'mysql' 
      };
      return map[lower] || lower;
  };
  const fileName = normalizeName(name);
  const devIconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${fileName}/${fileName}-original.svg`;

  return (
      <img 
        src={devIconUrl} 
        alt={name} 
        className={`object-contain ${className}`} 
        onError={(e) => {
            if (!e.target.src.includes('plain')) {
                e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${fileName}/${fileName}-plain.svg`;
            } else {
                e.target.style.display = 'none'; // Hide if both fail
            }
        }}
      />
  );
}

// --- 2. ULTRA-PRO NEURAL CARD ---
const NeuralCard = ({ skill, index, isDimmed, onHover, onLeave }) => {
  const level = parseInt(skill.level || "80");
  
  // Dynamic color & gradient based on mastery level
  const colorClass = level >= 90 ? "text-emerald-400" : level >= 75 ? "text-blue-400" : "text-purple-400";
  const bgGradient = level >= 90 ? "from-emerald-500" : level >= 75 ? "from-blue-500" : "from-purple-500";
  const glowColor = level >= 90 ? "group-hover:shadow-emerald-900/20" : level >= 75 ? "group-hover:shadow-blue-900/20" : "group-hover:shadow-purple-900/20";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: isDimmed ? 0.95 : 1,
        filter: isDimmed ? 'grayscale(100%) blur(1px)' : 'grayscale(0%) blur(0px)'
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
      className={`group relative h-52 flex flex-col justify-between p-6 rounded-3xl 
        bg-white dark:bg-[#080808] 
        border border-slate-200 dark:border-white/5 
        shadow-sm dark:shadow-none
        overflow-hidden cursor-pointer transition-all duration-500
        hover:border-slate-300 dark:hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl ${glowColor}`}
    >
      {/* 1. Animated Gradient Blob Background (Subtle) */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-100 dark:bg-white/5 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700" />
      
      {/* 2. Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* 3. Scanline Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 dark:via-white/5 to-transparent -translate-y-[150%] group-hover:translate-y-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

      <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header: Icon & ID */}
          <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#111] border border-slate-100 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <SkillIcon icon={skill.icon} name={skill.name} className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-300 dark:text-white/20">
                  #{String(index + 1).padStart(2, '0')}
              </span>
          </div>

          {/* Middle: Name & Tech Details */}
          <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {skill.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <span className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">Ver. {Math.floor(Math.random() * 10) + 1}.0</span>
                  <span>•</span>
                  <span>Stable</span>
              </div>
          </div>

          {/* Bottom: Stats & Bar */}
          <div className="space-y-3">
              <div className="flex justify-between items-end text-xs">
                  <div className={`flex items-center gap-1.5 ${colorClass}`}>
                      <Activity size={12} className="animate-pulse" />
                      <span className="font-bold">Active</span>
                  </div>
                  <span className="font-bold font-mono text-slate-700 dark:text-slate-200">{skill.level || "85"}%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level || 85}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full bg-gradient-to-r ${bgGradient} to-white shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                  />
              </div>
          </div>
      </div>
    </motion.div>
  )
}

// --- 3. CATEGORY HEADER ---
const CategorySection = ({ category, skills, hoveredSkill, setHoveredSkill }) => {
  const Icon = category.icon || Layers;
  
  return (
    <div className="mb-20">
       <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-sm">
             <Icon size={24} />
          </div>
          <div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{category.name}</h3>
             <div className="flex items-center gap-2 text-sm text-slate-500">
                <Command size={12} />
                <span className="font-mono">{skills.length} MODULES DETECTED</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    { id: 'All', name: 'All Systems', icon: Hexagon },
    ...skillsCategories.map(cat => ({
       ...cat,
       icon: cat.id === 'Frontend' ? Layout : cat.id === 'Backend' ? Server : Terminal
    }))
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white py-24 relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs mb-4 bg-purple-100 dark:bg-purple-900/20 px-3 py-1 rounded-full"
               >
                  <Activity size={12} />
                  SYSTEM_STATUS: ONLINE
               </motion.div>
               <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                  Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Arsenal.</span>
               </h1>
               <p className="text-slate-600 dark:text-slate-400 max-w-lg text-lg leading-relaxed">
                  Interactive visualization of engineering capabilities. <br className="hidden md:block"/>
                  Hover over modules to analyze proficiency levels.
               </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
               <div className="relative bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center p-2 focus-within:ring-2 ring-purple-500/20 transition-all shadow-sm">
                  <Search className="text-slate-400 ml-3" size={20} />
                  <input 
                     type="text" 
                     placeholder="Search stack..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-transparent border-none text-slate-900 dark:text-white px-4 py-2 outline-none placeholder:text-slate-400 font-medium"
                  />
                  <div className="hidden md:block px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-[10px] font-bold text-slate-500 font-mono mr-2">CMD+K</div>
               </div>
            </div>
        </div>

        {/* Tabs - CENTERED FIXED */}
        <div className="sticky top-4 z-50 mb-16 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
           <div className="flex p-1.5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full w-fit mx-auto shadow-xl">
              {categoriesList.map(cat => {
                 const isActive = activeTab === cat.id;
                 return (
                    <button
                       key={cat.id}
                       onClick={() => setActiveTab(cat.id)}
                       className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                          isActive 
                            ? 'text-white' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                       }`}
                    >
                       {isActive && (
                          <motion.div 
                             layoutId="activeTab"
                             className="absolute inset-0 bg-slate-900 dark:bg-purple-600 rounded-full shadow-lg"
                          />
                       )}
                       <span className="relative z-10 flex items-center gap-2">
                          <cat.icon size={16} /> {cat.name}
                       </span>
                    </button>
                 )
              })}
           </div>
        </div>

        {/* Grid Content */}
        <LayoutGroup>
           <motion.div layout>
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

              {/* Empty State */}
              {displayCategories.length === 0 && (
                 <div className="text-center py-32 text-slate-400 dark:text-slate-500">
                    <Box size={64} className="mx-auto mb-6 opacity-20" />
                    <p className="font-mono text-xl font-bold">SYSTEM EMPTY</p>
                    <p className="text-sm opacity-60 mt-2">No matching modules found in database.</p>
                 </div>
              )}
           </motion.div>
        </LayoutGroup>

      </div>
    </div>
  )
}

export default Skills