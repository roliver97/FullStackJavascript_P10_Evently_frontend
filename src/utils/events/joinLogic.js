import { updateEventAttendeesAPI } from '../../api/events'
import { updateUserAttendanceAPI } from '../../api/users'
import { Header } from '../../components/Header/Header'
import { Login } from '../../pages/Login/Login'
import { navigate } from '../navigation/navigation'

export const handleJoinClick = async (event, joinBtn) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Header()
    alert('You need to be logged in to join events!')
    navigate(Login)
    return
  }

  const isJoined = event.attendees.some((attendee) => attendee._id === user._id)

  if (isJoined) {
    const isConfirmed = confirm('Are you sure you want to leave this event?')
    if (!isConfirmed) return
  }

  const rawUpdatedEvent = await updateEventAttendeesAPI(event._id)
  const rawUpdatedUser = await updateUserAttendanceAPI(event._id)
  //Leave y Join son método PATCH, por eso usamos el término updated, porque estamos actualizando el evento y el usuario

  const updatedEvent = rawUpdatedEvent.event
  const updatedUser = rawUpdatedUser.user

  if (updatedUser) {
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  if (updatedEvent) {
    event.attendees = updatedEvent.attendees

    if (!isJoined) {
      joinBtn.textContent = "I'm going! (Leave)"
      joinBtn.classList.add('joined')
    } else {
      joinBtn.textContent = 'I would like to join!'
      joinBtn.classList.remove('joined')
    }

    const pageContainer = joinBtn.closest('.event-detail-page')
    const attendeesCount = pageContainer.querySelector('#detail-attendees-link')
    if (attendeesCount)
      attendeesCount.innerHTML = `${event.attendees.length} <span>Attendees</span>`
    // Usamos de referencia joinBtn porque, en este punto, es el único elemento del DOM que tenemos para atacar únicamente la event-card del evento en concreto. Si no lo hicieramos, cambiariamos el textContent de attendees de todas las cards.
  }

  return {
    user: updatedUser,
    event: updatedEvent
  }
}
