import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import SkillCard from '../components/skills/SkillCard'
import { skillsCategories } from '../data/skillsData'

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSkills = selectedCategory === 'All'
    ? skillsCategories.flatMap(category => category.skills)
    : skillsCategories.find(cat => cat.id === selectedCategory)?.skills || []

  const allCategories = [
    { id: 'All', name: 'All Skills', icon: '🎯' },
    ...skillsCategories
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Technologies I work with and my proficiency levels"
            centered
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'gradient-bg text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.05,
                type: 'spring',
                stiffness: 100
              }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Skills Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Frontend Development
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Building responsive and interactive user interfaces with React, modern CSS,
                  and state management solutions. Focus on performance and user experience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Backend Development
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Creating scalable REST APIs, database design, and server-side logic
                  with Node.js, Express, and MongoDB. Experienced in authentication and
                  data security.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills