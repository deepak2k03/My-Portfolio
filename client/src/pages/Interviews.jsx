import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { interviewsAPI } from '../utils/api'

const Interviews = () => {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    company: '',
    difficulty: '',
    type: '',
    search: ''
  })

  // Sample data for demonstration
  const sampleInterviews = [
    {
      _id: '1',
      company: 'Microsoft',
      role: 'MERN Stack Intern',
      date: '2024-02-10',
      difficulty: 'Medium',
      type: 'Referral',
      previewText: 'I spent 3 months preparing for this interview. My strategy focused heavily on the MERN stack since that\'s what the role specifically required...',
      tags: ['react', 'nodejs', 'mongodb'],
      featured: true
    },
    {
      _id: '2',
      company: 'Google',
      role: 'SDE Intern',
      date: '2024-01-15',
      difficulty: 'Hard',
      type: 'Off-campus',
      previewText: 'The Google interview process was rigorous but fair. I went through multiple rounds including technical interviews and system design...',
      tags: ['algorithms', 'system-design', 'react'],
      featured: true
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Interview Experiences"
            subtitle="Detailed writeups of my interview experiences to help other candidates"
            centered
          />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filters.company}
                onChange={(e) => setFilters({...filters, company: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              >
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All</option>
                <option value="On-campus">On-campus</option>
                <option value="Off-campus">Off-campus</option>
                <option value="Referral">Referral</option>
                <option value="Direct Apply">Direct Apply</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Interview Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {sampleInterviews.map((interview, index) => (
            <motion.div
              key={interview._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {interview.company}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {interview.role}
                  </p>
                </div>
                {interview.featured && (
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>📅 {new Date(interview.date).toLocaleDateString()}</span>
                <span>🎯 {interview.difficulty}</span>
                <span>🏢 {interview.type}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {interview.previewText}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {interview.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity duration-200">
                Read Full Experience
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-all duration-300">
            Load More Experiences
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Interviews