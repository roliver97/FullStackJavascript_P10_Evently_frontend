import './openImageModal.css'

export const openImageModal = (imageSrc) => {
  const overlay = document.createElement('div')
  overlay.classList.add('image-viewer-overlay')

  overlay.innerHTML = `
    <div class="image-viewer-div">
      <img src="${imageSrc}" alt="Image Large View" class="image-viewer-img">
    </div>
  `

  const image = overlay.querySelector('.image-viewer-img')
  const imageDiv = overlay.querySelector('.image-viewer-div')

  const isZoomable =
    !imageSrc.includes('ui-avatars') &&
    !imageSrc.includes('user-avatar-default.svg')

  if (isZoomable) {
    imageDiv.addEventListener('click', (e) => {
      e.stopPropagation()

      if (image.classList.contains('zoomed')) {
        image.classList.remove('zoomed')
        return
      }

      // Calculamos donde hemos hecho click
      const rect = image.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      image.style.transformOrigin = `${x}% ${y}%`
      image.classList.add('zoomed')
    })
  } else {
    image.style.cursor = 'default'
    image.addEventListener('click', (e) => e.stopPropagation())
  }

  overlay.addEventListener('click', () => overlay.remove())

  document.body.appendChild(overlay)
}
