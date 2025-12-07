import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'
import { personalInfo } from '../data/staticData'

const About = () => {
  const timeline = [
    {
      title: "B.Tech in Information Technology",
      organization: "University Name",
      period: "2021 - 2025",
      description: "Final-year student with focus on software development and problem solving."
    },
    {
      title: "MERN Stack Development",
      organization: "Self-Taught",
      period: "2022 - Present",
      description: "Built multiple full-stack applications using React, Node.js, Express, and MongoDB."
    },
    {
      title: "Competitive Programming",
      organization: "CodeChef, LeetCode",
      period: "2021 - Present",
      description: "4★ CodeChef rating and Knight on LeetCode. Solved 500+ problems across various categories."
    }
  ]

  const achievements = [
    { title: "4★ CodeChef", description: "Achieved 4-star rating on CodeChef" },
    { title: "Knight on LeetCode", description: "Reached Knight rank on LeetCode" },
    { title: "15+ Projects", description: "Built and deployed multiple web applications" },
    { title: "3+ Years Experience", description: "3+ years of coding experience" }
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
            title="About Me"
            subtitle="My journey as a MERN Stack Developer"
            centered
          />
        </motion.div>

        {/* Main content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left side - About text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Who I Am
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Hi, I'm {personalInfo.name}, a passionate {personalInfo.title}.
                I'm currently in my final year of B.Tech in Information Technology,
                focusing on building scalable web applications.
              </p>
              <p className="text-lg leading-relaxed">
                My journey in web development started 3+ years ago, and since then,
                I've worked on numerous projects ranging from e-commerce platforms to
                real-time collaboration tools. I believe in writing clean, maintainable
                code and am always eager to learn new technologies.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you'll find me solving DSA problems, contributing to
                open source projects, or exploring new technologies. I'm also an active
                competitive programmer with 4★ rating on CodeChef.
              </p>
            </div>

            {/* Skills highlight */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              My Journey
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-l-2 border-purple-500 pl-6 relative"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 text-sm mb-2">
                    {item.organization} • {item.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 100 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center"
              >
                <div className="text-3xl mb-4">🏆</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About