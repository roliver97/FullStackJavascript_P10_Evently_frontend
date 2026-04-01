export const ProfileNavTemplate = (context) => {
  const buttons = context.isSelf
    ? `
      <button id="profile-info-btn" class="active">Profile</button>
      <button id="profile-events-btn">Your Events</button>
      <button id="profile-attendance-btn">Attending</button>
      <button id="profile-favorites-btn">Favorites</button>`
    : `
      <button id="profile-info-btn" class="active">Profile</button>
      <button id="profile-events-btn">Events</button>`

  return `

    <button id="open-profile-nav-btn" class="show-on-mobile">
      <img id="profile-mobile-dropdown-icon" src="/icons/mobile-hamburger.svg" alt="Profile Mobile Nav Menu Icon">
    </button>

    
    <div class="profile-nav-links">
    <button id="close-profile-nav-btn" class="show-on-mobile">✕</button>
      ${buttons}
    </div>`
}
