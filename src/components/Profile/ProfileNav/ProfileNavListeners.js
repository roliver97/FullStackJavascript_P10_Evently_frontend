import { scrollThroughProfileSections } from '../../../pages/Profile/ProfileListeners'

export const ProfileNavListeners = (profileNav) => {
  const infoBtn = profileNav.querySelector('#profile-info-btn')
  const eventsBtn = profileNav.querySelector('#profile-events-btn')
  const attendanceBtn = profileNav.querySelector('#profile-attendance-btn')
  const favoritesBtn = profileNav.querySelector('#profile-favorites-btn')

  const openBtn = profileNav.querySelector('#open-profile-nav-btn')
  const closeBtn = profileNav.querySelector('#close-profile-nav-btn')
  const navModal = profileNav.querySelector('.profile-nav-links')

  const allButtons = profileNav.querySelectorAll('.profile-nav-links button')

  const closeModal = () => {
    navModal?.classList.remove('active-modal')
  }

  const setActiveBtn = (btn) => {
    allButtons.forEach((b) => b.classList.remove('active'))
    btn?.classList.add('active')
    closeModal()
  }

  navModal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      // si 'target' (el click) es exactament el 'currentTarget' (el navModal, es decir, cualquier espacio que no sean los botones)
      closeModal()
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeModal()
    }
  })

  openBtn?.addEventListener('click', () => {
    navModal?.classList.add('active-modal')
  })

  closeBtn?.addEventListener('click', closeModal)

  infoBtn?.classList.add('active')

  infoBtn?.addEventListener('click', () => {
    setActiveBtn(infoBtn)
    scrollThroughProfileSections('profile-form-container')
  })

  eventsBtn?.addEventListener('click', () => {
    setActiveBtn(eventsBtn)
    scrollThroughProfileSections('profile-created-events-container')
  })

  attendanceBtn?.addEventListener('click', () => {
    setActiveBtn(attendanceBtn)
    scrollThroughProfileSections('profile-attending-events-container')
  })

  favoritesBtn?.addEventListener('click', () => {
    setActiveBtn(favoritesBtn)
    scrollThroughProfileSections('profile-favorite-events-container')
  })
}
