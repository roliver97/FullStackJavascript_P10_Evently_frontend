import { Profile } from '../../../pages/Profile/Profile'
import { navigate } from '../../../utils/navigation/navigation'

export const renderList = (container, itemsToShow) => {
  container.innerHTML = ''

  if (!itemsToShow || itemsToShow.length === 0) {
    container.innerHTML = '<p class="empty-item">No items found</p>'
    return
  }

  itemsToShow.forEach((item) => {
    const itemBtn = document.createElement('button')
    itemBtn.classList.add('listItem-btn')

    itemBtn.innerHTML = `
    <div class="listItem-avatar-div">
      <img src="${item.avatar || '/icons/user-avatar-default.svg'}" alt="${item.firstName} ${item.lastName} avatar picture">
    </div>

    <div class="listItem-content-div">
      <p class="listItem-name">${item.firstName} ${item.lastName}</p>
      <p class="listItem-username">@${item.username}</p>
    </div>
    `

    itemBtn.addEventListener('click', () => {
      document.querySelector('#event-social-viewer-overlay').remove()
      navigate(Profile, item._id)
    })

    container.appendChild(itemBtn)
  })
}
