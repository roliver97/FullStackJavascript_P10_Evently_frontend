import { Profile } from '../../pages/Profile/Profile'
import { scrollThroughProfileSections } from '../../pages/Profile/ProfileListeners'
import { navigate } from './navigation'

export const closeMenu = () => {
  const mainPage = document.querySelector('#app-main')
  const profileDropdown = document.querySelector(
    '#header-profile-dropdown-menu'
  )
  const mobileDropdown = document.querySelector('#header-mobile-dropdown-menu')

  if (
    profileDropdown.classList.contains('active') ||
    mobileDropdown.classList.contains('active')
  ) {
    profileDropdown.classList.add('hidden')
    profileDropdown.classList.remove('active')

    mobileDropdown.classList.add('hidden')
    mobileDropdown.classList.remove('active')
  }

  mainPage?.classList.remove('is-blurred-dark')
}

export const handleHeaderNavigation = (pageName, sectionId) => {
  closeMenu()

  const loggedUser = JSON.parse(localStorage.getItem('user'))
  const myId = loggedUser?._id

  if (pageName && !sectionId) {
    navigate(pageName)
  }

  if (sectionId) {
    const profilePage = document.querySelector('.profile-page')
    const currentUrlId = window.location.pathname.split('/')[2]

    if (profilePage && currentUrlId === myId) {
      scrollThroughProfileSections(sectionId)
    } else {
      navigate(Profile, myId, sectionId)
    }
  }
}
