import { renderCreatedEventsList } from './CreatedEventsList'
import { CreatedEventsTemplate } from './CreatedEventsTemplate'

export const CreatedEvents = async (context) => {
  const container = document.createElement('div')
  container.id = 'profile-created-events-container'

  container.innerHTML = CreatedEventsTemplate(context)

  const profileCardsContainer = container.querySelector(
    '.profile-cards-container'
  )

  renderCreatedEventsList(profileCardsContainer, context)

  return container
}
