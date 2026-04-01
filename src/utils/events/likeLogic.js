import { updateEventFavoritesAPI } from '../../api/events'
import { updateUserFavoritesAPI } from '../../api/users'
import { Header } from '../../components/Header/Header'
import { Login } from '../../pages/Login/Login'
import { navigate } from '../navigation/navigation'

export const handleLikeClick = async (event, likeBtn) => {
  const rawUpdatedUser = await updateUserFavoritesAPI(event._id)
  const updatedUser = rawUpdatedUser.user
  const rawUpdatedEvent = await updateEventFavoritesAPI(event._id)
  const updatedEvent = rawUpdatedEvent.event

  if (updatedUser) {
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  if (updatedEvent) {
    event.favorites = updatedEvent.favorites

    const detailContainer = likeBtn.closest('.event-detail-page')
    if (detailContainer) {
      const favoritesDetailCount = detailContainer.querySelector(
        '#detail-favorites-link'
      )
      favoritesDetailCount.innerHTML = `${event.favorites.length || 0} <span>Likes</span>`
    }

    const cardContainer = likeBtn.closest('.event-card')
    if (cardContainer) {
      const favoritesCardCount = cardContainer.querySelector(
        '.card-favorites-link'
      )
      favoritesCardCount.innerHTML = `${event.favorites.length || 0} <span>Likes</span>`
    }

    // Usamos de referencia likeBtn porque, en este punto, es el único elemento del DOM que tenemos para atacar únicamente la event-card del evento en concreto. Si no lo hicieramos, cambiariamos el textContent de favorites de todas las cards.
    const heartEmpty = likeBtn.querySelector('.card-heart-empty-icon')
    const heartFull = likeBtn.querySelector('.card-heart-full-icon')

    heartEmpty.classList.toggle('active')
    heartEmpty.classList.toggle('hidden')
    heartFull.classList.toggle('active')
    heartFull.classList.toggle('hidden')
  } else {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Header()
    alert('You need to be logged in to save favorites!')
    navigate(Login)
  }

  return {
    user: updatedUser,
    event: updatedEvent
  }
}
