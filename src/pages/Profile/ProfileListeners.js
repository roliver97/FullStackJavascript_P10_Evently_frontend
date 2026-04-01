const PROFILE_SECTIONS = {
  'profile-form-container': ['profile-info-btn'],
  'profile-created-events-container': [
    'profile-events-btn',
    'header-events-link'
  ],
  'profile-attending-events-container': [
    'profile-attendance-btn',
    'header-attending-link'
  ],
  'profile-favorite-events-container': [
    'profile-favorites-btn',
    'header-favorites-link'
  ]
}

const setActiveBtnByWindowView = (sectionId) => {
  const buttonsToActivate = PROFILE_SECTIONS[sectionId] || []
  const allProfileNavButtons = document.querySelectorAll(
    '#profile-nav-container .profile-nav-links button'
  )
  const allProfileHeaderLinks = document.querySelectorAll(
    '.header-profile-dropdown-div a'
  )

  allProfileNavButtons.forEach((btn) => {
    if (btn.id === 'close-profile-nav-btn') return

    const shouldBeActive = buttonsToActivate.includes(btn.id)
    btn.classList.toggle('active', shouldBeActive)
  })

  allProfileHeaderLinks.forEach((link) => {
    if (link.id === 'header-home-link') return
    const shouldBeActive = buttonsToActivate.includes(link.id)
    if (link.id !== 'header-profile-link')
      link.classList.toggle('active', shouldBeActive)
  })
}

export const setupSectionsWindowObserver = (sections) => {
  window.isScrollingByClick = false
  const options = { threshold: 0.2 }

  const observer = new IntersectionObserver((entries) => {
    if (window.isScrollingByClick) return

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveBtnByWindowView(entry.target.id)
      }
    })
  }, options)

  sections.forEach((section) => {
    if (section) observer.observe(section)
  })
}

export const scrollThroughProfileSections = (sectionId) => {
  if (!sectionId) return

  const target = document.getElementById(sectionId)
  if (target) {
    window.isScrollingByClick = true
    setActiveBtnByWindowView(sectionId)
    target.scrollIntoView({ behavior: 'smooth' })

    setTimeout(() => {
      window.isScrollingByClick = false
    }, 800)
  }
}
