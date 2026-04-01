export const EventCardTemplate = (
  event,
  { isPassed, isFav, isAttending, isOwner, formattedDate, organizerFullName }
) => {
  return `
  <div class="card-properties">
        <button class="card-user-link">
          <div class="card-organizer">
            <img src="${event.organizer.avatar}" alt="${organizerFullName} Profile Picture">
            <span>${organizerFullName}</span>
          </div>
        </button>
        <div class="card-attendance">
          ${
            isOwner
              ? `<button class="owner">Owner</button>`
              : isAttending
                ? isPassed
                  ? `<button class="attended">Attended</button>`
                  : `<button class="attending">Attending</button>`
                : ''
          }
        </div>
  </div>

<div class="card-content">
    <div class="card-event-info">
            <button class=event-card-button-moreInfo hidden>More Info</button> 
            <div class="card-image">
              <img src="${event.poster || '/images/event-default-poster.jpg'}" alt="${event.title}">
            </div>
            <div class="card-text">
              <h4>${event.title}</h4>
              <p>${event.location}, ${event.city}</p>

              <div class="card-date-time">
                <span>${formattedDate}</span>
                <span>${event.hour}h</span>
              </div>
            </div>
    </div>

    <div class="card-user-actions">
              <div class="card-attendees-div">
                <button class="card-attendees-link">${event.attendees.length} <span>attendees</span>
                </button>
              </div>

              <button class=event-card-button-like>
                <img src="./icons/heart_empty.svg" class="card-heart-empty-icon ${isFav ? 'hidden' : 'active'}" alt="An empty heart icon">
                <img src="./icons/heart_full.svg" class="card-heart-full-icon ${isFav ? 'active' : 'hidden'}" alt="A filled heart icon">
              </button>

              <div class="card-favorites-div">
                <button class="card-favorites-link">${event.favorites.length} <span>likes</span>
                </button>
              </div>
    </div>
</div>
    `
}
