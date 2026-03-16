import InterviewExperience from '../models/InterviewExperience.js'

const MAX_LIMIT = 100

const buildPreviewText = (text = '') => {
  const normalizedText = String(text).trim()

  if (normalizedText.length <= 150) {
    return normalizedText
  }

  return `${normalizedText.slice(0, 150)}...`
}

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
      search,
      summary = 'false',
      includeTotal = 'false'
    } = req.query

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1)
    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), MAX_LIMIT)
    const summaryMode = summary === 'true'
    const shouldIncludeTotal = includeTotal === 'true'

    const query = {}

    // Build query filters
    if (company) query.company = new RegExp(company, 'i')
    if (role) query.role = new RegExp(role, 'i')
    if (difficulty) query.difficulty = difficulty
    if (type) query.type = type
    if (featured === 'true') query.featured = true

    if (search) {
      query.$text = { $search: search }
    }

    let interviewsQuery = InterviewExperience.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)

    if (summaryMode) {
      interviewsQuery = interviewsQuery.select({
        company: 1,
        role: 1,
        date: 1,
        difficulty: 1,
        type: 1,
        tags: 1,
        featured: 1,
        createdAt: 1,
        'detailedWriteup.preparation': 1,
      })
    }

    if (search) {
      interviewsQuery = interviewsQuery
        .select({ score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
    } else {
      interviewsQuery = interviewsQuery.sort({ createdAt: -1 })
    }

    const interviewsResult = await interviewsQuery.lean()
    const interviews = summaryMode
      ? interviewsResult.map(({ detailedWriteup, ...interview }) => ({
          ...interview,
          previewText: buildPreviewText(detailedWriteup?.preparation),
        }))
      : interviewsResult

    const total = shouldIncludeTotal ? await InterviewExperience.countDocuments(query) : null

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')

    res.json({
      interviews,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: total === null ? null : Math.ceil(total / limitNumber)
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