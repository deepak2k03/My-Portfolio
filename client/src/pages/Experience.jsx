import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { Briefcase, MapPin, Calendar, ArrowUpRight, Users, Code2, Award, Zap, Building2 } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'Full Stack Developer Intern',
      company: 'Udrcrafts.com',
      duration: 'Sep 2025 - Dec 2025',
      location: 'Remote',
      type: 'Internship',
      icon: Code2,
      color: 'text-blue-400',
      description:
        'Working on an e-commerce platform with a focus on scalability, performance, and a clean developer experience.',
      achievements: [
        'Designed and developed RESTful APIs using Node.js and Express',
        'Built responsive, reusable React components',
        'Implemented authentication and authorization flows',
        'Optimized database queries, improving key endpoints by ~40%',
      ],
      stack: ['Node.js', 'React', 'MongoDB', 'Express']
    },
    {
      title: 'Training & Placement Representative',
      company: 'KNIT, Sultanpur',
      duration: '2023 - Present',
      location: 'On-campus',
      type: 'Leadership',
      icon: Users,
      color: 'text-purple-400',
      description:
        'Coordinated placement activities, managed student communication, and helped peers prepare for interviews.',
      achievements: [
        'Organized 10+ technical workshops and sessions',
        'Coordinated placement drives with 20+ companies',
        'Mentored 50+ students on resumes and interviews',
        'Contributed to an overall improvement in placement outcomes',
      ],
      stack: ['Management', 'Communication', 'Leadership']
    },
  ]

  return (
    <div className="min-h-screen bg-[#020202] text-slate-50 py-20 relative overflow-hidden">
      
      {/* 1. Ambient Background (Matches Home) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <SectionHeader
          tag="Career"
          title="Professional Journey"
          subtitle="Where I’ve spent my time, the problems I've solved, and the impact delivered."
          centered
        />

        {/* --- TIMELINE SECTION --- */}
        <div className="relative max-w-5xl mx-auto mt-20">
          
          {/* 2. The Neon Spine (Vertical Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent md:-translate-x-1/2 opacity-30" />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Node (Icon) */}
                  <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#020202] border border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.2)] flex items-center justify-center z-10 relative group">
                       <div className={`absolute inset-0 rounded-full bg-current opacity-10 blur-md ${exp.color}`} />
                       <exp.icon className={`w-6 h-6 ${exp.color} group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block" />

                  {/* Content Card */}
                  <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}>
                    
                    <div className="group relative rounded-2xl border border-white/10 bg-[#0A0A0A]/50 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/5">
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                      {/* Header Info */}
                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/5 ${exp.color}`}>
                              {exp.type}
                           </span>
                           <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                              <Calendar size={12} /> {exp.duration}
                           </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                          {exp.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-slate-400 mb-6 text-sm">
                           <Building2 size={14} className="text-slate-500" />
                           <span className="font-medium">{exp.company}</span>
                           <span className="w-1 h-1 bg-slate-700 rounded-full" />
                           <MapPin size={14} className="text-slate-500" />
                           <span>{exp.location}</span>
                        </div>

                        <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                           {exp.description}
                        </p>

                        {/* Achievements List */}
                        <div className="space-y-3 mb-6">
                           <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                              <Zap size={12} className="text-yellow-500" /> Impact
                           </h4>
                           <ul className="space-y-2">
                              {exp.achievements.map((item, i) => (
                                 <li key={i} className="flex gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                    <ArrowUpRight size={16} className="shrink-0 text-slate-600 mt-0.5" />
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                           {exp.stack?.map((tech, i) => (
                              <span key={i} className="px-2 py-1 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors">
                                 {tech}
                              </span>
                           ))}
                        </div>

                      </div>
                    </div>
                  </div>

                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 3. Skills Cloud (Footer) */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-32 text-center"
        >
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-slate-300">Total Tech Arsenal</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                'React', 'Node.js', 'Express', 'MongoDB', 
                'TypeScript', 'Tailwind', 'Git', 'REST APIs',
                'Docker', 'AWS', 'Redux', 'Next.js'
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2 rounded-xl bg-[#0A0A0A] border border-white/10 text-slate-400 hover:text-white hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-default"
                >
                   {skill}
                </motion.div>
              ))}
           </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Experience