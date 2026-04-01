export const EventSocialInfoTemplate = (
  event,
  isInitialViewAttendees = false
) => {
  return `
    <div class="social-viewer-container">
      <button id="close-viewer">X</button>
      
      <nav class="social-viewer-tabs">
        <button id="btn-show-attendees" class=${isInitialViewAttendees ? 'active' : ''}>Attendees <span>${event.attendees.length}</span></button>
        <button id="btn-show-likes" class=${isInitialViewAttendees ? '' : 'active'}>Likes <span>${event.favorites.length}</span></button>
      </nav>

      <div id="social-content-list">
      </div>
    </div>
  `
}
