import PublicEye from '../image/PublicEye.png';
import NeoCube from '../image/NeoCube.png';
import SkillBridge from '../image/SkillBridge.png';
import Portfolio from '../image/Portfolio.png';
import Multimind from '../image/Multimind.png';
import Dtube from '../image/Dtube.png';
import Code_Complexity_Analyser from '../image/Code_Complexity_Analyser.png';
import Countries_Explorer from '../image/Countries_Explorer.png'; 
import DSA_Sheet from '../image/DSA_Sheet.png';
export const projects = [
  {
    id: 1,
    title: "PublicEye",
    description: "A web-based platform that tracks and displays government contracts, permits, and approvals in real time using blockchain technology.",
    image: PublicEye,
    techStack: ["React", "Node.js", "MongoDB", "Express", "JWT", "Tailwind CSS","Blockchain"],
    liveDemo: "https://publiceye-two.vercel.app/",
    githubRepo: "https://github.com/deepak2k03/PublicEye",
    featured: true,
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "ExpressJS"],
    features: [
      "User authentication and authorization",
      "Product search and filtering",
      "Shopping cart with real-time updates",
      "Secure payment processing with Stripe",
      "Order tracking and history",
      "Admin dashboard for management",
      "Responsive design for all devices"
    ],
    role: "Full Stack Developer",
    duration: "3 months",
    challenges: [
      "Implementing secure payment processing",
      "Managing complex state for shopping cart",
      "Optimizing database queries for large product catalog",
      "Building responsive admin dashboard"
    ]
  },
  {
    id: 2,
    title: "NeoCube",
    description: "Collaborative task management tool with real-time updates, file sharing, and team collaboration features.",
    longDescription: "A modern task management application designed for team collaboration. Features drag-and-drop interface, real-time updates using Socket.io, file attachments, comments, notifications, and detailed analytics. The system supports multiple projects, teams, and role-based permissions.",
    image: NeoCube,
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "JWT", "Material-UI"],
    liveDemo: "https://task-manager-demo.com",
    githubRepo: "https://github.com/deepak/task-management",
    featured: true,
    category: "Full Stack",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Real-time"],
    features: [
      "Drag and drop task management",
      "Real-time collaboration",
      "File attachments and sharing",
      "Team messaging and comments",
      "Progress tracking and analytics",
      "Role-based permissions",
      "Mobile responsive design"
    ],
    role: "Full Stack Developer",
    duration: "2 months",
    challenges: [
      "Implementing real-time updates",
      "Managing complex permissions",
      "Optimizing file upload and storage",
      "Building intuitive drag-and-drop interface"
    ]
  },
  {
    id: 3,
    title: "SkillBridge",
    description: "Analytics dashboard for social media management with data visualization and automated reporting.",
    longDescription: "Comprehensive social media analytics dashboard that aggregates data from multiple platforms. Features include customizable widgets, automated reporting, sentiment analysis, competitor tracking, and export capabilities. Built with focus on performance and data visualization.",
    image: SkillBridge,
    techStack: ["React", "D3.js", "Node.js", "Express", "MongoDB", "Chart.js", "REST APIs"],
    liveDemo: "https://dashboard-demo.com",
    githubRepo: "https://github.com/deepak/social-dashboard",
    featured: false,
    category: "Full Stack",
    tags: ["React", "D3.js", "Chart.js", "Analytics", "Dashboard"],
    features: [
      "Multi-platform data integration",
      "Interactive data visualization",
      "Automated report generation",
      "Customizable dashboard widgets",
      "Sentiment analysis",
      "Competitor tracking",
      "Data export in multiple formats"
    ],
    role: "Frontend Developer",
    duration: "6 weeks",
    challenges: [
      "Handling large datasets efficiently",
      "Creating responsive charts and graphs",
      "Implementing real-time data updates",
      "Optimizing performance for data visualization"
    ]
  },
  {
    id: 4,
    title: "Dtube",
    description: "Modern blogging platform with rich text editor, SEO optimization, and content management.",
    longDescription: "A feature-rich blogging platform with advanced content management capabilities. Includes markdown support, SEO optimization, comment system, search functionality, and author analytics. Built with focus on content creator experience and SEO performance.",
    image: Dtube,
    techStack: ["React", "Node.js", "MongoDB", "Express", "SEO", "Markdown", "Redis"],
    liveDemo: "https://blog-platform-demo.com",
    githubRepo: "https://github.com/deepak/blog-platform",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "SEO", "Markdown"],
    features: [
      "Rich text editor with markdown support",
      "SEO optimization tools",
      "Comment system with moderation",
      "Advanced search functionality",
      "Author analytics and insights",
      "Social media integration",
      "Mobile-responsive design"
    ],
    role: "Full Stack Developer",
    duration: "2 months",
    challenges: [
      "Implementing SEO best practices",
      "Building rich text editor",
      "Optimizing content delivery",
      "Managing user comments and moderation"
    ]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: Portfolio,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://github.com/deepak/weather-app",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time weather updates",
      "Location-based services",
      "Interactive weather maps",
      "Extended forecasts",
      "Weather alerts and notifications",
      "Customizable widgets",
      "Beautiful weather animations"
    ],
    role: "Frontend Developer",
    duration: "3 weeks",
    challenges: [
      "Integrating multiple weather APIs",
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling location permissions"
    ]
  },
  {
    id: 6,
    title: "Multimind",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: Multimind,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://github.com/deepak/weather-app",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time weather updates",
      "Location-based services",
      "Interactive weather maps",
      "Extended forecasts",
      "Weather alerts and notifications",
      "Customizable widgets",
      "Beautiful weather animations"
    ],
    role: "Frontend Developer",
    duration: "3 weeks",
    challenges: [
      "Integrating multiple weather APIs",
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling location permissions"
    ]
  },
  {
    id: 7,
    title: "Code Complexity Analyser",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: Code_Complexity_Analyser,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://github.com/deepak/weather-app",
    featured: false,
    category: "Frontend",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time weather updates",
      "Location-based services",
      "Interactive weather maps",
      "Extended forecasts",
      "Weather alerts and notifications",
      "Customizable widgets",
      "Beautiful weather animations"
    ],
    role: "Frontend Developer",
    duration: "3 weeks",
    challenges: [
      "Integrating multiple weather APIs",
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling location permissions"
    ]
  },
  {
    id: 8,
    title: "REST Countries Explorer",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: Countries_Explorer,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://github.com/deepak/weather-app",
    featured: false,
    category: "Frontend",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time weather updates",
      "Location-based services",
      "Interactive weather maps",
      "Extended forecasts",
      "Weather alerts and notifications",
      "Customizable widgets",
      "Beautiful weather animations"
    ],
    role: "Frontend Developer",
    duration: "3 weeks",
    challenges: [
      "Integrating multiple weather APIs",
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling location permissions"
    ]
  },
  {
    id: 9,
    title: "DSA Sheet",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: DSA_Sheet,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://github.com/deepak/weather-app",
    featured: false,
    category: "Frontend",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time weather updates",
      "Location-based services",
      "Interactive weather maps",
      "Extended forecasts",
      "Weather alerts and notifications",
      "Customizable widgets",
      "Beautiful weather animations"
    ],
    role: "Frontend Developer",
    duration: "3 weeks",
    challenges: [
      "Integrating multiple weather APIs",
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling location permissions"
    ]
  }
]

export const getProjectsByCategory = (category) => {
  if (category === 'All') return projects
  return projects.filter(project => project.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured)
}

export const getAllCategories = () => {
  return ['All', ...new Set(projects.map(project => project.category))]
}

export const getProjectById = (id) => {
  return projects.find(project => project.id == id);
}