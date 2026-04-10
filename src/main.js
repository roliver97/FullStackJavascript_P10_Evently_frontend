import './styles/global.css'
import { Home } from './pages/Home/Home.js'
import { navigate } from './utils/navigation/navigation.js'
import { Header } from './components/Header/Header.js'
import { checkSessionAPI } from './api/auth.js'
import { router } from './router/router.js'
import { renderError } from './ui/StatusMessagesUI/StatusMessagesUI.js'
import { Footer } from './components/Footer/Footer.js'

const init = async () => {
  const app = document.body
  app.id = 'app'

  await checkSessionAPI()

  Header()

  if (!document.querySelector('#app-main')) {
    const mainElement = document.createElement('main')
    mainElement.id = 'app-main'
    app.appendChild(mainElement)
  }

  Footer()

  router()
}

init()
