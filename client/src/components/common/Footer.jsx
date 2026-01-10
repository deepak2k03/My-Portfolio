import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../../data/staticData'; 
// If you don't have lucide-react yet, install it. 
// It's much cleaner than font-awesome.
import { ArrowUpRight, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <footer className="relative bg-[#050505] text-slate-300 overflow-hidden font-sans border-t border-white/5">
      
      {/* 1. Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 pt-20 pb-10">
        
        {/* 2. Top Section: Big Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              Have an idea? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Let's build it together.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md mt-4">
              Currently available for freelance projects and open to full-time opportunities.
            </p>
          </div>
          
          <motion.a 
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 md:mt-0 group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* 3. Main Grid Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16"
        >
          
          {/* Brand Column (Span 5) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="text-blue-500" /> Deepak Singh
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              MERN Stack Developer focused on scalable architecture, clean UI patterns, and delivering exceptional developer experiences.
            </p>
          </motion.div>

          {/* Links Column (Span 3) */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Projects", href: "/projects" },
                { name: "Interviews", href: "/interviews" },
                { name: "About Me", href: "/about" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column (Span 4) */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6">Socials</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm group"
                >
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {link.icon}
                  </span>
                  <span className="group-hover:text-white">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 4. Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-slate-500"
        >
          <p>© {currentYear} Deepak Singh. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>Built with React & Tailwind</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;