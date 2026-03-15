import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const isRetryableError = (error) => {
  const status = error?.response?.status
  const code = error?.code

  if (!status && (code === 'ECONNABORTED' || code === 'ERR_NETWORK')) {
    return true
  }

  return status === 408 || status === 425 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504
}

const withRetry = async (requestFn, { retries = 3, delayMs = 1500 } = {}) => {
  let lastError

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error

      if (attempt === retries || !isRetryableError(error)) {
        throw error
      }

      const backoffDelay = delayMs * (attempt + 1)
      await sleep(backoffDelay)
    }
  }

  throw lastError
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const interviewsAPI = {
  // Retry reads to handle backend cold starts for first-time visitors.
  getAll: (params = {}) => withRetry(() => api.get('/interviews', { params }), { retries: 4, delayMs: 1500 }),
  getById: (id) => withRetry(() => api.get(`/interviews/${id}`), { retries: 2, delayMs: 1000 }),
  create: (data) => api.post('/interviews', data),
  update: (id, data) => api.put(`/interviews/${id}`, data),
  delete: (id) => api.delete(`/interviews/${id}`),
}

export const contactAPI = {
  send: (data) => api.post('/contact', data),
}

export const systemAPI = {
  warmUp: () => withRetry(() => api.get('/health', { timeout: 10000 }), { retries: 2, delayMs: 1000 }),
}

export default api