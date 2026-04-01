import { Header } from '../../components/Header/Header'
import { Home } from '../../pages/Home/Home'
import { navigate } from '../navigation/navigation'

export const onLoginSuccess = async (userData) => {
  localStorage.setItem('token', userData.token)
  localStorage.setItem('user', JSON.stringify(userData.user))

  Header()

  await navigate(Home)
}
