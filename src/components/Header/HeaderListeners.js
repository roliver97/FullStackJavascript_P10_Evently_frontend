import { EventDetail } from '../../pages/EventDetail/EventDetail'
import { Home } from '../../pages/Home/Home'
import { Login } from '../../pages/Login/Login'
import { SignUp } from '../../pages/SignUp/SignUp'
import {
  closeMenu,
  handleHeaderNavigation
} from '../../utils/navigation/headerLogic'
import { navigate } from '../../utils/navigation/navigation'
import { executeSearch } from '../../utils/search/searchLogic'
import { Header } from './Header'
import { renderHeaderFilterForm } from './HeaderFilterForm/HeaderFilterForm'

export const setupHeaderListeners = (headerElement, isLogged) => {
  const logo = headerElement.querySelector('.header-logo-link')
  const searchForm = headerElement.querySelector('.nav-searchbar-form')
  const searchInput = headerElement.querySelector('#header-search')
  const filterBtn = headerElement.querySelector('#header-filter-btn')
  const createEventBtn = headerElement.querySelector('#create-event-btn')
  const signupBtn = headerElement.querySelector('#header-signup-btn')
  const loginBtn = headerElement.querySelector('#header-login-btn')
  const logoutBtn = headerElement.querySelector('#header-logout-btn')
  const profileTrigger = headerElement.querySelector(
    '#header-profile-trigger-button'
  )
  const profileDropdown = headerElement.querySelector(
    '#header-profile-dropdown-menu'
  )
  const homeLink = headerElement.querySelector('#header-home-link')
  const createEventDropdownLink = headerElement.querySelector(
    '#create-event-dropdown-link'
  )
  const profileLink = headerElement.querySelector('#header-profile-link')
  const ownEventsLink = headerElement.querySelector('#header-events-link')
  const attendingEventsLink = headerElement.querySelector(
    '#header-attending-link'
  )
  const favoriteEventsLink = headerElement.querySelector(
    '#header-favorites-link'
  )
  const mobileDropdownBtn = headerElement.querySelector(
    '#header-mobile-dropdown-btn'
  )
  const mobileDropdownMenu = headerElement.querySelector(
    '#header-mobile-dropdown-menu'
  )
  const mobileDropdownSignupLink = headerElement.querySelector(
    '#header-mobile-signup-link'
  )
  const mobileDropdownLoginLink = headerElement.querySelector(
    '#header-mobile-login-link'
  )

  logo?.addEventListener('click', (e) => {
    handleHeaderNavigation(Home)
  })

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()
    executeSearch(query)
  })

  filterBtn?.addEventListener('click', (e) => {
    if (filterBtn.classList.contains('active')) {
      filterBtn.classList.remove('active')
    }
    filterBtn.classList.add('active')
    renderHeaderFilterForm()
  })

  mobileDropdownBtn?.addEventListener('click', (e) => {
    const currentMainPage = document.querySelector('#app-main')
    mobileDropdownMenu.classList.toggle('hidden')
    mobileDropdownMenu.classList.toggle('active')

    if (mobileDropdownMenu.classList.contains('active')) {
      currentMainPage?.classList.add('is-blurred-dark')
    } else {
      currentMainPage?.classList.remove('is-blurred-dark')
    }
  })

  mobileDropdownSignupLink?.addEventListener('click', (e) => {
    handleHeaderNavigation(SignUp)
  })
  mobileDropdownLoginLink?.addEventListener('click', (e) =>
    handleHeaderNavigation(Login)
  )

  if (isLogged) {
    createEventBtn?.addEventListener('click', (e) => {
      createEventBtn.classList.add('active')
      handleHeaderNavigation(EventDetail)
    })

    profileTrigger?.addEventListener('click', () => {
      const currentMainPage = document.querySelector('#app-main')
      profileDropdown.classList.toggle('hidden')
      profileDropdown.classList.toggle('active')

      if (profileDropdown.classList.contains('active')) {
        currentMainPage?.classList.add('is-blurred-dark')
      } else {
        currentMainPage?.classList.remove('is-blurred-dark')
      }
    })

    homeLink?.addEventListener('click', (e) => {
      handleHeaderNavigation(Home)
    })

    createEventDropdownLink?.addEventListener('click', (e) => {
      handleHeaderNavigation(EventDetail)
    })

    profileLink?.addEventListener('click', () => {
      handleHeaderNavigation(null, 'profile-form-container')
    })

    ownEventsLink?.addEventListener('click', () => {
      handleHeaderNavigation(null, 'profile-created-events-container')
    })

    attendingEventsLink?.addEventListener('click', () => {
      handleHeaderNavigation(null, 'profile-attending-events-container')
    })

    favoriteEventsLink?.addEventListener('click', () => {
      handleHeaderNavigation(null, 'profile-favorite-events-container')
    })

    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      Header()
      handleHeaderNavigation(Home)
    })
  } else {
    signupBtn?.addEventListener('click', (e) => navigate(SignUp))

    loginBtn?.addEventListener('click', (e) => navigate(Login))
  }
}
