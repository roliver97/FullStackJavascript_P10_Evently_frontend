import { EventDetail } from '../../../../pages/EventDetail/EventDetail'
import {
  isEventPassed,
  sortEventsByDate
} from '../../../../utils/events/eventHelper'
import { navigate } from '../../../../utils/navigation/navigation'

export const renderAttendigEventsList = (container, context) => {
  const { userProfile, isSelf, isAdmin, loggedUser } = context

  const userSortedAttendingEvents = sortEventsByDate(userProfile.attendance)

  if (userSortedAttendingEvents.length === 0) {
    container.innerHTML = ` <p class="profile-subtitle">
         ${isSelf ? 'Here you will find all the events you are attending' : isAdmin ? `Here you will find all the events that ${userProfile.username} is attending` : ''}
      </p>
      `
  }

  let currentEvents = []
  let passedEvents = []

  userSortedAttendingEvents.forEach((event) => {
    const eventCard = document.createElement('article')
    eventCard.classList.add('profile-event-card')

    const [year, month, day] = event.date.split('T')[0].split('-')
    const formattedDate = `${day}/${month}/${year}`

    eventCard.innerHTML = `
      <a href="javascript:void(0)" class="card-content-link">
            <div class="card-content">
              <div class="card-image">
                <img src="${event.poster || '/images/event-default-poster.jpg'}" alt="${event.title}">
              </div>
              <div class="card-text">
                <h4>${event.title}</h4>
                <p>${event.location}, ${event.city}</p>
  
                <div class="card-date-time">
                  <span>${formattedDate}</span>
                  <span>${event.hour}h</span>
                </div>
              
              </div>
            </div>
      </a>`

    const cardContentLink = eventCard.querySelector('.card-content-link')

    cardContentLink.addEventListener('click', (e) => {
      e.preventDefault()
      navigate(EventDetail, event._id)
    })

    if (isEventPassed(event.date)) {
      eventCard.classList.add('passedEvent')
      passedEvents.push(eventCard)
    } else {
      eventCard.classList.add('currentEvent')
      currentEvents.push(eventCard)
    }
  })

  currentEvents.forEach((card) => container.appendChild(card))
  passedEvents.forEach((card) => container.appendChild(card))
}
