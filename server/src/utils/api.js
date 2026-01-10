import axios from 'axios'

// 1. DYNAMIC BASE URL
// If we are in Production (Vercel), use the VITE_API_URL env variable.
// If we are in Development (Local), use localhost.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// 2. CREATE AXIOS INSTANCE
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important if you use cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Call Failed:", error)
    return Promise.reject(error)
  }
)