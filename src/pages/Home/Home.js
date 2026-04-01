import './Home.css'
import { getAllEventsAPI } from '/src/api/events.js'
import { isEventPassed, sortEventsByDate } from '../../utils/events/eventHelper'
import { renderError } from '../../ui/StatusMessagesUI/StatusMessagesUI'
import { EventCard } from '../../components/Event/EventCard/EventCard'

export const Home = async (filters) => {
  const homePage = document.createElement('section')
  homePage.classList.add('home-page', 'container')

  let rawEvents = await getAllEventsAPI(filters || {})

  if (!rawEvents || rawEvents.length === 0) {
    homePage.innerHTML = renderError(
      '🔎 No events found matching your filters...'
    )
    const errorBtn = homePage.querySelector('.generic-error-btn') //Por defecto, renderError pinta un botón "Try Again" que ejecuta un window.location.reload(). En este caso, a parte de querer un .reload() necesitamos limpiar la URL antes de volver a Home... si no, el botón entraria en un bucle haciendo reaload a una página con un filtro que no devuelve nada.
    if (errorBtn) {
      errorBtn.textContent = 'Back to all events'
      errorBtn.onclick = (e) => {
        e.preventDefault()
        window.history.replaceState({}, '', '/')
        window.location.reload()
      }
    }
    return homePage
  }

  const container = document.createElement('div')
  container.classList.add('event-cards-container')

  const loggedUser = JSON.parse(localStorage.getItem('user'))
  const sortedEvents = sortEventsByDate(rawEvents)

  let currentEvents = []
  let passedEvents = []

  sortedEvents.forEach((event) => {
    const isPassed = isEventPassed(event.date)
    const card = EventCard(event, loggedUser, isPassed)

    if (isPassed) {
      passedEvents.push(card)
    } else {
      currentEvents.push(card)
    }
  })

  currentEvents.forEach((card) => container.appendChild(card))
  passedEvents.forEach((card) => container.appendChild(card))

  homePage.appendChild(container)
  return homePage
}
