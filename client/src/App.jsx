import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion' 
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/layout/ScrollToTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Interviews from './pages/Interviews'
import InterviewDetail from './pages/InterviewDetail'

function App() {
  const location = useLocation() 

  return (
    // 🔴 FIX: Changed hardcoded 'bg-[#020202]' to dynamic 'bg-gray-50 dark:bg-[#020202]'
    // 🔴 FIX: Changed 'text-slate-50' to 'text-slate-900 dark:text-slate-50'
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-50 selection:bg-purple-500/30 font-sans transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/:id" element={<InterviewDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App