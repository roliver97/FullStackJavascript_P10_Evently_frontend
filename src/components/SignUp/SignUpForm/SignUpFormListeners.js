import { loginUserAPI, signUpUserAPI } from '../../../api/auth'
import { Login } from '../../../pages/Login/Login'
import { onLoginSuccess } from '../../../utils/auth/onLoginSuccess'
import { navigate } from '../../../utils/navigation/navigation'

export const SignUpFormListeners = (form) => {
  form.querySelector('.signup-login-btn').addEventListener('click', () => {
    navigate(Login)
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const submitBtn = form.querySelector('.signup-submit-btn')
    submitBtn.disabled = true
    submitBtn.textContent = 'Loading...'

    const errorContainer = form.querySelector('#error-container')
    errorContainer.classList.remove('active')
    errorContainer.classList.add('hidden')
    const formData = new FormData(form)
    const formDataObject = Object.fromEntries(formData)

    try {
      const result = await signUpUserAPI(formDataObject)
      if (result.ok) {
        const loginResult = await loginUserAPI(formDataObject)
        if (loginResult.ok) {
          await onLoginSuccess(loginResult)
        } else {
          throw new Error(
            'Registered! But auto-login failed. Please log in manually.'
          )
        }
      } else {
        throw new Error(result.message || 'Error en el registro ❌')
      }
    } catch (error) {
      console.error('Error en el proceso de registro:', error.message)
      errorContainer.classList.remove('hidden')
      errorContainer.classList.add('active')
      errorContainer.innerHTML = `
      <div class="signup-error-div">
      <h3>${error.message || 'No es posible conectarse con el servidor 🔌'} ✋</h3>
      <p>Por favor, revisa los datos e inténtalo de nuevo.</p>
    </div>`
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Sign Up'
    }
  })
}
