import { AttendingEvents } from '../../components/Profile/ProfileEvents/AttendingEvents/AttendingEvents'
import { CreatedEvents } from '../../components/Profile/ProfileEvents/CreatedEvents/CreatedEvents'
import { FavoriteEvents } from '../../components/Profile/ProfileEvents/FavoriteEvents/FavoriteEvents'
import { ProfileForm } from '../../components/Profile/ProfileForm/ProfileForm'
import { ProfileNav } from '../../components/Profile/ProfileNav/ProfileNav'
import { getUserContext } from '../../utils/users/userHelper'
import './Profile.css'
import {
  scrollThroughProfileSections,
  setupSectionsWindowObserver
} from './ProfileListeners'

export const Profile = async (id, sectionId = null) => {
  const profilePage = document.createElement('section')
  profilePage.classList.add('profile-page', 'container')

  await renderProfile(profilePage, id, sectionId)

  return profilePage
}

const renderProfile = async (page, id, sectionId) => {
  const context = await getUserContext(id)

  page.innerHTML = ''
  const { isSelf } = context

  const nav = ProfileNav(context)
  page.append(nav)

  const contentArea = document.createElement('div')
  contentArea.id = 'profile-content-container'

  const sections = [
    await ProfileForm(context),
    await CreatedEvents(context),
    isSelf ? await AttendingEvents(context) : null,
    isSelf ? await FavoriteEvents(context) : null
  ]

  sections.forEach((section) => {
    if (section) {
      contentArea.append(section)
    }
  })

  page.append(contentArea)

  setupSectionsWindowObserver(sections)
  if (sectionId) {
    setTimeout(() => scrollThroughProfileSections(sectionId), 200)
  }

  return page
}
