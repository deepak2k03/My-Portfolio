import axios from 'axios'

const getApiBaseUrl = () => {
  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()

  if (configuredApiUrl) {
    return configuredApiUrl
  }

  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api'
    }

    return `${origin}/api`
  }

  return 'http://localhost:5000/api'
}

const API_BASE_URL = getApiBaseUrl()

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const DEFAULT_TIMEOUT_MS = 10000

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
  timeout: DEFAULT_TIMEOUT_MS,
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
  // Retry reads with generous timeouts to survive backend cold starts (~30-50s).
  getAll: (params = {}) => withRetry(() => api.get('/interviews', { params, timeout: 30000 }), { retries: 3, delayMs: 2000 }),
  getById: (id) => withRetry(() => api.get(`/interviews/${id}`, { timeout: 30000 }), { retries: 3, delayMs: 2000 }),
  create: (data) => api.post('/interviews', data),
  update: (id, data) => api.put(`/interviews/${id}`, data),
  delete: (id) => api.delete(`/interviews/${id}`),
}

export const contactAPI = {
  send: (data) => api.post('/contact', data),
}

export const systemAPI = {
  warmUp: () => withRetry(() => api.get('/health', { timeout: 45000 }), { retries: 4, delayMs: 3000 }),
}

// Shared warm-up promise: call once at app boot, pages await this before fetching data.
// Resolves when the backend responds to /health; swallows errors so pages still try their own fetch.
let _backendReadyPromise = null
export const backendReady = () => {
  if (!_backendReadyPromise) {
    _backendReadyPromise = systemAPI.warmUp().catch(() => {
      // Warm-up failed after all retries – let pages attempt their own requests anyway.
    })
  }
  return _backendReadyPromise
}

export default api