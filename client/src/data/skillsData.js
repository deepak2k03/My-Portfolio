export const skillsCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'React Router', level: 85, icon: '🛣️' },
      { name: 'Redux', level: 75, icon: '🔄' },
      { name: 'JavaScript', level: 95, icon: '📜' },
      { name: 'TypeScript', level: 80, icon: '📘' },
      { name: 'HTML5', level: 90, icon: '🌐' },
      { name: 'CSS3', level: 88, icon: '🎨' },
      { name: 'Tailwind CSS', level: 85, icon: '🎭' },
      { name: 'Bootstrap', level: 70, icon: '🅱️' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 90, icon: '🚂' },
      { name: 'MongoDB', level: 85, icon: '🍃' },
      { name: 'Mongoose', level: 80, icon: '🦫' },
      { name: 'REST APIs', level: 88, icon: '🔌' },
      { name: 'GraphQL', level: 65, icon: '📊' },
      { name: 'JWT', level: 75, icon: '🔑' },
      { name: 'Socket.io', level: 70, icon: '💬' }
    ]
  },
  {
    id: 'tools',
    name: 'Database & Tools',
    icon: '🔧',
    skills: [
      { name: 'Git', level: 90, icon: '📦' },
      { name: 'GitHub', level: 88, icon: '🐙' },
      { name: 'NPM', level: 85, icon: '📦' },
      { name: 'Docker', level: 60, icon: '🐳' },
      { name: 'Postman', level: 80, icon: '📬' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Chrome DevTools', level: 85, icon: '🔍' },
      { name: 'Webpack', level: 65, icon: '📦' }
    ]
  },
  {
    id: 'soft-skills',
    name: 'Soft Skills',
    icon: '💡',
    skills: [
      { name: 'Problem Solving', level: 95, icon: '🧩' },
      { name: 'Team Collaboration', level: 90, icon: '👥' },
      { name: 'Communication', level: 85, icon: '💬' },
      { name: 'Time Management', level: 88, icon: '⏰' },
      { name: 'Adaptability', level: 90, icon: '🔄' },
      { name: 'Critical Thinking', level: 92, icon: '🤔' }
    ]
  }
]

export const getSkillLevel = (level) => {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Intermediate'
  if (level >= 60) return 'Basic'
  return 'Beginner'
}