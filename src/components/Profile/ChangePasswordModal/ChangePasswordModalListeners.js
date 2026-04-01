import { updatePasswordAPI } from '../../../api/users'
import { Profile } from '../../../pages/Profile/Profile'
import { navigate } from '../../../utils/navigation/navigation'

export const ChangePasswordModalListeners = (modal) => {
  const form = modal.querySelector('#change-password-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    if (data.newPassword !== data.confirmPassword) {
      return alert("New passwords don't match! ❌")
    }

    try {
      await updatePasswordAPI(data)
      alert('Password updated successfully! ✅')
      modal.remove()
      navigate(Profile)
    } catch (error) {
      alert(error.message)
    }
  })

  modal.querySelector('#close-password-modal').addEventListener('click', () => {
    navigate(Profile)
    modal.remove()
  })
}
