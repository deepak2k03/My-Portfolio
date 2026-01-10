import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Github, Linkedin, Mail, Database, Server, Globe } from 'lucide-react'

// ✅ Correct import path matching your folder structure
import profileImg from '../../image/profile.jpeg'

const HeroSection = () => {
  
  // Animation for the floating icons
  const floatAnimation = (delay) => ({
    y: [0, -15, 0],
    transition: {
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })

  return (
    // 1. CHANGED: Removed 'bg-[#020202]' and removed 'overflow-hidden'. 
    // It is now transparent so the Home.jsx background shows through.
    <section className="relative min-h-[90vh] flex items-center pt-20">
      
      {/* 2. REMOVED: All the absolute background divs (blobs/grids) are gone from here. 
          They are now handled globally in Home.jsx for a seamless look. */}

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Typography & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Freelance & Hires
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              obsessions.
            </span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-8">
            I'm <span className="text-white font-semibold">Deepak Singh</span>, a Full-Stack MERN Developer. 
            I architect scalable systems and craft pixel-perfect UI that users actually enjoy using.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              to="/projects"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="/resume.pdf" 
              className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CV
            </a>
          </div>

          {/* Social Proof / Mini Icons */}
          <div className="mt-12 flex items-center gap-6 text-slate-500">
             <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
             <div className="h-1 w-1 bg-slate-700 rounded-full" />
             <span className="text-sm">Based in India</span>
          </div>
        </motion.div>


        {/* RIGHT SIDE: The "Orbit" Profile Visual */}
        <div className="relative flex justify-center lg:justify-end">
          
          {/* Abstract Background Blobs behind image (Local to image only) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-[60px] animate-pulse" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-72 h-72 md:w-96 md:h-96"
          >
            {/* The Glass Container for Image */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent p-2 backdrop-blur-sm border border-white/10 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-slate-900 relative">
                {/* Image Object */}
                <img 
                  src={profileImg} 
                  alt="Deepak Singh" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Floating Tech Icons */}
            <motion.div 
              animate={floatAnimation(0)}
              className="absolute -top-6 -right-6 p-4 rounded-2xl bg-[#0F0F0F] border border-white/10 shadow-xl shadow-purple-500/10 backdrop-blur-md"
            >
              <Globe className="w-8 h-8 text-blue-400" />
            </motion.div>

            <motion.div 
              animate={floatAnimation(1)}
              className="absolute top-1/2 -left-12 p-3 rounded-2xl bg-[#0F0F0F] border border-white/10 shadow-xl shadow-green-500/10 backdrop-blur-md"
            >
              <Server className="w-6 h-6 text-green-400" />
            </motion.div>

            {/* Decorative Code Badge */}
            <div className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-mono text-slate-300">System.ready()</span>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection