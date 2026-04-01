import './Login.css'
import { LoginForm } from '../../components/Login/LoginForm/LoginForm'

export const Login = () => {
  const main = document.querySelector('#app-main')
  main.innerHTML = ''

  const loginPage = document.createElement('section')
  loginPage.classList.add('login-page-container')

  const form = LoginForm()

  loginPage.append(form)

  return loginPage
}
