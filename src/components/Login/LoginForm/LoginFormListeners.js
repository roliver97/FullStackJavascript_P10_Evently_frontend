import { loginUserAPI } from '../../../api/auth'
import { SignUp } from '../../../pages/SignUp/SignUp'
import { onLoginSuccess } from '../../../utils/auth/onLoginSuccess'
import { navigate } from '../../../utils/navigation/navigation'

export const LoginFormListeners = (form) => {
  form.querySelector('.login-signup-btn').addEventListener('click', () => {
    navigate(SignUp)
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const submitBtn = form.querySelector('.login-submit-btn')
    submitBtn.disabled = true
    submitBtn.textContent = 'Loading...'

    const errorContainer = form.querySelector('#error-container')
    errorContainer.classList.remove('active')
    errorContainer.classList.add('hidden')
    errorContainer.innerHTML = ''

    const formData = new FormData(form)

    try {
      const result = await loginUserAPI(formData)

      if (result.ok) {
        await onLoginSuccess(result)
        console.log('Login completado con éxito! 🎉')
      } else {
        errorContainer.classList.remove('hidden')
        errorContainer.classList.add('active')
        if (result.status === 401 || result.status === 400) {
          errorContainer.innerHTML = `
      <div class="login-error-div">
        <h4>Email or Password are not correct ❌</h4>
        <h4>Please, try again</h4>
      </div>`
        } else {
          errorContainer.innerHTML = `<div class="login-error-div"><h3>Lo sentimos, algo ha salido mal 🔌</h3></div>`
        }
      }
    } catch (error) {
      console.error('Error en el proceso de login:', error.message)
      errorContainer.classList.remove('hidden')
      errorContainer.classList.add('active')
      errorContainer.innerHTML = `<div class="login-error-div"><h3>Lo sentimos, algo ha salido mal 🔌</h3></div>`
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Log in'
    }
  })
}
