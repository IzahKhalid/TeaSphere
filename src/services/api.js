import axios from 'axios'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: { Accept: 'application/json' },
})

const handleApiError = (err) => {
  if (err.code === 'ECONNABORTED') {
    throw new Error('Request timed out. Please check your connection and try again.')
  }
  if (!err.response) {
    throw new Error('Network error. Please check your connection and try again.')
  }
  if (err.response.status === 404) {
    throw new Error('Resource not found.')
  }
  throw new Error(err.response?.data?.message || 'Failed to load data from the server.')
}

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err) {
    handleApiError(err)
  }
}

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (err) {
    handleApiError(err)
  }
}