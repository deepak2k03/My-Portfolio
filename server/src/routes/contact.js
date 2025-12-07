import express from 'express'
import rateLimit from 'express-rate-limit'
import { submitContact, getAllContactMessages, updateContactMessage, deleteContactMessage, contactValidation } from '../controllers/contactController.js'

const router = express.Router()

// Rate limiting for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: {
    success: false,
    error: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Public route for contact form submission
router.post('/', contactLimiter, contactValidation, submitContact)

// Admin routes (add middleware for authentication in production)
router.get('/', getAllContactMessages)
router.put('/:id', updateContactMessage)
router.delete('/:id', deleteContactMessage)

export default router