import { apiCall } from './api.js'

export const updateEventFavoritesAPI = async (eventId) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/events/favorites/${eventId}`,
    method: 'PATCH'
    // El controller toggleFavorites no espera ningún body, así que como no hay 'body' ni 'isFormData', apiCall no pondrá Content-Type
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not update favorites'}`
    )
  }
  return data
}

export const getAllEventsAPI = async (filters = {}) => {
  const params = new URLSearchParams()
  // URLSearchParams = Herramienta nativa JS que se encarga de juntar automáticamente piezas mediante simbolos ? y & para crear una URL
  if (filters.query) params.append('query', filters.query)

  if (filters.category) params.append('category', filters.category)
  if (filters.city) params.append('city', filters.city)
  if (filters.date) params.append('date', filters.date)

  const queryString = params.toString()
  const endpoint = queryString ? `/events?${queryString}` : '/events'

  const { data, ok, status } = await apiCall({ endpoint }) // Property Shorthand = seria lo mismo que apiCall({ endpoint : endpoint }), pero como el nombre de la variable y el nombre de la object key comparten exactamente el mismo nombre no es necesario ponerlo dos veces.

  if (!ok) {
    console.error(status, data.message || 'Error de respuesta del servidor')
    return [] // Devolvemos un array vacío en vez de "null" y no usamos 'throw new Error" para intentar no romper el .forEach de los events de Home
  }

  return data
}

export const getFiltersDataAPI = async () => {
  // Lo usaremos para refrescar los campos de los filtros en el front relacionandolos con los datos actualizados del back que obtendremos bajo esta petición

  const { data, ok } = await apiCall({
    endpoint: '/events/event-filters-data'
  })
  if (!ok) return {}
  return data
}

export const getEventByIdAPI = async (id) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/events/${id}`
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not get this event from DB'}`
    )
  }
  return data
}

export const updateEventAttendeesAPI = async (eventId) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/events/${eventId}/attendees`,
    method: 'PATCH'
    // El controller toggleAttendees no espera ningún body, así que como no hay 'body' ni 'isFormData', apiCall no pondrá Content-Type
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Could not update attendees'}`
    )
  }
  return data
}

export const searchEventsAPI = async (query) => {
  const { data, ok, status } = await apiCall({
    endpoint: `/events/search?query=${query}`
  })
  if (!ok) {
    console.error(status, data.message || 'Error de respuesta del servidor')
    return []
  }
  return data
}

export const createEventAPI = async (formData) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/events`,
    method: 'POST',
    body: formData,
    isFormData: true
  })
  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Failed to CREATE this event on server'}`
    )
  }
  return data // data contiene event y user (updated)
}

export const deleteEventAPI = async (eventId) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/events/${eventId}`,
    method: 'DELETE'
  })

  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Failed to DELETE this event on server'}`
    )
  }

  return data // data contiene event y user (updated)
}

export const updateEventAPI = async (eventId, formData) => {
  const { data, status, ok } = await apiCall({
    endpoint: `/events/${eventId}`,
    method: 'PUT',
    body: formData,
    isFormData: true
  })

  if (!ok) {
    throw new Error(
      `${status}: ${data.message || 'Failed to UPDATE this event on server'}`
    )
  }

  return data
}
