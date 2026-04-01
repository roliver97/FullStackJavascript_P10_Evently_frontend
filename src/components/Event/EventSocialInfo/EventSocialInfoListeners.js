import { renderList } from './EventSocialInfoList'

export const EventSocialInfoListeners = (event, container) => {
  const showAttBtn = container.querySelector('#btn-show-attendees')
  const showFavsBtn = container.querySelector('#btn-show-likes')
  const closeBtn = container.querySelector('#close-viewer')

  showAttBtn.addEventListener('click', () => {
    showAttBtn.classList.add('active')
    showFavsBtn.classList.remove('active')
    renderList(contentList, event.attendees)
  })

  showFavsBtn.addEventListener('click', () => {
    showAttBtn.classList.remove('active')
    showFavsBtn.classList.add('active')
    renderList(contentList, event.favorites)
  })

  //CLOSE
  closeBtn.addEventListener('click', () => {
    container.remove() // lo borramos del DOM
  })

  container.addEventListener('click', (e) => {
    if (e.target.id === 'event-social-viewer-overlay') {
      container.remove()
    }
  })
}
