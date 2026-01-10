import { motion } from 'framer-motion';

const SectionHeader = ({ 
  title, 
  subtitle, 
  tag, // New prop for the small pill badge (e.g., "Explore", "My Work")
  centered = false,
  className = "" 
}) => {
  
  return (
    <div className={`relative mb-16 ${centered ? 'text-center flex flex-col items-center' : ''} ${className}`}>
      
      {/* 1. Optional Tag/Badge */}
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-purple-500/30 rounded-full bg-purple-500/10 backdrop-blur-sm"
        >
          <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">
            {tag}
          </span>
        </motion.div>
      )}

      {/* 2. Main Title with Gradient Effect */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6"
      >
        {/* If you want a gradient on the text, use this class structure: */}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          {title}
        </span>
      </motion.h2>

      {/* 3. Subtitle with improved readability */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-lg text-slate-400 leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* 4. Decorative Gradient Line (Visual Anchor) */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100px", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-1 mt-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 ${
          centered ? 'mx-auto' : ''
        }`}
      />
      
    </div>
  );
};

export default SectionHeader;