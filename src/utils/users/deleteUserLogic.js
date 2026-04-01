import { deleteUserAPI } from '../../api/users'
import { Header } from '../../components/Header/Header'
import { Home } from '../../pages/Home/Home'
import { navigate } from '../navigation/navigation'

export const deleteUser = async (user, isSelfOrAdmin) => {
  const isSelf = isSelfOrAdmin === 'self'
  const isConfirmed = confirm(
    isSelf
      ? 'Are you sure you want to delete your account? This action cannot be undone and all associated events will also be deleted.'
      : 'Are you sure you want to delete this account? This action cannot be undone and all associated events will also be deleted.'
  )

  const userId = user._id

  if (isConfirmed) {
    try {
      const response = await deleteUserAPI(userId)
      if (response.message) {
        if (isSelf) {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          alert(
            `Your user account and all associated events has been deleted successfully! 👤🗑️ - ${response.message}`
          )
          Header()
          navigate(Home)
        } else {
          alert(
            `User and all associated events deleted by Admin successfully! 👤🗑️ - ${response.message}`
          )
          navigate(Home)
        }
      }
    } catch (error) {
      alert('Error deleting user: ' + error.message)
      navigate(Profile)
    }
  }
}
