import { createEventAPI, updateEventAPI } from '../../../api/events'
import { Home } from '../../../pages/Home/Home'
import { Profile } from '../../../pages/Profile/Profile'
import { deleteEvent } from '../../../utils/events/deleteEventLogic'
import { handleJoinClick } from '../../../utils/events/joinLogic'
import { handleLikeClick } from '../../../utils/events/likeLogic'
import { navigate, redirectToLogin } from '../../../utils/navigation/navigation'
import { EventSocialViewer } from '../EventSocialInfo/EventSocialInfo'

export const setupDetailFormListeners = (
  eventForm,
  event,
  { state, isLoggedUser, isPassedEvent, isAdmin, renderForm }
) => {
  // PREVISUALIZAR IMAGEN INPUT POSTER ANTES DEL SUBMIT
  const posterInput = eventForm.querySelector('input[name="poster"]')
  const posterImg = eventForm.querySelector('.detail-poster')
  posterInput?.addEventListener('change', () => {
    const file = posterInput.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        posterImg.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  })

  // EventSocialViewer
  const attendeesLink = eventForm.querySelector('#detail-attendees-link')
  const favoritesLink = eventForm.querySelector('#detail-favorites-link')

  attendeesLink?.addEventListener('click', () => {
    if (isLoggedUser) {
      const viewer = EventSocialViewer(event, 'attendees')
      document.body.appendChild(viewer)
    } else redirectToLogin()
  })
  favoritesLink?.addEventListener('click', () => {
    if (isLoggedUser) {
      const viewer = EventSocialViewer(event, 'favorites')
      document.body.appendChild(viewer)
    } else redirectToLogin()
  })

  //EDIT
  const editBtn = eventForm.querySelector('#edit-event-btn')
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (!isPassedEvent) {
        state.isEditing = true
      } else if (isAdmin) {
        alert('As an admin, you can only delete past events!')
        state.isDeleting = true // Activem el mode eliminació
      } else {
        alert("You can't edit past events! Contact with an admin")
        return
      }
      renderForm()
    })
  }

  //CANCEL
  eventForm
    .querySelector('#cancel-event-btn')
    ?.addEventListener('click', () => {
      if (state.isCreateMode) navigate(Home)
      else {
        state.isEditing = false
        state.isDeleting = false
        renderForm()
      }
    })

  //DELETE
  const deleteBnt = eventForm.querySelector('#delete-event-btn')
  deleteBnt?.addEventListener('click', (e) => {
    e.preventDefault()
    deleteEvent(event._id)
  })

  if (!state.isEditing && event) {
    const likeBtn = eventForm.querySelector('.detail-button-like')
    const joinBtn = eventForm.querySelector('.detail-btn-join')
    const organizerLogoBtn = eventForm.querySelector(
      '.detail-organizer-logo-btn'
    )
    const organizerUserBtn = eventForm.querySelector(
      '.detail-organizer-user-btn'
    )

    likeBtn?.addEventListener('click', (e) => {
      e.preventDefault()
      isLoggedUser ? handleLikeClick(event, likeBtn) : redirectToLogin()
    })
    joinBtn?.addEventListener('click', (e) => {
      e.preventDefault()
      isLoggedUser ? handleJoinClick(event, joinBtn) : redirectToLogin()
    })
    organizerLogoBtn?.addEventListener('click', (e) => {
      e.preventDefault()
      isLoggedUser ? navigate(Profile, event.organizer._id) : redirectToLogin()
    })
    organizerUserBtn?.addEventListener('click', (e) => {
      e.preventDefault()
      isLoggedUser ? navigate(Profile, event.organizer._id) : redirectToLogin()
    })
  }
}

export const setupSubmitFormListener = (
  eventForm,
  state,
  event,
  renderForm
) => {
  //SUBMIT (Crear o actualizar) - FUERA DE LA FUNCIÓN SETUPLISTENERS() para evitar que el listener se duplique cada vez que hacemos renderForm()
  eventForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(eventForm)
    try {
      if (state.isCreateMode) {
        try {
          const response = await createEventAPI(formData)
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user))
          }
          alert('Event created successfully!✅')
          navigate(Home)
        } catch (error) {
          alert(error.message)
        }
      } else {
        try {
          const updatedEvent = await updateEventAPI(event._id, formData)
          alert('Event updated successful! ✅')
          Object.assign(event, updatedEvent.updatedEvent) // Object.assign en vez de "event = updatedEvent.updatedEvent" para sincronizar al momento los cambios de event con todos los ficheros que dependen de "event"... por ejemplo, los Listeners.
          state.isEditing = false
          renderForm()
        } catch (error) {
          alert(error.message)
        }
      }
    } catch (error) {
      alert(error.message)
    }
  })
}
