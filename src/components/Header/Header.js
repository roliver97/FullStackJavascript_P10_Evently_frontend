import { closeMenu } from '../../utils/navigation/headerLogic'
import './Header.css'
import { setupHeaderListeners } from './HeaderListeners'
import { HeaderTemplate } from './HeaderTemplate'

document.addEventListener('click', (e) => {
  const profileDropdown = document.querySelector(
    '#header-profile-dropdown-menu'
  )
  const profileTrigger = document.querySelector(
    '#header-profile-trigger-button'
  )
  const mobileMenu = document.querySelector('#header-mobile-dropdown-menu')
  const mobileBtn = document.querySelector('#header-mobile-dropdown-btn')
  // Este EventListener lo ponemos fuera de cualquier función porque queremos que se ejecute cuando iniciamos la app por primera vez (es decir, cuando main.js hace import de Header) y se quede escuchando indefinidamente por mucho que hagamos renderHeader()). Así evitamos duplicados inesperados del listener.
  if (profileDropdown?.classList.contains('active')) {
    if (
      !profileDropdown.contains(e.target) &&
      !profileTrigger.contains(e.target)
    ) {
      closeMenu()
    }
  }
  if (mobileMenu?.classList.contains('active')) {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      closeMenu()
    }
  }
})

export const Header = () => {
  const app = document.querySelector('#app')
  const oldHeader = document.querySelector('#app-header')

  const isLogged = !!localStorage.getItem('token')
  // con !! obtendriamos un resultado similar a si hicieramos: const isLogged = localStorage.getItem('token') !== null. La diferencia es que !! también convertirá cualquier cosa extraña (undefined, null, strings vacíos) en un "false" rotundo. OBLIGA a JS a devolver un TRUE o FALSE.
  const userData = localStorage.getItem('user')
  const user = userData ? JSON.parse(userData) : null

  const header = document.createElement('header')
  header.id = 'app-header'
  header.innerHTML = HeaderTemplate(isLogged, user)

  if (oldHeader) {
    oldHeader.replaceWith(header)
  } else {
    app.prepend(header)
  }

  setupHeaderListeners(header, isLogged)

  return header
}
