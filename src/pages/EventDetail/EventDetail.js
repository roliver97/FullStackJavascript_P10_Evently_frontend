import { getEventByIdAPI } from '../../api/events'
import { EventDetailForm } from '../../components/Event/EventDetailForm/EventDetailForm'
import { renderError } from '../../ui/StatusMessagesUI/StatusMessagesUI'
import { isEventPassed } from '../../utils/events/eventHelper'
import { getUserContext } from '../../utils/users/userHelper'
import './EventDetail.css'

export const EventDetail = async (eventId) => {
  const page = document.createElement('section')
  page.classList.add('event-detail-page', 'container')

  try {
    // MODO CREACIÓN
    const userContext = await getUserContext()

    if (!eventId) {
      if (!userContext.loggedUser) {
        return redirectToLogin()
      }
      const form = EventDetailForm(null, null, userContext)
      page.append(form)
      return page
    }

    // MODO DETALLE / EDICIÓN
    const event = await getEventByIdAPI(eventId)

    if (!event) {
      page.innerHTML = renderError('NotEventsFound', false)
      return page
    }

    const detailContext = await getUserContext(event.organizer._id)
    const isPassed = isEventPassed(event.date)

    const form = EventDetailForm(event, isPassed, detailContext)
    page.append(form)
  } catch (error) {
    console.error('Error en EventDetail:', error)
    page.innerHTML = renderError()
  }

  return page
}
