import { apiCall } from './api'

export const signUpUserAPI = async (formData) => {
  const { data, status, ok } = await apiCall({
    endpoint: '/users/register',
    method: 'POST',
    body: formData,
    isFormData: true //! Imprescindible para que nuestra función 'apiCall' no intente poner el header Content-Type: application/json ni haga stringify del formData
  })
  return { ...data, status, ok } // "spread" (...): copiamos y abrimos la caja 'data' y vaciamos su contenido en el nuevo objeto {}, junto con el 'status' al mismo nivel. Es decir, unificamos las respuestas en un mismo nivel de object keys.
  // variable.user (inicialmente dentro de data), variable.status, variable.token (tambien en data)...
}

export const loginUserAPI = async (formData) => {
  const { data, status, ok } = await apiCall({
    endpoint: '/users/login',
    method: 'POST',
    body: formData,
    isFormData: true
  })

  return { ...data, status, ok }
}

export const checkSessionAPI = async () => {
  const { data, ok } = await apiCall({ endpoint: '/users/check-session' })

  if (!ok || !data || Object.keys(data).length === 0) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return null
  }

  localStorage.setItem('user', JSON.stringify(data))
  return data
}
