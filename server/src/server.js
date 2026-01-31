// server/src/server.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import connectDB from './config/db.js'

// Route Imports
import interviewsRouter from './routes/interviews.js'
import contactRouter from './routes/contact.js'

// Connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// ----------------------------------------------------------------------
// 🛑 SECURITY MIDDLEWARE (The Gatekeeper)
// ----------------------------------------------------------------------
const requireAdminSecret = (req, res, next) => {
  // 1. Check for the custom header 'x-admin-secret'
  const providedSecret = req.headers['x-admin-secret'];
  
  // 2. Compare it with your Render Environment Variable
  // (If ADMIN_SECRET is not set in env, we deny access for safety)
  if (!process.env.ADMIN_SECRET || providedSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access Denied: Invalid or missing Admin Secret.' 
    });
  }
  
  // 3. If it matches, let the request pass
  next();
};

// ----------------------------------------------------------------------
// 🛡️ BASIC MIDDLEWARE (Helmet & CORS)
// ----------------------------------------------------------------------
app.use(helmet()) // Basic security headers

// Enhanced CORS Configuration
// Allows: Localhost (React/Vite) AND your Production Vercel App
const allowedOrigins = [
  'http://localhost:3000',      // CRA default
  'http://localhost:5173',      // Vite default
  'https://deepak-singh.pages.dev',      //coudflare
  process.env.CLIENT_URL,       // Your Vercel URL (from Render Env Vars)
  // 'https://your-portfolio.vercel.app' // Hardcode your Vercel URL here if env fails
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl/Postman)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      console.log('Blocked by CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret'] // Added x-admin-secret
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`)
  next()
})

// ----------------------------------------------------------------------
// 🌐 ROUTES
// ----------------------------------------------------------------------

// 1. Root Route (For Render Health Check)
app.get('/', (req, res) => {
  res.send('API is running. Access endpoints at /api/...')
})

// 2. Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'Active', env: process.env.NODE_ENV })
})

// 3. Interviews Route (PROTECTED)
// GET = Public (Anyone can view)
// POST/PUT/DELETE = Private (Needs Admin Secret)
app.use('/api/interviews', (req, res, next) => {
  if (req.method === 'GET') {
    return next(); // Public access
  }
  return requireAdminSecret(req, res, next); // Protected access
}, interviewsRouter);

// 4. Contact Route (Public)
app.use('/api/contact', contactRouter)

// 5. 404 Handler
app.all('*', (req, res) => {
  res.status(404).json({ success: false, error: `API endpoint not found: ${req.originalUrl}` })
})

// ----------------------------------------------------------------------
// 🔥 ERROR HANDLER
// ----------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('🔥 Error middleware:', err.stack)

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ success: false, error: 'Validation failed', details: errors })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid ID format' })
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ success: false, error: `${field} already exists` })
  }

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Allowed Origins:`, allowedOrigins)
})

export default app