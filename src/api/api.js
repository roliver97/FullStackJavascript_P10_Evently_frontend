import { API_URL } from '../utils/common/constants.js'

export const apiCall = async ({
  endpoint,
  method = 'GET',
  body = null,
  isFormData = false
}) => {
  const token = localStorage.getItem('token')

  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData && body) {
    headers['Content-Type'] = 'application/json'
  }

  const options = {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : null
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, options)

    if (res.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    const data = await res.json().catch(() => ({})) //.catch en el caso de que se realize el fetch pero no haya body (DELETE, por ejemplo)

    return { data, status: res.status, ok: res.ok }
  } catch (error) {
    console.error(`Error at the ${endpoint}:`, error.message)
    throw error
  }
}
