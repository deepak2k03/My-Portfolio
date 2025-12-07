import { motion } from 'framer-motion'
import SectionHeader from '../components/common/SectionHeader'

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "Tech Company",
      duration: "Jan 2024 - Present",
      location: "Remote",
      type: "Internship",
      description: "Working on e-commerce platform development with focus on scalability and performance optimization.",
      achievements: [
        "Developed RESTful APIs using Node.js and Express",
        "Built responsive React components with TypeScript",
        "Implemented authentication and authorization systems",
        "Optimized database queries improving performance by 40%"
      ]
    },
    {
      title: "MERN Stack Developer",
      company: "Freelance",
      duration: "2022 - Present",
      location: "Remote",
      type: "Freelance",
      description: "Building custom web applications for clients using the MERN stack.",
      achievements: [
        "Developed 5+ full-stack applications",
        "Implemented real-time features using Socket.io",
        "Integrated payment gateways and third-party APIs",
        "Deployed applications on cloud platforms"
      ]
    },
    {
      title: "Training & Placement Representative",
      company: "College Name",
      duration: "2023 - 2024",
      location: "On-campus",
      type: "Leadership",
      description: "Organizing technical events and coordinating placement activities.",
      achievements: [
        "Organized 10+ technical workshops",
        "Coordinated placement drives with 20+ companies",
        "Mentored 50+ students for interviews",
        "Improved placement rate by 25%"
      ]
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      case 'Freelance':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
      case 'Leadership':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Experience"
            subtitle="My professional journey and achievements"
            centered
          />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mt-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.2,
                type: 'spring',
                stiffness: 100
              }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end lg:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

              {/* Content */}
              <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(exp.type)}`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      📅 {exp.duration}
                    </span>
                    <span className="flex items-center">
                      📍 {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-purple-200 dark:bg-purple-800"></div>
        </div>

        {/* Skills gained */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Skills & Technologies Used
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS', 'Git', 'AWS'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Experience