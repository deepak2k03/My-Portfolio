import { useState } from 'react'
import { motion } from 'framer-motion'

const ProjectCard = ({ project, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
        featured ? 'ring-2 ring-purple-500 ring-offset-2' : ''
      }`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        // Handle project detail modal or navigation
        console.log('Project clicked:', project.title)
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      {/* Project image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl">🚀</div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white text-center">
            <p className="text-lg font-semibold mb-2">View Details</p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </motion.a>
              <motion.a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project content */}
      <div className="p-6 bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, featured ? 4 : 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > (featured ? 4 : 3) && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              +{project.techStack.length - (featured ? 4 : 3)} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <motion.a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 gradient-bg text-white rounded-lg text-center hover:opacity-90 transition-opacity duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo
          </motion.a>
          <motion.a
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard