export const EventDetailFormTemplate = (
  event,
  {
    isCreateMode,
    isEditing,
    isDeleting,
    isPassedEvent,
    isSelf,
    isAdmin,
    isFav,
    isJoined,
    formattedDate,
    dateForInput,
    organizerFullName,
    categories
  }
) => {
  return `
      <div class="detail-header">
          <div class="detail-poster-group">
            <img class="detail-poster" src="${event?.poster || '/images/event-default-poster.jpg'}" alt="${event?.title} event poster">
            <input class="edit-input ${isEditing ? '' : 'hidden'}" type="file" name="poster" accept="image/*" aria-label="Event poster file input">
          </div>
          
          <div class="detail-main-info-div">
           <div class="detail-attendees-div">
               ${
                 !isEditing
                   ? `<a id="detail-attendees-link">${event?.attendees?.length} <span>Attendees</span></a>

                   <a id="detail-favorites-link">${event?.favorites?.length} <span>Likes</span></a>
            `
                   : ''
               }
            </div>

            <div class="detail-info-div">
              <h2 class="display-value ${isEditing ? 'hidden' : ''}">${event?.title || ''}</h2>
              <input class="edit-input ${isEditing ? '' : 'hidden'}" type="text" name="title" value="${event?.title || ''}" placeholder="Event Title" aria-label="Event title input" required>

              <p class="detail-date display-value ${isEditing ? 'hidden' : ''}">📅 ${formattedDate} - ${event?.hour}h</p>
              <div class="edit-input-group ${isEditing ? '' : 'hidden'}">
                <input type="date" name="date" value="${dateForInput}" aria-label="Event date input" required>
                <input type="time" name="hour" value="${event?.hour || ''}" aria-label="Event hour input" required>
              </div>

              <p class="detail-city display-value ${isEditing ? 'hidden' : ''}">📍 ${event?.location || ''}, ${event?.city || ''}</p>
              <div class="edit-input-group ${isEditing ? '' : 'hidden'}">
                
                <input type="text" name="location" placeholder="📍 Location" value="${event?.location || ''}" aria-label="Event location input" required>
                <input type="text" name="city" placeholder="🏙️ City" value="${event?.city || ''}"  aria-label="Event city input" required>
              </div>

              <p class="detail-category display-value ${isEditing ? 'hidden' : ''}">🏷️ ${event?.category || 'No category'}</p>
              <div class="edit-input-group ${isEditing ? '' : 'hidden'}">
                <select name="category" aria-label="Event category selection" required>
                  <option value=""disabled ${isCreateMode ? 'selected' : ''}>Select a Category</option>
                  ${categories
                    .map(
                      (cat) => `
                    <option value="${cat}" ${event?.category === cat ? 'selected' : ''}>${cat}</option>
                  `
                    )
                    .join('')}
                </select>
              </div>

              ${isPassedEvent ? `<span class="event-passed-span">This event has already passed</span>` : ''}
            </div>

            

            <div class="detail-public-actions">
              <button class="detail-button-like ${isCreateMode ? 'hidden' : ''}">
                      <img src="/icons/heart_empty.svg" class="card-heart-empty-icon ${isFav ? 'hidden' : 'active'}" alt="An empty heart icon">
                      <img src="/icons/heart_full.svg" class="card-heart-full-icon ${isFav ? 'active' : 'hidden'}" alt="A filled heart icon">
              </button>
              <button class="detail-btn-join ${isSelf || isPassedEvent ? 'hidden' : ''} ${isJoined ? 'joined' : ''}">${isJoined ? "I'm going! (Leave)" : 'I would like to join!'}</button>
            </div>
          </div>

      </div>

    <div class="detail-content-div">
        <div class="detail-sidebar-left">
          <div class="detail-description-div">
            <h3>Description</h3>
            <p class="display-value ${isEditing ? 'hidden' : ''}">${event?.description || 'No description'}</p>
            <textarea class="edit-input ${isEditing ? '' : 'hidden'}" name="description" aria-label="Event Description" placeholder="Describe your event here... What should attendees expect?" required>${isCreateMode ? '' : event?.description}</textarea>
          </div>
        </div>

        ${
          !isCreateMode
            ? `<div class="detail-sidebar-right">
          <div class="detail-organizer-box">
            <span>Organized by</span>
            <button type="button" class="detail-organizer-logo-btn" >
            <img src="${event?.organizer?.avatar}" alt="${event?.organizer?.username} avatar">
            </button>
            <button type="button" class="detail-organizer-user-btn"><span>${organizerFullName}</span> <span>@${event?.organizer?.username}</span> </button>
          </div>
        </div>`
            : ''
        }
    </div>

        <div class="detail-author-actions">
           ${
             !isEditing && !isDeleting && (isSelf || isAdmin)
               ? `<button type="button" id="edit-event-btn" class="${
                   isPassedEvent
                     ? isAdmin
                       ? 'passed-event-edit-btn-admin'
                       : 'passed-event-edit-btn'
                     : ''
                 }">Edit Event</button>`
               : ''
           }
          ${
            isEditing
              ? `<button type="submit" id="submit-event-btn">${isCreateMode ? 'Create Event' : 'Save Changes'}</button>
                        <button type="button" id="cancel-event-btn">Cancel</button>
                        ${!isCreateMode ? `<button id="delete-event-btn" type="button">Delete Event</button>` : ''}`
              : ''
          }

          ${
            isDeleting
              ? `
               <button type="button" id="cancel-event-btn">Cancel</button>
               <button id="delete-event-btn" type="button">Confirm Delete</button>`
              : ''
          }
        </div>
  `
}
