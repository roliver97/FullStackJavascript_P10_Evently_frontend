import { SignUpForm } from '../../components/SignUp/SignUpForm/SignUpForm'
import './SignUp.css'

export const SignUp = () => {
  const main = document.querySelector('#app-main')
  main.innerHTML = ''

  const signUpPage = document.createElement('section')
  signUpPage.classList.add('signup-page-container')

  const form = SignUpForm()

  signUpPage.append(form)

  return signUpPage
}
