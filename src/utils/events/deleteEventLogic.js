import { deleteEventAPI } from '../../api/events'
import { Home } from '../../pages/Home/Home'
import { navigate } from '../navigation/navigation'

export const deleteEvent = async (eventId) => {
  const isConfirmed = confirm(
    'Are you sure you want to delete this event? This action cannot be undone.'
  )
  if (isConfirmed) {
    try {
      const response = await deleteEventAPI(eventId)
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      alert('Event deleted successfully! 🗑️')
      navigate(Home)
    } catch (error) {
      alert('Error deleting event: ' + error.message)
    }
  }
}
