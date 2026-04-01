export const ProfileFormTemplate = ({
  userProfile,
  isSelf,
  isAdmin,
  loggedUser
}) => {
  return `
          <h2 class="profile-title">${isSelf ? `Hey, ${loggedUser.firstName}!` : isAdmin ? `${userProfile.firstName}'s Profile` : `${userProfile.firstName} ${userProfile.lastName}`}</h2>
         <p class="profile-subtitle">
           ${isSelf ? 'This is your profile page. Here, you can manage your account settings and update your information whenever you need to:' : isAdmin ? `You, as an admin, can edit some ${userProfile.username}'s info` : ''}
         </p>
  
         <div class="profile-input-container">  
            <div class="profile-avatar-input-group">
              <button type="button" id="profile-avatar-button">
                <img class="pencil-icon hidden" src="/icons/pencil-edit.svg" alt="Edit Pencil Icon">
                <img id="profile-avatar-preview" src="${userProfile.avatar || '/icons/user-avatar-default.svg'}" alt="${userProfile.username} Avatar">
              </button>
  
              <input type="file" class="hidden" id="profile-avatar-input" name="avatar" accept="image/*">
            </div>

          
            <div class="profile-input-group">
              <label for="profile-firstName">First Name</label>
              <input type="text" id="profile-firstName" name="firstName" value="${userProfile.firstName}" disabled>
            </div>
    
            <div class="profile-input-group">
              <label for="profile-lastName">Last Name</label>
              <input type="text" id="profile-lastName" name="lastName" value="${userProfile.lastName}" disabled>
            </div>
    
            <div class="profile-input-group">
              <label for="profile-username">Username</label>
              <input type="text" id="profile-username" name="username" value="${userProfile.username}" disabled>
            </div>
    
            ${
              isSelf || isAdmin
                ? `
            <div class="profile-input-group">
              <label for="profile-email">Email</label>
              <input type="text" id="profile-email" name="email" value="${userProfile.email}" disabled>
            </div>
    
            <div class="profile-input-group">
              <label for="profile-password">Password</label>
              <input type="text" id="profile-password" name="password" value="*******" disabled>
                <button type="button" class="hidden" id="edit-password-btn">Edit Password</button>
              </input>
              
            </div>

  
          <div class="profile-actions hidden">
            <button type="button" id="edit-profile-btn">Edit Profile</button>
            <button type="submit" id="save-profile-btn" class="hidden">Save Changes</button>
            <button type="button" id="cancel-profile-btn" class="hidden">Cancel Any Change</button>
            <button type="button" id="delete-profile-btn" class="hidden">Delete Account</button>
          </div>
          `
                : ''
            }
    </div> `
}
