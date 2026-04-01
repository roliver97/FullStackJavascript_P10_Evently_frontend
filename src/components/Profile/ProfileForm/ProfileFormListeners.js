import { updateUserAPI } from '../../../api/users'
import { Profile } from '../../../pages/Profile/Profile'
import { openImageModal } from '../../../ui/imageViewer/openImageModal'
import { navigate } from '../../../utils/navigation/navigation'
import { deleteUser } from '../../../utils/users/deleteUserLogic'
import { Header } from '../../Header/Header'
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal'

export const ProfileFormListeners = (
  form,
  { userProfile, isSelf, isAdmin, targetId, loggedUser }
) => {
  const avatarPreview = form.querySelector('#profile-avatar-preview')
  const avatarBtn = form.querySelector('#profile-avatar-button')
  const avatarInput = form.querySelector('#profile-avatar-input')
  const avatarEditIcon = form.querySelector('.pencil-icon')
  const inputs = form.querySelectorAll('input[type="text"]')

  avatarBtn.addEventListener('click', () => {
    if (!avatarEditIcon.classList.contains('hidden')) {
      avatarInput.click() // Click al input invisible
    } else {
      openImageModal(avatarPreview.src)
    }
  })

  if (isAdmin || isSelf) {
    const actionsContainer = form.querySelector('.profile-actions')
    const passwordBtn = form.querySelector('#edit-password-btn')
    const editBtn = form.querySelector('#edit-profile-btn')
    const saveBtn = form.querySelector('#save-profile-btn')
    const cancelBtn = form.querySelector('#cancel-profile-btn')
    const deleteBtn = form.querySelector('#delete-profile-btn')

    actionsContainer.classList.remove('hidden')
    //EDIT
    editBtn.addEventListener('click', () => {
      inputs.forEach((input) => {
        if (input.name !== 'password') input.removeAttribute('disabled')
      })
      avatarBtn.classList.add('editable')
      avatarEditIcon.classList.remove('hidden')
      editBtn.classList.add('hidden')
      passwordBtn.classList.remove('hidden')
      saveBtn.classList.remove('hidden')
      cancelBtn.classList.remove('hidden')
      deleteBtn.classList.remove('hidden')
    })

    //PREVISUALIZACIÓN AVATAR ANTES DE SUBIRLO A LA BBDD
    avatarInput.addEventListener('change', () => {
      const file = avatarInput.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          avatarPreview.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })

    passwordBtn.addEventListener('click', () => {
      const modal = ChangePasswordModal()
      document.body.appendChild(modal)
    })

    //SUBMIT
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const idToUpdate = userProfile._id
      try {
        const result = await updateUserAPI(idToUpdate, formData)
        const userToSave = result.user

        if (idToUpdate === loggedUser._id) {
          localStorage.setItem('user', JSON.stringify(userToSave))
          Header()
        }
        alert('Profile updated successfully!✅')
        navigate(Profile, idToUpdate)
      } catch (error) {
        console.error(error)
        alert('Failed to update profile: ' + error.message)
      }
    })

    //CANCEL
    cancelBtn.addEventListener('click', () => {
      navigate(Profile, userProfile._id)
    })

    //DELETE
    deleteBtn.addEventListener('click', () => {
      console.log(isSelf)

      isSelf
        ? deleteUser(userProfile, 'self')
        : deleteUser(userProfile, 'admin')
    })
  }
}
