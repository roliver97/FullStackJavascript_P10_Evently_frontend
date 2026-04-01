import './ChangePasswordModal.css'
import { ChangePasswordModalListeners } from './ChangePasswordModalListeners'
import { ChangePasswordModalTemplate } from './ChangePasswordModalTemplate'

export const ChangePasswordModal = () => {
  const modal = document.createElement('div')
  modal.id = 'change-password-overlay'

  modal.innerHTML = ChangePasswordModalTemplate()

  ChangePasswordModalListeners(modal)

  return modal
}
