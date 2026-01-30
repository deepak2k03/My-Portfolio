import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  FileText, // Icon for Resume
  Terminal, // Icon for projects
  Cpu,      // Icon for experience
  Trophy,   // Icon for achievements
  Sword     // Icon for LeetCode (alternative)
} from 'lucide-react'

// Specific Brand Icons from react-icons
import { 
  SiCodechef, 
  SiCodeforces, 
  SiLeetcode 
} from 'react-icons/si'

export const personalInfo = {
  name: "Deepak Singh",
  title: "Full Sack Stack Developer | Problem Solver",
  description: "Building scalable web applications and loving every moment of problem-solving.",
  email: "sman59472@gmail.com",
  location: "Ghazipur, Uttar Pradesh, India",
  avatar: "/avatar.jpg", // Make sure avatar.jpg is in client/public folder
  
  // 📄 RESUME LINK:
  // Option 1: Put 'resume.pdf' in your 'client/public' folder
  // Option 2: Paste your Google Drive link here (make sure it's public)
  resume: "https://drive.google.com/file/d/1WIST7E8u9AiI9jWWXNtB6YhsF1ylD0RS/view?usp=sharing" 
}

export const stats = [
  {
    label: "Years of Experience",
    value: "3+",
    icon: Cpu // Passing component reference
  },
  {
    label: "CodeChef Rating",
    value: "4★",
    icon: Trophy
  },
  {
    label: "LeetCode",
    value: "Knight",
    icon: Sword
  },
  {
    label: "Projects Completed",
    value: "15+",
    icon: Terminal
  }
]

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/deepak2k03",
    icon: Github
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/deepak-singh-1b8590257/",
    icon: Linkedin
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/deepak2k03",
    icon: SiLeetcode // Official Brand Icon
  },
  {
    name: "CodeChef",
    url: "https://codechef.com/users/deepak2k03",
    icon: SiCodechef // Official Brand Icon
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/deepak2k03",
    icon: SiCodeforces // Official Brand Icon
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/deepak2k03",
    icon: Instagram
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@AlgoLad-deepak",
    icon: Youtube
  },
  {
    name: "Twitter",
    url: "https://x.com/deepak2k03",
    icon: Twitter
  }
]

export const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Skills", href: "/skills", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Experience", href: "/experience", current: false },
  { name: "Achievements", href: "/achievements", current: false },
  { name: "Interviews", href: "/interviews", current: false },
  { name: "Contact", href: "/contact", current: false }
]