import { searchEventsAPI } from '../../api/events'
import { Home } from '../../pages/Home/Home'
import { navigate } from '../navigation/navigation'

export const executeSearch = async (searchQuery) => {
  if (searchQuery === '') {
    navigate(Home)
    return
  }

  navigate(Home, { query: searchQuery })
}
