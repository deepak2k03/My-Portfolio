import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import ProjectCard from '../components/projects/ProjectCard'
import { projects, getAllCategories } from '../data/projectsData'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const allCategories = getAllCategories()

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Projects"
            subtitle="A collection of my work and side projects"
            centered
          />
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Projects ⭐
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                >
                  <ProjectCard project={project} featured />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'gradient-bg text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* No projects found */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Project Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {projects.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {featuredProjects.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Featured Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {allCategories.length - 1}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Categories</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects