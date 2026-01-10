import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SectionHeader from '../components/common/SectionHeader'
import { Send, Mail, MapPin, CheckCircle2, ArrowRight, Github, Linkedin, Twitter, Loader2, User, Type, MessageSquare, Terminal } from 'lucide-react'

// --- 1. 3D Tilt Physics Engine (Reused for consistency) ---
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]) // Subtle tilt for form
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// --- 2. Sci-Fi Input Field ---
const InputField = ({ label, id, type = "text", register, validation, error, placeholder, isTextArea = false, icon: Icon }) => (
  <div className="space-y-2 group">
    <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-purple-400 transition-colors flex items-center gap-2">
      {Icon && <Icon size={12} />} {label}
    </label>
    <div className="relative overflow-hidden rounded-xl">
      {/* Background & Border */}
      <div className="absolute inset-0 bg-[#0F0F0F] border border-white/10 rounded-xl transition-colors group-focus-within:border-purple-500/50 group-focus-within:bg-white/5" />
      
      {/* The Actual Input */}
      {isTextArea ? (
        <textarea
          id={id}
          rows={4}
          {...register(id, validation)}
          placeholder={placeholder}
          className="relative w-full bg-transparent px-4 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all resize-none z-10"
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          placeholder={placeholder}
          className="relative w-full bg-transparent px-4 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all z-10"
        />
      )}

      {/* Laser Scanline Effect on Focus */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent translate-x-[-100%] group-focus-within:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </div>

    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[10px] text-red-400 font-mono pt-1 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-red-400 rounded-full animate-pulse" />
          ERROR: {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async data => {
    setIsSubmitting(true)
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app: const response = await fetch('/api/contact', ...)
      setIsSent(true)
      toast.success("Transmission Received!")
      reset()
    } catch (error) {
      toast.error('Transmission Failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-slate-50 py-24 relative overflow-hidden">
      
      {/* 1. Global Atmosphere */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        <SectionHeader 
          tag="Comms Link"
          title="Establish Connection"
          subtitle="Initiate a secure transmission for collaborations, project inquiries, or tech discussions."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          
          {/* --- LEFT SIDE: INFO HUD --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
             {/* Status Badge */}
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">System Online</span>
             </div>

             <div>
               <h3 className="text-3xl font-bold text-white mb-2">Contact Channels</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 I am currently available for freelance work and open to full-time opportunities.
               </p>
             </div>
             
             {/* Info Cards */}
             <div className="space-y-4">
               <a href="mailto:contact@deepak.dev" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all">
                 <div className="p-3 rounded-xl bg-[#0A0A0A] text-purple-400 group-hover:scale-110 transition-transform border border-white/5">
                   <Mail size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email Protocol</p>
                   <p className="text-white font-medium group-hover:text-purple-300 transition-colors">contact@deepak.dev</p>
                 </div>
               </a>

               <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                 <div className="p-3 rounded-xl bg-[#0A0A0A] text-blue-400 border border-white/5">
                   <MapPin size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Base Location</p>
                   <p className="text-white font-medium">India</p>
                 </div>
               </div>
             </div>

             {/* Social Inventory Grid */}
             <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">Social Uplinks</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com", color: "text-white" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "text-blue-400" },
                    { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "text-cyan-400" },
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.href}
                      target="_blank" 
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                      <social.icon className={`w-5 h-5 ${social.color} mb-2 group-hover:scale-110 transition-transform`} />
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider">{social.label}</span>
                    </a>
                  ))}
               </div>
             </div>
          </motion.div>

          {/* --- RIGHT SIDE: 3D TRANSMISSION FORM --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <TiltCard>
              <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0A] p-1 shadow-2xl shadow-black/50">
                
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl" />

                <div className="bg-[#050505] rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden">
                  
                  {/* Subtle Grid Background inside form */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {!isSent ? (
                      /* --- FORM STATE --- */
                      <motion.form 
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        onSubmit={handleSubmit(onSubmit)} 
                        className="relative z-10 space-y-6"
                      >
                        <div className="flex items-center gap-2 mb-6">
                           <Terminal size={18} className="text-purple-500" />
                           <span className="text-xs font-mono text-purple-500">TRANSMISSION_CONSOLE_V2</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField 
                            id="name" 
                            label="Codename / Name" 
                            placeholder="John Doe" 
                            register={register} 
                            validation={{ required: 'Name is required' }} 
                            error={errors.name} 
                            icon={User}
                          />
                          <InputField 
                            id="email" 
                            label="Reply Frequency" 
                            type="email" 
                            placeholder="john@example.com" 
                            register={register} 
                            validation={{ 
                              required: 'Email is required',
                              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                            }} 
                            error={errors.email} 
                            icon={Mail}
                          />
                        </div>
                        
                        <InputField 
                          id="subject" 
                          label="Subject Header" 
                          placeholder="Project Inquiry" 
                          register={register} 
                          validation={{ required: 'Subject is required' }} 
                          error={errors.subject} 
                          icon={Type}
                        />

                        <InputField 
                          id="message" 
                          label="Message Data" 
                          isTextArea 
                          placeholder="Tell me about your project..." 
                          register={register} 
                          validation={{ required: 'Message is required', minLength: { value: 10, message: 'Min 10 chars' } }} 
                          error={errors.message} 
                          icon={MessageSquare}
                        />

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 mt-2 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin" /> Uploading Data...
                            </>
                          ) : (
                            <>
                              Send Transmission <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    ) : (
                      /* --- SUCCESS STATE --- */
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center h-[400px]"
                      >
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                        >
                           <CheckCircle2 size={48} />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Transmission Secured</h3>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                          Your message has been encrypted and sent to my personal server. I will decrypt and respond shortly.
                        </p>
                        <button 
                          onClick={() => setIsSent(false)}
                          className="px-6 py-2 rounded-full border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          Send New Packet
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Contact