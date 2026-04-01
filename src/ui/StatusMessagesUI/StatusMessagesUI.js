import './StatusMessagesUI.css'

export const renderSpinner = () => `
  <div class="status-container spinner-state-container">
    <div class="spinner">
    </div>
  </div>
`

/**
 * Retorna l'HTML d'un missatge d'error amb botó de retry
 * @param {string} message - El missatge a mostrar
 */
export const renderError = (
  message = '❌ Something went wrong. Please try again.',
  showRetry = true
) => {
  let showSpinner = !showRetry

  return `
  <div class="status-container error-state-container">
    <p class="error-message"> ${message}</p>
    ${showSpinner ? `<div class="status-spinner-wrapper">${renderSpinner()}</div>` : ''}
    ${
      showRetry
        ? `<button class="generic-error-btn" onclick="window.location.reload()">
      Try again
    </button>`
        : ''
    }
  </div>
`
}
