import { renderFavoriteEventsList } from './FavoriteEventsList'
import { FavoriteEventsTemplate } from './FavoriteEventsTemplate'

export const FavoriteEvents = async (context) => {
  const container = document.createElement('div')
  container.id = 'profile-favorite-events-container'

  container.innerHTML = FavoriteEventsTemplate()

  const profileCardsContainer = container.querySelector(
    '.profile-cards-container'
  )

  renderFavoriteEventsList(profileCardsContainer, context)

  return container
}
