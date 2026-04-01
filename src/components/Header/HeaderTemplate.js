export const HeaderTemplate = (isLogged, user) => {
  return `
  <div class="header-content container">
    
    <div class="header-logo-container">
      <a href="javascript:void(0)" class="header-logo-link">
          <div class="header-logo-div">
            <img src="/icons/logo.svg" alt="Logo" class="logo-img">
            <span class="logo-span-bar hide-on-mobile">|</span>
            <span class="logo-span-evently hide-on-mobile">evently</span>
          </div>
      </a>
    </div>
      
      <div class="header-tools">

          <form class="nav-searchbar-form">
            <input type="text" id="header-search" placeholder="Search events...">
            <button type="submit" id="header-search-btn" class="header-search-btn">
              <img src="/icons/search.svg" alt="Search Icon" class="search-icon" >
            </button>
          </form>

          <div class="nav-filter">
            <button type="button" id="header-filter-btn" class="header-filter-btn">
              <img src="/icons/filter.svg" alt="Search Icon" class="filter-icon">
            </button>
          </div>

                  ${
                    isLogged
                      ? `<div class="create-event-btn-div hide-on-mobile">
            <button id="create-event-btn" > Create a New Event</button>
          </div>`
                      : ''
                  }
      </div>

         
          <nav class="user-nav">
            <div id="header-guest-zone" class="${isLogged ? 'hidden' : 'active'}">

              <div class="header-desktop-guest-zone hide-on-mobile">
                <button id="header-signup-btn" class="header-signup-btn">Sign Up</button>
                <button id="header-login-btn" class="header-login-btn">Login</button>
              </div>

              <div class="header-mobile-guest-zone show-on-mobile">
                <button id="header-mobile-dropdown-btn">
                  <img id="header-mobile-dropdown-icon" src="/icons/mobile-hamburger.svg" alt="Header Mobile Menu Icon">
                </button>

                <div id="header-mobile-dropdown-menu" class="hidden">
                  <a href="javascript:void(0)" id="header-mobile-signup-link">Sign Up</a>
                  <a href="javascript:void(0)" id="header-mobile-login-link">Login</a>
                </div>
              </div>
            </div>

           <div id="header-logged-zone" class="${!isLogged ? 'hidden' : 'active'}">
              <div class="header-profile-container">

                <button id="header-profile-trigger-button" class="header-profile-avatar-btn">
                  <img src=${user?.avatar || '/icons/user-avatar-default.svg' || ''} alt="Profile Avatar Menu Image" class="header-profile-avatar-img">
                </button>

                <div id="header-profile-dropdown-menu" class="header-profile-dropdown-div hidden">

                  <div class="dropdown-username-div"> 
                    <p class="user-completeName">${user?.firstName + ' ' + user?.lastName || 'User'}</p>
                    <span class="user-username">@${user?.username}</span>
                  </div>
                <hr>
                  <a href="javascript:void(0)" id="header-home-link" class="${isLogged ? 'active' : 'hidden'}">Home</a>
                  <a href="javascript:void(0)" id="create-event-dropdown-link" class="show-on-mobile">Create New Event</a>
                  <hr>
                  <a href="javascript:void(0)" id="header-profile-link">Profile</a>
                  <a href="javascript:void(0)" id="header-events-link">Own Events</a>
                  <a href="javascript:void(0)" id="header-attending-link">Attending</a>
                  <a href="javascript:void(0)" id="header-favorites-link">Favorites</a>
                <hr>
                  <button id="header-logout-btn" class="logout-link">Logout</button>
                </div>

              </div>
            </div>
          </nav>
  
   </div>
  `
}
