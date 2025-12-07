import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  role: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  type: {
    type: String,
    required: true,
    enum: ['On-campus', 'Off-campus', 'Referral', 'Direct Apply'],
    default: 'Off-campus'
  },
  rounds: [{
    roundName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    questionsAsked: [{
      type: String,
      trim: true
    }],
    duration: {
      type: String,
      trim: true
    },
    tips: {
      type: String,
      trim: true
    }
  }],
  detailedWriteup: {
    preparation: {
      type: String,
      required: true,
      minlength: 100,
      trim: true
    },
    technicalQuestions: [{
      type: String,
      trim: true
    }],
    systemDesign: {
      type: String,
      trim: true
    },
    projectDiscussion: {
      type: String,
      trim: true
    },
    behavioralQuestions: [{
      type: String,
      trim: true
    }],
    myPerformance: {
      type: String,
      required: true,
      trim: true
    },
    reflections: {
      type: String,
      required: true,
      trim: true
    },
    tipsForFuture: {
      type: String,
      required: true,
      trim: true
    },
    outcome: {
      type: String,
      trim: true
    }
  },
  companyLogo: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Create text index for search functionality
interviewSchema.index({
  company: 'text',
  role: 'text',
  'detailedWriteup.preparation': 'text',
  'detailedWriteup.reflections': 'text',
  tags: 'text'
})

// Virtual for preview text
interviewSchema.virtual('previewText').get(function() {
  const text = this.detailedWriteup.preparation || ''
  return text.length > 150 ? text.substring(0, 150) + '...' : text
})

// Static method for search
interviewSchema.statics.search = function(query) {
  return this.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
}

export default mongoose.model('InterviewExperience', interviewSchema)