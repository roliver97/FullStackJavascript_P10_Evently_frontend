import { getFiltersDataAPI } from '../../../api/events'
import './HeaderFilterForm.css'
import { setupHeaderFilterFormListeners } from './HeaderFilterFormListeners'
import { HeaderFilterFormTemplate } from './HeaderFilterFormTemplate'

export const renderHeaderFilterForm = async () => {
  const header = document.querySelector('#app-header')
  const filtersData = await getFiltersDataAPI()

  const filterFormOverlay = document.createElement('div')
  filterFormOverlay.innerHTML = ''
  filterFormOverlay.id = 'header-filter-form-overlay'

  const isFilterFormActive = document.querySelector(
    '#header-filter-form-overlay'
  )
  const filterBtn = header.querySelector('#header-filter-btn')

  if (isFilterFormActive) {
    filterBtn.classList.remove('active')
    isFilterFormActive.remove()
    return
  }

  filterFormOverlay.innerHTML = HeaderFilterFormTemplate(filtersData)

  header.append(filterFormOverlay)
  setupHeaderFilterFormListeners(filterFormOverlay, header)
}
