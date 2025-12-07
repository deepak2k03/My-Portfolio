import { motion } from 'framer-motion'
import { personalInfo } from '../../data/staticData'

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: '📧',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: '📍',
      label: 'Location',
      value: personalInfo.location,
      href: null
    },
    {
      icon: '📱',
      label: 'Available for',
      value: 'Freelance & Full-time',
      href: null
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Information
      </h3>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="text-2xl">{detail.icon}</div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {detail.label}
              </div>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  {detail.value}
                </a>
              ) : (
                <div className="text-gray-900 dark:text-white font-medium">
                  {detail.value}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ContactInfo