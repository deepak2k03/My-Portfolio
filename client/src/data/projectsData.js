import PublicEye from '../image/PublicEye.png';
import NeoCube from '../image/NeoCube.png';
import SkillBridge from '../image/SkillBridge.png';
import Portfolio from '../image/Portfolio.png';
import Multimind from '../image/Multimind.png';
import Dtube from '../image/Dtube.png';
import Code_Complexity_Analyser from '../image/Code_Complexity_Analyser.png';
import Countries_Explorer from '../image/Countries_Explorer.png'; 
import DSA_Sheet from '../image/DSA_Sheet.png';
import digitalAgency from '../image/digitalAgency.png'
export const projects = [
  {
    id: 1,
    title: "PublicEye",
    description: "A web-based platform that tracks and displays government contracts, permits, and approvals in real time using blockchain technology.",
    image: PublicEye,
    techStack: ["React", "Node.js", "MongoDB", "Express", "JWT", "Tailwind CSS","Blockchain","Ethereum","Hardhat","Metamask"],
    liveDemo: "https://public-eye-five.vercel.app/",
    githubRepo: "https://github.com/deepak2k03/PublicEye",
    featured: true,
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "ExpressJS","Blockchain"],
    features: [
      "User authentication and authorization",
      "Project search and filtering",
      "Transaction verification using Blockchain",
      "Secure payment processing with Metamask",
      "Solidity smart contract",
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
    description: "NeoCube uses Gemini AI to generate precise, step-by-step learning roadmaps for any technology. Stop searching, start building.",
    longDescription: "Developed a full-stack MERN web platform that enables users to discover and track newly emerging technologies and frameworks, helping them stay aligned with industry trends. The platform integrates dynamic modules for curated learning resources and intelligent tool comparisons to support efficient upskilling. It also features automated insights and recommendation mechanisms that suggest cost-effective and sustainable technology alternatives, enhancing decision-making. AI-powered content categorization and trend analysis were leveraged to automate technology tracking workflows and deliver relevant, data-driven recommendations to users.",
    image: NeoCube,
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "JWT", -"Framer-Motion","Google Gemini API"],
    liveDemo: "https://github.com/deepak2k03/NeoCube",
    githubRepo: "https://github.com/deepak/task-management",
    featured: true,
    category: "Full Stack",
    tags: ["React", "Node.js", "Google geminin API", "MongoDB", "Real-time"],
    features: [
      "User Authentication and Authorization",
      "Roadmaps to Learn Technologies",
      "Technologies across variaous Domains",
      "AI Generated Roadmaps",
      "Progress tracking and analytics",
      "Role-based permissions",
      "Mobile responsive design"
    ],
    role: "Full Stack Developer",
    duration: "2 months",
    challenges: [
      "Implementing real-time updates",
      "Managing complex permissions",
      "Implementing Real Time Roadmap generation",
      "Building intuitive drag-and-drop interface"
    ]
  },
  {
    id: 3,
    title: "SkillBridge",
    description: "Analytics dashboard for social media management with data visualization and automated reporting.",
    longDescription: "Comprehensive social media analytics dashboard that aggregates data from multiple platforms. Features include customizable widgets, automated reporting, sentiment analysis, competitor tracking, and export capabilities. Built with focus on performance and data visualization.",
    image: SkillBridge,
    techStack: ["React", "Socket.io", "Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
    liveDemo: "https://skill-bridge-frontend.onrender.com/",
    githubRepo: "https://github.com/deepak2k03/Skill-Bridge",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Node", "Express", "MongoDB", "JWT"],
    features: [
      "Skill Exchaning",
      "Responsive UI",
      "Verification of Users",
      "Rating and Feedback",
      "Progress Tracking",
      "Adding to Favourites",
      "Real time Skill Matching"
    ],
    role: "Full Stack Developer",
    duration: "6 weeks",
    challenges: [
      "Handling large datasets efficiently",
      "Implementing real time skill matching",
      "Implementing real-time data updates",
      "Optimizing performance for data visualization"
    ]
  },
  {
    id: 4,
    title: "Dtube",
    description: "A full stack MERN Based web based youtube like Platform for video sharing",
    longDescription: "Engineered a full-stack e-commerce platform with a modern, highly responsive user interface optimized for 100% mobile compatibility to deliver a smooth and intuitive user experience. Implemented JWT-based authentication with role-based authorization to ensure secure access control, achieving an average login and signup response time of under 200 ms. Designed an efficient product search and filtering system based on parameters such as discounts and availability, improving product discoverability and reducing search time by 40%. Built a dynamic shopping cart with real-time quantity management and zero page reloads, successfully supporting over 100 concurrent users during testing. Additionally, developed a robust admin dashboard for product CRUD operations and inventory management, reducing manual operational effort by 50%.",
    image: Dtube,
    techStack: ["React", "Node.js", "MongoDB", "Express", "Cloudinary", "JWT"],
    liveDemo: "https://dtube.vercel.app/",
    githubRepo: "https://github.com/deepak2k03/Dtube",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Cloudinary", "JWT"],
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
      "Playlist Creation for videos",
      "Like",
      "Comments",
      "Subscribe other users"
    ]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "My personal portfolio website",
    longDescription: "A modern, minimalist, highly interactive personal portfolio website built with the MERN stack. Features dark/light mode toggle, smooth animations, interview experiences, and comprehensive project showcases.",
    image: Portfolio,
    techStack: ["React", "NodeJS", "ExpressJS", "MongoDB", "Framer-motion", "Nodemailer","Axios","React Hot Toast"],
    liveDemo: "https://my-portfolio-ashy-tau-86.vercel.app/",
    githubRepo: "https://github.com/deepak2k03/My-Portfolio",
    featured: false,
    category: "Full Stack",
    tags: ["React", "NodeJS", "ExpressJS", "MongoDB", "Full Stack"],
    features: [
      "Minimalist UI with glassmorphism effects and gradient backgrounds",
      "Seamless theme switching with localStorage persistence",
      "Optimized for mobile, tablet, and desktop devices",
      "Framer Motion powered animations and micro-interactions",
      "Detailed interview writeups with search and filtering",
      "Interactive project cards with modal details",
      "Functional contact form with email notifications",
      "Categorized skills with proficiency indicators",
      "Professional experience timeline"
    ],
    role: "Full Stack Developer",
    duration: "3 weeks",
    challenges: [
      "Creating smooth animations",
      "Optimizing for mobile performance",
      "Handling Contact section"
    ]
  },
  {
    id: 6,
    title: "Multimind",
    description: "An AI Models comparison platform",
    longDescription: "A Next.js application that allows users to compare responses from multiple AI models simultaneously using OpenRouter. Features include a responsive UI and real-time streaming responses.",
    image: Multimind,
    techStack: ["React", "OpenWeather API", "Mapbox", "Express", "Node.js", "Geolocation"],
    liveDemo: "https://weather-app-demo.com",
    githubRepo: "https://multi-mind-xi.vercel.app/",
    featured: false,
    category: "Full Stack",
    tags: ["NextJS", "OpenRouter API", "Nodejs", "TailwindCSS", "Frontend"],
    features: [
      "Multi-Model Comparison",
      "Real-time Streaming",
      "Responsive Design",
      "Best Response Selection",
      "Copy Functionality",
      "API Key Management"
    ],
    role: "Full Stack",
    duration: "3 weeks",
    challenges: [
      "Integrating API Key",
      "Response Extraction",
      "Optimizing for mobile performance"
    ]
  },
  {
    id: 7,
    title: "Code Complexity Analyser",
    description: "A platform to analyze the time and space complexity of your code",
    longDescription: "An online platform where you can know the time and space complexitites of your code in your preferable language in real time.",
    image: Code_Complexity_Analyser,
    techStack: ["React", "TailwindCSS"],
    liveDemo: "https://code-complexity-analyser.netlify.app/",
    githubRepo: "https://github.com/deepak/deepak2k03",
    featured: false,
    category: "Frontend",
    tags: ["React", "Weather API", "Maps", "Geolocation", "Frontend"],
    features: [
      "Real-time code complexity analysis",
      "Supports multiple languages",
      "Responsive Design"
    ],
    role: "Frontend Developer",
    duration: "1 weeks",
    challenges: [
      "Integrating Complexity calculation",
      "Creating smooth animations",
      "Optimizing for mobile performance"
    ]
  },
  {
    id: 8,
    title: "REST Countries Explorer",
    description: "Real-time weather tracking app with location services, forecasts, and interactive maps.",
    longDescription: "A beautiful weather application that provides accurate weather information with stunning visualizations. Features include location-based weather, extended forecasts, interactive maps, weather alerts, and customizable widgets. Integrates with multiple weather APIs for accuracy.",
    image: Countries_Explorer,
    techStack: ["HTML", "TailwindCSS", "API"],
    liveDemo: "https://rest-countries-api-info.netlify.app/",
    githubRepo: "https://github.com/deepak2k03",
    featured: false,
    category: "Frontend",
    tags: ["HTML", "Tailwind CSS", "JavaScript", "API", "Frontend"],
    features: [
      "Real-time Countries updates",
      "Fetching countries Data from API",
      "Searching countries Baesd on contiinents",
      "Dark and Light Mode"
    ],
    role: "Frontend Developer",
    duration: "1 week",
    challenges: [
      "Fetching countries Data From API",
      "Displaying countries data",
      "Optimizing for mobile performance",
      "Handling UI permissions"
    ]
  },
  {
    id: 9,
    title: "DSA Sheet",
    description: "A Complete Sheet of problems for practicing DSA",
    longDescription: "A curated Sheet consisting of problems on Data Structures and Algorithms for practicing.",
    image: DSA_Sheet,
    techStack: ["React", "NodeJS", "ExpressJS", "MongoDB", "JWT"],
    liveDemo: "https://deepak-s-dsa-sheet.vercel.app/",
    githubRepo: "https://github.com/deepak2k03/Deepak-s-DSA-Sheet",
    featured: false,
    category: "Full Stack",
    tags: ["React", "Node", "Express", "Mongodb", "Fullstack"],
    features: [
      "Authentication and uthorizaton using JWT",
      "Curated problems",
      "Complete topics of DSA",
      "Progress Tracking",
      "Problem of the Day",
      "Leaderboard"
    ],
    role: "Fullstack Developer",
    duration: "3 weeks",
    challenges: [
      "Creating smooth animations",
      "Optimizing for mobile performance"
    ]
  },
  {
    id: 10,
    title: "Digital Agency Page",
    description: "A Professional page for Digital Agency",
    longDescription: "This is a professional level page for a digital agency",
    image: digitalAgency,
    techStack: ["React", "TailwindCSS", "JavaScript"],
    liveDemo: "https://assesment-react.netlify.app/",
    githubRepo: "https://github.com/deepak2k03/Hike-Digital-Agency-Assessment",
    featured: false,
    category: "Frontend",
    tags: ["React", "TailwindCSS", "JavaScript"],
    features: [
      "Responsive Design",
      "Professional UI",
      "Smooth animations"
    ],
    role: "Frontend Developer",
    duration: "2 Days",
    challenges: [
      "Creating smooth animations",
      "Optimizing for mobile performance"
    ]
  },
  {
    id: 10,
    title: "Digital Agency Page",
    description: "A Professional page for Digital Agency",
    longDescription: "This is a professional level page for a digital agency",
    image: digitalAgency,
    techStack: ["React", "TailwindCSS", "JavaScript"],
    liveDemo: "https://assesment-react.netlify.app/",
    githubRepo: "https://github.com/deepak2k03/Hike-Digital-Agency-Assessment",
    featured: false,
    category: "Backend",
    tags: ["React", "TailwindCSS", "JavaScript"],
    features: [
      "Responsive Design",
      "Professional UI",
      "Smooth animations"
    ],
    role: "Frontend Developer",
    duration: "2 Days",
    challenges: [
      "Creating smooth animations",
      "Optimizing for mobile performance"
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