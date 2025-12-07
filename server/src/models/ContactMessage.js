import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    trim: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  responded: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better query performance
contactMessageSchema.index({ createdAt: -1 })
contactMessageSchema.index({ read: 1 })

export default mongoose.model('ContactMessage', contactMessageSchema)