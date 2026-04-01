import { Header } from '../../components/Header/Header'
import { Login } from '../../pages/Login/Login'
import { router } from '../../router/router'
import { renderError } from '../../ui/StatusMessagesUI/StatusMessagesUI'
import { getUserContext } from '../users/userHelper'

export const navigate = async (pageFunction, ...params) => {
  //usamos ...params (spread operator) para que la función sea capaç de recibir más de un parámetro a la vez...
  const path = await getPathFromFunction(pageFunction, params)
  const state = { sectionId: params[1] || null }
  window.history.pushState(state, '', path)

  router()
}

const getPathFromFunction = async (pageFunction, params) => {
  const name = pageFunction.name.toLowerCase()
  if (name === 'home') {
    // params[0] puede ser tanto el search input como category: 'music', city: 'bcn', ...
    const allParams = params[0] || null

    if (allParams && Object.keys(allParams).length > 0) {
      const query = new URLSearchParams(allParams)
      return `/?${query.toString()}`
    }

    return '/'
  }
  if (name === 'eventdetail') {
    return params && params[0] ? `/event/${params[0]}` : '/event/create'
  }
  if (name === 'profile') {
    const userContext = await getUserContext()
    const id = params[0]
    console.log(id)
    if (id === userContext.userProfile._id) {
      return `/profile`
    } else {
      return `/profile/${id}`
    }
  }
  if (name === 'login') return '/login'
  return `/${name}`
}

export const updateActiveLinks = (pageFunction, params) => {
  const header = document.querySelector('#app-header')
  if (!header) return

  const pageName = pageFunction.name

  const isLogged = !!localStorage.getItem('token')
  if (isLogged) {
    header.querySelectorAll('a, button').forEach((el) => {
      el.classList.remove('active')
    })

    const activeLink = header.querySelector(
      `#header-${pageName.toLowerCase()}-link`
    )

    if (pageName === 'EventDetail' && params === null) {
      const createEventButton = header.querySelector('#create-event-btn')
      const createEventLink = header.querySelector(
        '#create-event-dropdown-link'
      )
      createEventLink.classList.add('active')
      createEventLink.classList.remove('hidden')
      createEventButton.classList.add('active')
      createEventButton.classList.remove('hidden')
    }

    if (activeLink) {
      activeLink.classList.add('active')
      activeLink.classList.remove('hidden')
    }

    if (pageName === 'Profile' && params !== null) {
      const profileLink = header.querySelector('#header-profile-link')
      profileLink.classList.remove('active')
    }
  }
}

export const redirectToLogin = () => {
  const main = document.querySelector('#app-main')
  document.body.style.pointerEvents = 'none' // Así bloqueamos cualquier click dentro de header que pudiera generar conflicto con el setTimeout

  main.innerHTML = renderError('🫷🏼 You must be logged in to proceed...', false)

  setTimeout(() => {
    document.body.style.pointerEvents = 'auto'
    navigate(Login)
  }, 2000)
}
