import { setupCardListeners } from './EventCardListeners'
import { EventCardTemplate } from './EventCardTemplate'

export const EventCard = (event, loggedUser, isPassed) => {
  const card = document.createElement('article')

  const isFav = loggedUser?.favorites?.some(
    (fav) => (fav._id || fav) === event._id
  )
  const isAttending = loggedUser?.attendance?.some(
    (att) => (att._id || att) === event._id
  )
  const isOwner = loggedUser?._id === event.organizer._id

  const [year, month, day] = event.date.split('T')[0].split('-')
  const dataForTemplate = {
    isPassed,
    isFav,
    isAttending,
    isOwner,
    formattedDate: `${day}/${month}/${year}`,
    organizerFullName: `${event.organizer.firstName} ${event.organizer.lastName}`
  }

  card.classList.add('event-card', isPassed ? 'passedEvent' : 'currentEvent')
  card.innerHTML = EventCardTemplate(event, dataForTemplate)

  setupCardListeners(card, event, loggedUser)

  return card
}
