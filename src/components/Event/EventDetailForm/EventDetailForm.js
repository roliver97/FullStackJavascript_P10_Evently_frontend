import './EventDetailForm.css'
import {
  setupDetailFormListeners,
  setupSubmitFormListener
} from './EventDetailFormListeners'
import { EventDetailFormTemplate } from './EventDetailFormTemplate'

export const EventDetailForm = (
  selectedEvent = null,
  isPassed = null,
  userContext
) => {
  let event = selectedEvent

  const state = {
    // Creamos un objeto con los diferentes estados para poder pasarlos como argumento a la función setupDetailFormListeners() y que esta pueda modificarlos.
    //? Tipos Primitivos (Boolean, String, Number) = Cuando los pasas a una función, JS por defecto hace una copia y nunca se modifica el valor original. Se usan como argumentos si la función solo necesita esos valores para lectura.
    //? Objetos y arrays = Cuando los pasas a una función, JS passa la referència, permitiendo modificar sus valores originales
    isCreateMode: !event,
    isEditing: !event,
    isDeleting: false
  }

  const eventForm = document.createElement('form')
  eventForm.id = 'event-detail-form'
  eventForm.enctype = 'multipart/form-data'

  const isPassedEvent = isPassed === true
  if (isPassedEvent) eventForm.classList.add('event-passed-detail-form')

  const renderForm = () => {
    const isLoggedUser = userContext?.loggedUser
    const isFav = isLoggedUser?.favorites?.some(
      (fav) => (fav._id || fav) === event?._id
    )

    const isJoined = isLoggedUser?.attendance?.some(
      (att) => (att._id || att) === event?._id
    )

    const [year, month, day] = event?.date?.split('T')[0].split('-') || [
      '',
      '',
      ''
    ]
    const formattedDate = event ? `${day}/${month}/${year}` : ''
    const dateForInput = event ? `${year}-${month}-${day}` : ''
    const organizerFullName = event
      ? `${event?.organizer?.firstName} ${event?.organizer?.lastName}`
      : ''

    const dataForTemplate = {
      ...state,
      isPassedEvent,
      isSelf: userContext?.isSelf,
      isAdmin: userContext?.isAdmin,
      isLoggedUser,
      isFav,
      isJoined,
      formattedDate,
      dateForInput,
      organizerFullName,
      categories: ['Music', 'Tech', 'Sports', 'Culture', 'Gastronomy', 'Other']
    }

    eventForm.innerHTML = EventDetailFormTemplate(event, dataForTemplate)

    setupDetailFormListeners(eventForm, event, {
      ...dataForTemplate,
      state, // sin spread (...state) para que el Listener lo pueda modificar
      renderForm
    })
  }

  setupSubmitFormListener(eventForm, state, event, renderForm)

  renderForm()
  return eventForm
}
