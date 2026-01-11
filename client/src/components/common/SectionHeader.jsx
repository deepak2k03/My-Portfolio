import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle, tag, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
      {/* Tag */}
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // 🟢 FIX: Light purple bg for light mode, dark for dark mode
          className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4"
        >
          {tag}
        </motion.span>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        // 🟢 FIX: text-slate-900 (Dark) for Light Mode, text-white for Dark Mode
        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          // 🟢 FIX: Darker gray for light mode visibility
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;