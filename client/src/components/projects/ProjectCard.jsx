import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom' // 1. Import hook
import { ExternalLink, Github, ArrowRight } from 'lucide-react' // Optional: Icons for better UI

const ProjectCard = ({ project, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate() // 2. Initialize hook

  const handleCardClick = () => {
    // 3. Navigate to the detail page using the project ID
    // Make sure your project data objects have a unique 'id' property!
    navigate(`/projects/${project.id}`)
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-[#0A0A0A] border border-transparent dark:border-white/10 group ${
        featured ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-black' : ''
      }`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick} // 4. Attach click handler
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-purple-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Featured
          </span>
        </div>
      )}

      {/* Project Image Area (Upgraded) */}
      <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
        {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        ) : (
            // Fallback if no image is provided
            <div className="text-6xl animate-pulse">🚀</div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white text-center">
            <p className="text-lg font-bold mb-3 flex items-center gap-2">
              View Case Study <ArrowRight size={16} />
            </p>
            
            <div className="flex justify-center space-x-3">
              {/* LIVE DEMO BUTTON */}
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-purple-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()} // Stop navigation
                >
                  <ExternalLink size={14} /> Demo
                </motion.a>
              )}
              
              {/* GITHUB BUTTON */}
              {project.githubRepo && (
                <motion.a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-bold border border-gray-700 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()} // Stop navigation
                >
                  <Github size={14} /> Code
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          {project.category && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 px-2 py-1 rounded">
              {project.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack?.slice(0, featured ? 4 : 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-[10px] font-mono bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > (featured ? 4 : 3) && (
            <span className="px-2 py-1 text-[10px] font-mono text-gray-400">
              +{project.techStack.length - (featured ? 4 : 3)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard