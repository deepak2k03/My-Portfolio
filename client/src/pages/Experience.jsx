import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { Briefcase, MapPin, Calendar, ArrowUpRight, Users, Code2, Award, Zap, Building2, Terminal } from 'lucide-react'

// --- 1. 3D Tilt Card Component (The Magic) ---
const ExperienceCard = ({ children, className = "" }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    x.set((clientX - left) / width - 0.5)
    y.set((clientY - top) / height - 0.5)
  }

  return (
    <motion.div
      style={{
        rotateY: useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]),
        rotateX: useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`perspective-1000 ${className}`}
    >
      <div className="transition-transform duration-200 ease-out group h-full">
         <div className="relative h-full rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0A0A0A]/50 p-6 md:p-8 backdrop-blur-xl shadow-xl dark:shadow-none hover:border-purple-500/30 dark:hover:border-purple-500/50 transition-all">
            {/* Gloss Overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    600px circle at ${mouseX}px ${mouseY}px,
                    rgba(168, 85, 247, 0.05),
                    transparent 80%
                  )
                `
              }}
            />
            {children}
         </div>
      </div>
    </motion.div>
  )
}

// --- 2. The Animated Timeline Beam ---
const TimelineBeam = ({ reference }) => {
    const { scrollYProgress } = useScroll({
        target: reference,
        offset: ["start end", "end start"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-white/5 z-0">
            <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 origin-top w-full"
                style={{ scaleY, height: "100%" }}
            />
        </div>
    )
}

const Experience = () => {
  const containerRef = useRef(null)

  const experiences = [
    {
      title: 'Full Stack Developer Intern',
      company: 'SounSpire',
      duration: 'Jan 2026 - Present',
      location: 'Remote',
      type: 'Internship',
      icon: Code2,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      description: 'Architecting scalable e-commerce solutions with a focus on high-performance APIs and intuitive React interfaces.',
      achievements: [
        'Designed and developed RESTful APIs using Node.js and Express',
        'Built responsive, reusable React components',
        'Implemented secure JWT authentication flows',
        'Optimized MongoDB queries, improving latency by ~40%',
      ],
      stack: ['Node.js', 'React', 'MongoDB', 'Express']
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Udrcrafts.com',
      duration: 'Sep 2025 - Dec 2025',
      location: 'Remote',
      type: 'Internship',
      icon: Terminal,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      description: 'Contributed to the core marketplace infrastructure, optimizing database interactions and frontend state management.',
      achievements: [
        'Engineered 15+ REST endpoints for vendor management',
        'Refactored legacy code to modern React Hooks',
        'Integrated Razorpay payment gateway',
        'Reduced bundle size by 25% via code splitting',
      ],
      stack: ['Node.js', 'React', 'Redux', 'AWS']
    },
    {
      title: 'Open Source Contributor',
      company: 'Scala Center',
      duration: '2026 - Present',
      location: 'Lausanne, Vaud',
      type: 'Scala Developer',
      icon: Code2,
      color: 'bg-red-500',
      textColor: 'text-red-400',
      description: 'Active contributor to the Scala ecosystem, focusing on tooling, CI/CD pipelines, and LLM integrations.',
      achievements: [
        'Contributing to the LLM4S project architecture',
        'Merged critical CI pipeline improvements',
        'Authored comprehensive documentation for new modules',
        'Implemented unit tests increasing coverage by 15%',
      ],
      stack: ['Scala', 'sbt', 'GitHub Actions', 'LLMs']
    },
    {
      title: 'Placement Representative',
      company: 'KNIT, Sultanpur',
      duration: '2023 - Present',
      location: 'Campus Leadership',
      type: 'Leadership',
      icon: Users,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      description: 'Bridging the gap between corporate recruiters and student talent through strategic coordination and mentorship.',
      achievements: [
        'Orchestrated 10+ technical workshops',
        'Coordinated placement drives for 20+ top-tier companies',
        'Mentored 100+ students on resume building',
        'Streamlined the interview scheduling process',
      ],
      stack: ['Management', 'Communication', 'Strategy']
    },
    {
      title: 'Design Head',
      company: 'Programming Club',
      duration: '2023 - Present',
      location: 'KNIT, Sultanpur',
      type: 'Community',
      icon: Zap,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      description: 'Fostering a culture of competitive programming and technical excellence among the student body.',
      achievements: [
        'Directed 10+ university-level hackathons',
        'Authored editorials for CodeChef contests',
        'Revamped the official club website',
        'Grew active club membership by 200%',
      ],
      stack: ['Event Management', 'UI/UX', 'Mentorship']
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-slate-200 py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 dark:bg-purple-900/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-6"
            >
                <Briefcase size={14} /> Career Timeline
            </motion.div>
            <SectionHeader
                title="Professional Journey"
                subtitle="A chronological log of my impact, learning, and technical evolution."
                centered
            />
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div ref={containerRef} className="relative">
          
          {/* The Glowing Beam */}
          <TimelineBeam reference={containerRef} />

          <div className="space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* CENTRAL NODE (The Glowing Dot) */}
                  <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="relative flex items-center justify-center">
                        <div className={`w-4 h-4 rounded-full ${exp.color} shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20 ring-4 ring-white dark:ring-[#020202]`} />
                        <div className={`absolute w-12 h-12 rounded-full ${exp.color} opacity-20 animate-pulse`} />
                    </div>
                  </div>

                  {/* Spacer for 50/50 layout */}
                  <div className="flex-1 hidden md:block" />

                  {/* THE CONTENT CARD */}
                  <div className={`flex-1 pl-16 md:pl-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <ExperienceCard className="w-full">
                        
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                             <div className="flex items-center gap-3">
                                 <div className={`p-2.5 rounded-xl ${exp.color} bg-opacity-10 text-${exp.color.replace('bg-', '')}`}>
                                     <exp.icon size={20} className={exp.textColor} />
                                 </div>
                                 <div>
                                     <span className={`text-xs font-bold uppercase tracking-wider ${exp.textColor}`}>
                                         {exp.type}
                                     </span>
                                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                                         {exp.company}
                                     </h3>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full w-fit">
                                 <Calendar size={12} /> {exp.duration}
                             </div>
                        </div>

                        {/* Role & Description */}
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                                {exp.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {exp.description}
                            </p>
                        </div>

                        {/* Achievements List */}
                        <ul className="space-y-3 mb-6">
                            {exp.achievements.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 group/item">
                                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exp.color} shrink-0 group-hover/item:scale-150 transition-transform`} />
                                    <span className="group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 transition-colors">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-white/5 pt-4">
                            {exp.stack.map((tech) => (
                                <span key={tech} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>

                    </ExperienceCard>
                  </div>

                </motion.div>
              )
            })}
          </div>
        </div>

        {/* --- FOOTER BADGE --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 text-center"
        >
            <div className="inline-flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                    <Award size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Always Growing</h3>
                    <p className="text-sm text-slate-500">Open to new challenges and leadership roles.</p>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Experience