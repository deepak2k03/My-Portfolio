// client/src/data/skillsData.js

// You can use emojis or string icons if you don't want to import Lucide icons here
// The UI component handles the icons dynamically now.

export const skillsCategories = [
  {
    id: 'Frontend',
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: 'ts' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'Framer Motion', level: 80, icon: '✨' },
      { name: 'Redux', level: 75, icon: '🔄' },
      { name: 'Next.js', level: 85, icon: '▲' },
    ],
  },
  {
    id: 'Backend',
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'Express', level: 90, icon: '🚂' },
      { name: 'MongoDB', level: 85, icon: '🍃' },
      { name: 'PostgreSQL', level: 70, icon: '🐘' },
      { name: 'REST APIs', level: 92, icon: '🔌' },
      { name: 'GraphQL', level: 65, icon: '🕸️' },
    ],
  },
  {
    id: 'Tools',
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 90, icon: '🐙' },
      { name: 'GitHub', level: 90, icon: '🐙' },
      { name: 'Docker', level: 90, icon: '🐳' },
      { name: 'Linux', level: 90, icon: '🐳' },
      { name: 'Jenkins', level: 90, icon: '🐳' },
      { name: 'Kubernetes', level: 90, icon: '🐳' },
      { name: 'AWS', level: 50, icon: '☁️' },
      { name: 'Postman', level: 95, icon: '🚀' },
      { name: 'VS Code', level: 100, icon: '📝' },
    ],
  },
  {
    id: 'SoftSkills',
    name: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 90, icon: '🧩' },
      { name: 'Team Leadership', level: 85, icon: '👥' },
      { name: 'Communication', level: 95, icon: '📢' },
    ],
  },
];

export const getSkillLevel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Beginner';
};