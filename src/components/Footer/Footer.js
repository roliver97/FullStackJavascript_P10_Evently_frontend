import './Footer.css'

export const Footer = () => {
  const app = document.querySelector('#app')

  const footer = document.createElement('footer')
  footer.id = 'app-footer'

  const FooterTemplate = () => {
    return `
    <div class="footer-content container">
      <p>© 2026 Evently - Created by Roman Oliver - ThePower | Rock The Code</p>
      <div class="footer-links">
        <a href="https://github.com/roliver97" target="_blank">GitHub</a>
        <a href="#">Eventos</a>
      </div>
    </div>
`
  }

  footer.innerHTML = FooterTemplate()

  app.appendChild(footer)
}
