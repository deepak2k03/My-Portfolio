import { body, validationResult } from 'express-validator'
import ContactMessage from '../models/ContactMessage.js'
import { sendEmail } from '../utils/emailService.js'

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),

  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
]

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = {}
      errors.array().forEach(error => {
        errorMessages[error.param] = error.msg
      })

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errorMessages
      })
    }

    const { name, email, subject, message } = req.body

    // Save contact message to database
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    })

    await contactMessage.save()

    // Send email notification
    try {
      await sendEmail({
        to: process.env.EMAIL_USER || 'deepak.singh@example.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent from portfolio contact form on ${new Date().toLocaleString()}</small></p>
        `
      })

      // Send confirmation email to sender
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Deepak Singh',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>I've received your message and will get back to you as soon as possible. Here's a copy of your message:</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Best regards,<br>Deepak Singh</p>
        `
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Continue even if email fails - the message is saved in database
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.'
    })

  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while submitting contact form'
    })
  }
}

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getAllContactMessages = async (req, res) => {
  try {
    const { page = 1, limit = 10, read, responded } = req.query

    const query = {}
    if (read !== undefined) query.read = read === 'true'
    if (responded !== undefined) query.responded = responded === 'true'

    const messages = await ContactMessage.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await ContactMessage.countDocuments(query)

    res.json({
      success: true,
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching contact messages'
    })
  }
}

// @desc    Mark contact message as read/responded
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateContactMessage = async (req, res) => {
  try {
    const { read, responded } = req.body

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read, responded },
      { new: true, runValidators: true }
    )

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact message updated successfully',
      data: message
    })
  } catch (error) {
    console.error('Error updating contact message:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while updating contact message'
    })
  }
}

// @desc    Delete contact message (admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while deleting contact message'
    })
  }
}

export { contactValidation }