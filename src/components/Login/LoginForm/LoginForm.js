import './LoginForm.css'
import { LoginFormTemplate } from './LoginFormTemplate'
import { LoginFormListeners } from './LoginFormListeners'

export const LoginForm = () => {
  const form = document.createElement('form')
  form.classList.add('login-form')

  //! "name" dentro de un input en un form === la clave que espera la API segun el modelo del backend
  form.innerHTML = LoginFormTemplate()

  LoginFormListeners(form)

  return form
}
