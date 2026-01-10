import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion' // Import AnimatePresence
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/layout/ScrollToTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Interviews from './pages/Interviews'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import InterviewDetail from './pages/InterviewDetail'
import Achievements from './pages/Achievements'

function App() {
  const location = useLocation() // Needed for AnimatePresence to track route changes

  return (
    // 1. Updated Background to match new Dark Theme (#020202)
    <div className="min-h-screen bg-[#020202] text-slate-50 selection:bg-purple-500/30 font-sans">
      <Navbar />
      <ScrollToTop />
      
      {/* 2. Removed 'pt-16'. New Hero section needs to be at the very top behind the glass navbar */}
      <main className="relative">
        
        {/* 3. Global Page Transition Wrapper */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/:id" element={<InterviewDetail />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        
      </main>

      <Footer />
    </div>
  )
}

export default App