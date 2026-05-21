import { useState, useEffect, useCallback } from 'react'
import { fetchUsers, fetchUserById } from '../services/api'

/** Fetch all users with loading, error, and retry support */
export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err?.message || 'Failed to load community members')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { users, loading, error, retry: load }
}

/** Fetch single user by ID */
export const useUserDetail = (id) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUserById(id)
      setUser(data)
    } catch (err) {
      setError(err?.message || 'Failed to load profile')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  return { user, loading, error, retry: load }
}
