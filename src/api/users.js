import { apiCall } from './api.js'

export const updateUserFavoritesAPI = async (eventId) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/users/favorites/${eventId}`,
    method: 'PATCH'
    // El controller toggleFavorites no espera ningún body, así que como no hay 'body' ni 'isFormData', apiCall no pondrá Content-Type
  })

  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not update favorites'}`
    )
  }

  return data // { user: updatedUser }
}

export const getUserByIdAPI = async (id) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/users/${id}`
  })

  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not get this user from DB'}`
    )
  }
  return data
}

export const updateUserAPI = async (id, formData) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/users/${id}`,
    method: 'PUT',
    body: formData,
    isFormData: true
  })

  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Failed to UPDATE this user on server'}`
    )
  }

  return data
}

export const updateUserAttendanceAPI = async (eventId) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/users/${eventId}/attendance`,
    method: 'PATCH'
    // El controller toggleAttendance no espera ningún body, así que como no hay 'body' ni 'isFormData', apiCall no pondrá Content-Type
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not update attendance'}`
    )
  }
  return data
}

export const deleteUserAPI = async (id) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/users/${id}`,
    method: 'DELETE'
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Failed to DELETE this user on server'}`
    )
  }
  return data
}

export const updatePasswordAPI = async (passwordData) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/users/update-password`,
    method: 'PATCH',
    body: passwordData
  })

  if (!ok) {
    throw new Error(`${status}: ${data.message || 'Failed updating password'}`)
  }

  return data
}
