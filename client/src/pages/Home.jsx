import { motion } from 'framer-motion'
import HeroSection from '../components/layout/HeroSection'
import SectionHeader from '../components/common/SectionHeader'
import { skillsCategories } from '../data/skillsData'
import { getFeaturedProjects } from '../data/projectsData'
import SkillCard from '../components/skills/SkillCard'
import ProjectCard from '../components/projects/ProjectCard'

const Home = () => {
  const featuredProjects = getFeaturedProjects()
  const featuredSkills = skillsCategories.flatMap(category =>
    category.skills.filter(skill => skill.level >= 85).slice(0, 2)
  )

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Skills Preview */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Core Technologies"
              subtitle="Technologies I work with most frequently"
              centered
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12"
          >
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <SkillCard skill={skill} compact />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/skills"
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Skills
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Featured Projects"
              subtitle="Some of my recent work that I'm particularly proud of"
              centered
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} featured />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/projects"
              className="inline-flex items-center px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Quick About Preview */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Left side - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl gradient-bg p-8 flex items-center justify-center">
                <div className="text-8xl">👨‍💻</div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                💡
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚀
              </motion.div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="About Me"
                subtitle="Passionate MERN Stack Developer"
              />

              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a final-year B.Tech IT student specializing in the MERN stack.
                  I love building scalable web applications and solving complex problems
                  through code.
                </p>
                <p>
                  My journey in web development started 3+ years ago, and since then,
                  I've worked on numerous projects ranging from e-commerce platforms
                  to real-time collaboration tools.
                </p>
                <p>
                  I believe in writing clean, maintainable code and am always eager to
                  learn new technologies and best practices. When I'm not coding, you'll
                  find me solving DSA problems or contributing to open source projects.
                </p>
              </div>

              <motion.a
                href="/about"
                className="inline-flex items-center mt-8 px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Me
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home