import { renderAttendigEventsList } from './AttendingEventsList'
import { AttendingEventsTemplate } from './AttendingEventsTemplate'

export const AttendingEvents = async (context) => {
  const container = document.createElement('div')
  container.id = 'profile-attending-events-container'

  container.innerHTML = AttendingEventsTemplate()

  const profileCardsContainer = container.querySelector(
    '.profile-cards-container'
  )

  renderAttendigEventsList(profileCardsContainer, context)

  return container
}
