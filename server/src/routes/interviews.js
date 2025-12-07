import express from 'express'
import rateLimit from 'express-rate-limit'
import {
  getAllInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
  getAllCompanies,
  getFeaturedInterviews
} from '../controllers/interviewController.js'

const router = express.Router()

// Rate limiting for public endpoints
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
})

// Admin rate limiting
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many admin requests from this IP, please try again later.'
  }
})

// Public routes
router.get('/', publicLimiter, getAllInterviews)
router.get('/featured', publicLimiter, getFeaturedInterviews)
router.get('/companies', publicLimiter, getAllCompanies)
router.get('/:id', publicLimiter, getInterviewById)

// Admin routes (add middleware for authentication in production)
router.post('/', adminLimiter, createInterview)
router.put('/:id', adminLimiter, updateInterview)
router.delete('/:id', adminLimiter, deleteInterview)

export default router