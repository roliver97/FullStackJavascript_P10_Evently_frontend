import { EventDetail } from '../pages/EventDetail/EventDetail'
import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { Profile } from '../pages/Profile/Profile'
import { SignUp } from '../pages/SignUp/SignUp'
import {
  renderError,
  renderSpinner
} from '../ui/StatusMessagesUI/StatusMessagesUI'
import { updateActiveLinks } from '../utils/navigation/navigation'

export const router = async () => {
  const path = window.location.pathname
  const main = document.getElementById('app-main')
  if (!main) return
  main.innerHTML = renderSpinner()

  let pageFunction
  let params = null
  let sectionId = window.history.state?.sectionId || null

  if (path === '/' || path === '/home') {
    pageFunction = Home
    const urlParams = new URLSearchParams(window.location.search)
    const filters = Object.fromEntries(urlParams.entries())
    params = Object.keys(filters).length > 0 ? filters : null
  } else if (path === '/event/create') {
    // Modo creación
    pageFunction = EventDetail
    params = null
  } else if (path.startsWith('/event/')) {
    // Modo lectura/edición
    pageFunction = EventDetail
    params = path.split('/')[2]
  } else if (path.startsWith('/profile')) {
    pageFunction = Profile
    params = path.split('/')[2]

    if (params === undefined || params === '') {
      // Filtro seguridad por si ejecutamos Profile() sin pasar ningún parámetro (id). Con null permite renderizar el perfil del usuario del localStorage, con undefined daba error.
      params = null
    }
    console.log(params)
  } else if (path === '/login') {
    pageFunction = Login
  } else if (path === '/signup') {
    pageFunction = SignUp
  } else {
    pageFunction = Home
  }

  try {
    const pageHtml = await pageFunction(params, sectionId) // sectionId lo usaremos para las Pages que tengan como segundo parámetro la sección a mostrar (como por ejemplo Profile). Este sectionId está configurado intrinsecamente dentro de la URL gracias a "state" de window.history.pushState(state, '', path) dentro de la función navigate en navigation.js. "State" es como un buzón oculto del navegador. Así evitamos que el nombre de la sección (p. ej. "profile-created-events-container") sea visible en la URL pero podamos navegar hasta ella.

    main.innerHTML = ''
    main.appendChild(pageHtml)

    updateActiveLinks(pageFunction, params)

    const searchInput = document.querySelector('#header-search')
    if (searchInput) {
      const urlParams = new URLSearchParams(window.location.search)
      const queryFromUrl = urlParams.get('query')

      if (queryFromUrl) {
        // Si la URL tiene una query, la ponemos en el input incluso después de F5
        searchInput.value = queryFromUrl
      } else {
        searchInput.value = ''
      }
    }

    const fullPath = window.location.pathname + window.location.search
    window.history.replaceState({}, '', fullPath) // Limpiamos window.history.state que habiamos configurado en navigate() (donde guardamos el sectionId: params[1] para poder hacer el scroll dentro de Profile). Ahora cuando estemos dentro de una sección de Profile y pulsemos F5, no hará scroll, sino que mostrará la primera sección de Profile
  } catch (error) {
    console.error('Router error:', error)
    window.history.replaceState({}, '', '/')
    main.innerHTML = renderError()
  }
}

window.addEventListener('popstate', router)
