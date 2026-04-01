export const ChangePasswordModalTemplate = () => {
  return `
    <div class="password-modal-container">
      <h3>Change Your Password</h3>
      <form id="change-password-form">
        <div class="change-password-input-group">
          <label for="old-password">Current Password</label>
          <input type="password" id="old-password" name="oldPassword" placeholder="Current Password" required>
        </div>
        <div class="change-password-input-group"> 
          <label for="new-password">New Password</label>
          <input type="password" id="new-password" name="newPassword" placeholder="New Password" required>
        </div>
        <div class="change-password-input-group"> 
          <label for="confirm-new-password">Confirm New Password</label>
          <input type="password" id="confirm-new-password" name="confirmPassword" placeholder="Confirm New Password" required>
        </div>
        
        <div class="change-password-actions-group">
          <button type="submit">Update Password</button>
          <button type="button" id="close-password-modal">Cancel</button>
        </div>
      </form>
    </div>
  `
}
