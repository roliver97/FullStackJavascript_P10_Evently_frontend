import { Home } from '../../../pages/Home/Home'
import { navigate } from '../../../utils/navigation/navigation'

export const setupHeaderFilterFormListeners = (overlay, header) => {
  const form = overlay.querySelector('.header-filter-form')
  const closeBtn = overlay.querySelector('#close-filter')
  const clearBtn = overlay.querySelector('#clear-filters-btn')
  const filterBtn = header.querySelector('#header-filter-btn')

  const closeOverlay = () => {
    filterBtn.classList.remove('active')
    overlay.remove()
    // LIMPIAMOS EL LISTENER GLOBAL CUANDO OVERLAY NO EXISTA
    document.removeEventListener('click', handleOutsideClick)
  }

  const handleOutsideClick = (e) => {
    if (!form.contains(e.target) && !filterBtn.contains(e.target)) {
      closeOverlay()
    }
  }

  setTimeout(() => {
    // Para evitar que el mismo click que lo abre lo cierre al instante
    document.addEventListener('click', handleOutsideClick)
  }, 0)

  closeBtn?.addEventListener('click', closeOverlay)

  clearBtn?.addEventListener('click', () => {
    form.reset()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const filters = {
      category: form.querySelector('#filter-category').value,
      city: form.querySelector('#filter-city').value,
      date: form.querySelector('#filter-date').value
    }

    Object.keys(filters).forEach((key) => {
      //Limpiamos las keys para no ensuciar la URL con campos vacíos
      if (
        filters[key] === '' ||
        filters[key] === null ||
        filters[key] === undefined
      ) {
        delete filters[key]
      }
    })

    const currentUrlParams = new URLSearchParams(window.location.search)
    const existingQuery = currentUrlParams.get('query')
    if (existingQuery) {
      filters.query = existingQuery
    }

    closeOverlay()
    navigate(Home, filters)
  })
}
