import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import SkillCard from '../components/skills/SkillCard'
import { skillsCategories } from '../data/skillsData'
import { Layers, Cpu, Code2, Database, Terminal } from 'lucide-react'

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Safety Check: If skillsCategories is undefined/empty, prevent crash
  if (!skillsCategories || !Array.isArray(skillsCategories)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
           <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-2">Error Loading Skills</h2>
           <p className="text-slate-600 dark:text-slate-400 text-sm">Please check your src/data/skillsData.js file.</p>
        </div>
      </div>
    )
  }

  // Filter Logic
  const filteredSkills =
    selectedCategory === 'All'
      ? skillsCategories.flatMap(category => category.skills)
      : skillsCategories.find(cat => cat.id === selectedCategory)?.skills || []

  // Flatten categories for the filter bar
  const allCategories = [
    { id: 'All', name: 'Overview', icon: Layers },
    ...skillsCategories.map(cat => ({ 
      ...cat, 
      // Map categories to Lucide icons
      icon: cat.id === 'Frontend' ? Code2 : cat.id === 'Backend' ? Database : Terminal 
    })),
  ]

  return (
    // 🟢 FIX: Main Background & Text Color
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-50 py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Global Background Atmosphere */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <SectionHeader
          tag="Expertise"
          title="Tech Arsenal"
          subtitle="A comprehensive deep dive into the tools, languages, and frameworks I use to build digital products."
          centered
        />

        {/* Floating Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {/* 🟢 FIX: Filter Container Background */}
          <div className="p-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md flex flex-wrap justify-center gap-1 shadow-sm dark:shadow-none">
            {allCategories.map(category => {
              const isActive = selectedCategory === category.id
              const Icon = category.icon || Layers
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  // 🟢 FIX: Filter Pill Text Colors
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skill-filter-pill"
                      // 🟢 FIX: Active Pill Background (Slate-900 for light mode contrast)
                      className="absolute inset-0 bg-slate-900 dark:bg-[#2A2A2A] rounded-full border border-slate-700 dark:border-white/10 shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                      {/* ✅ FIXED: Correctly check if icon is a string or a Component */}
                      {typeof Icon === 'string' ? (
                        <span>{Icon}</span>
                      ) : (
                        <Icon size={14} />
                      )}
                      {category.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* The Grid with Layout Animations */}
        <motion.div 
           layout
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
           <AnimatePresence mode='popLayout'>
             {filteredSkills.map((skill, index) => (
               <motion.div
                 layout
                 key={skill.name || index} // Safe key
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.3, delay: index * 0.05 }}
               >
                 <SkillCard skill={skill} />
               </motion.div>
             ))}
           </AnimatePresence>
        </motion.div>

        {/* Engineering Philosophy (Bento Style) */}
        <div className="mt-24">
           {/* 🟢 FIX: Heading Color */}
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Cpu className="text-purple-600 dark:text-purple-400" /> Engineering Philosophy
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend Card */}
              {/* 🟢 FIX: Adaptive Card Styles */}
              <div className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-8 hover:border-purple-400 dark:hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-none">
                 <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <Code2 size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Frontend Architecture</h4>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    I believe in building <span className="text-slate-900 dark:text-white font-medium">predictable</span> user interfaces. 
                    My approach prioritizes component modularity, strict type safety, and 
                    animation that feels organic rather than mechanical.
                 </p>
              </div>

              {/* Backend Card */}
              {/* 🟢 FIX: Adaptive Card Styles */}
              <div className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-8 hover:border-purple-400 dark:hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-none">
                 <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
                    <Database size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">System Design</h4>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Data integrity and scalability come first. I prefer designing 
                    <span className="text-slate-900 dark:text-white font-medium"> RESTful APIs</span> that are self-documenting. 
                    I focus on efficient database schemas that reduce read-latency and overhead.
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Skills