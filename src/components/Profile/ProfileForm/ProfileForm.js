import './ProfileForm.css'
import { ProfileFormTemplate } from './ProfileFormTemplate'
import { ProfileFormListeners } from './ProfileFormListeners'

export const ProfileForm = async (context) => {
  const profileForm = document.createElement('form')
  profileForm.id = 'profile-form-container'
  profileForm.enctype = 'multipart/form-data'

  profileForm.innerHTML = ProfileFormTemplate(context)

  ProfileFormListeners(profileForm, context)
  return profileForm
}
