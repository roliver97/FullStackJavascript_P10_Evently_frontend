import './EventSocialInfo.css'
import { renderList } from './EventSocialInfoList'
import { EventSocialInfoListeners } from './EventSocialInfoListeners'
import { EventSocialInfoTemplate } from './EventSocialInfoTemplate'

export const EventSocialViewer = (event, initialView) => {
  const viewer = document.createElement('div')
  viewer.id = 'event-social-viewer-overlay' // La capa oscura

  //TEMPLATE + RENDER LIST
  const isAttendees = initialView === 'attendees'
  viewer.innerHTML = EventSocialInfoTemplate(event, isAttendees)

  const contentList = viewer.querySelector('#social-content-list')
  const initialData =
    initialView === 'attendees' ? event.attendees : event.favorites
  renderList(contentList, initialData)

  //EVENT LISTENERS
  EventSocialInfoListeners(event, viewer)

  return viewer
}
