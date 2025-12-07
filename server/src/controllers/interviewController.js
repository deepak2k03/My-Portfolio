import InterviewExperience from '../models/InterviewExperience.js'

// @desc    Get all interview experiences
// @route   GET /api/interviews
// @access  Public
export const getAllInterviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      company,
      role,
      difficulty,
      type,
      featured,
      search
    } = req.query

    const query = {}

    // Build query filters
    if (company) query.company = new RegExp(company, 'i')
    if (role) query.role = new RegExp(role, 'i')
    if (difficulty) query.difficulty = difficulty
    if (type) query.type = type
    if (featured === 'true') query.featured = true

    let interviews

    if (search) {
      interviews = await InterviewExperience.search(search)
        .find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
    } else {
      interviews = await InterviewExperience.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
    }

    const total = await InterviewExperience.countDocuments(query)

    res.json({
      interviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching interviews:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching interviews'
    })
  }
}

// @desc    Get single interview experience by ID
// @route   GET /api/interviews/:id
// @access  Public
export const getInterviewById = async (req, res) => {
  try {
    const interview = await InterviewExperience.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview experience not found'
      })
    }

    res.json({
      success: true,
      interview
    })
  } catch (error) {
    console.error('Error fetching interview:', error)

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Interview experience not found'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Server error while fetching interview'
    })
  }
}

// @desc    Create new interview experience
// @route   POST /api/interviews
// @access  Private (Admin)
export const createInterview = async (req, res) => {
  try {
    const interviewData = req.body

    const interview = new InterviewExperience(interviewData)
    await interview.save()

    res.status(201).json({
      success: true,
      message: 'Interview experience created successfully',
      interview
    })
  } catch (error) {
    console.error('Error creating interview:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while creating interview experience'
    })
  }
}

// @desc    Update interview experience
// @route   PUT /api/interviews/:id
// @access  Private (Admin)
export const updateInterview = async (req, res) => {
  try {
    const interview = await InterviewExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview experience not found'
      })
    }

    res.json({
      success: true,
      message: 'Interview experience updated successfully',
      interview
    })
  } catch (error) {
    console.error('Error updating interview:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while updating interview experience'
    })
  }
}

// @desc    Delete interview experience
// @route   DELETE /api/interviews/:id
// @access  Private (Admin)
export const deleteInterview = async (req, res) => {
  try {
    const interview = await InterviewExperience.findByIdAndDelete(req.params.id)

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview experience not found'
      })
    }

    res.json({
      success: true,
      message: 'Interview experience deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting interview:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while deleting interview experience'
    })
  }
}

// @desc    Get all unique companies for filter
// @route   GET /api/interviews/companies
// @access  Public
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await InterviewExperience.distinct('company')
    res.json({
      success: true,
      companies: companies.sort()
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching companies'
    })
  }
}

// @desc    Get featured interviews
// @route   GET /api/interviews/featured
// @access  Public
export const getFeaturedInterviews = async (req, res) => {
  try {
    const { limit = 3 } = req.query

    const interviews = await InterviewExperience.find({ featured: true })
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      interviews
    })
  } catch (error) {
    console.error('Error fetching featured interviews:', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching featured interviews'
    })
  }
}