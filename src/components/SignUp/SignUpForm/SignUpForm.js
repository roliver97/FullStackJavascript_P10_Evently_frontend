import './SignUpForm.css'
import { SignUpFormTemplate } from './SignUpFormTemplate'
import { SignUpFormListeners } from './SignUpFormListeners'

export const SignUpForm = () => {
  const form = document.createElement('form')
  form.classList.add('signup-form')

  form.innerHTML = SignUpFormTemplate()

  SignUpFormListeners(form)

  return form
}
