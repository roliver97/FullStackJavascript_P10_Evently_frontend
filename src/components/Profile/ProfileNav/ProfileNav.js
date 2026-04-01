import { ProfileNavListeners } from './ProfileNavListeners'
import { ProfileNavTemplate } from './ProfileNavTemplate'

export const ProfileNav = (context) => {
  const profileNav = document.createElement('profileNav')
  profileNav.id = 'profile-nav-container'

  profileNav.innerHTML = ProfileNavTemplate(context)

  ProfileNavListeners(profileNav)

  return profileNav
}
