import { EventDetail } from '../../../pages/EventDetail/EventDetail'
import { Profile } from '../../../pages/Profile/Profile'
import { handleLikeClick } from '../../../utils/events/likeLogic'
import { navigate, redirectToLogin } from '../../../utils/navigation/navigation'
import { EventSocialViewer } from '../EventSocialInfo/EventSocialInfo'

export const setupCardListeners = (card, event, loggedUser) => {
  const cardUserLink = card.querySelector('.card-user-link')
  const cardEventInfo = card.querySelector('.card-event-info')
  const userActions = card.querySelector('.card-user-actions')
  const likeBtn = card.querySelector('.event-card-button-like')
  const moreInfoBtn = card.querySelector('.event-card-button-moreInfo')
  const attendeesLink = card.querySelector('.card-attendees-link')
  const favoritesLink = card.querySelector('.card-favorites-link')
  const attendanceOwnerBtn = card.querySelector('.owner')
  const attendanceAttendedBtn = card.querySelector('.attended')
  const attendanceAttendingBtn = card.querySelector('.attending')

  cardUserLink.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(Profile, event.organizer._id)
  })

  cardEventInfo.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(EventDetail, event._id)
  })

  cardEventInfo.addEventListener('mouseenter', (e) => {
    if (cardEventInfo.querySelector('.card-event-info-overlay')) return

    moreInfoBtn.classList.add('active')
    moreInfoBtn.classList.remove('hidden')

    const overlay = document.createElement('div')
    overlay.classList.add('card-event-info-overlay')
    cardEventInfo.prepend(overlay)
  })
  cardEventInfo.addEventListener('mouseleave', (e) => {
    moreInfoBtn.classList.remove('active')
    moreInfoBtn.classList.add('hidden')
    const overlay = document.querySelector('.card-event-info-overlay')
    overlay?.remove()
  })

  userActions.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    loggedUser ? handleLikeClick(event, likeBtn) : redirectToLogin()
  })

  attendeesLink.addEventListener('click', (e) => {
    const viewer = EventSocialViewer(event, 'attendees')
    loggedUser ? document.body.appendChild(viewer) : redirectToLogin()
  })

  favoritesLink.addEventListener('click', (e) => {
    const viewer = EventSocialViewer(event, 'favorites')
    loggedUser ? document.body.appendChild(viewer) : redirectToLogin()
  })

  attendanceOwnerBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(Profile, loggedUser._id, 'profile-created-events-container')
  })

  attendanceAttendingBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(Profile, loggedUser._id, 'profile-attending-events-container')
  })

  attendanceAttendedBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(Profile, loggedUser._id, 'profile-attending-events-container')
  })
}
