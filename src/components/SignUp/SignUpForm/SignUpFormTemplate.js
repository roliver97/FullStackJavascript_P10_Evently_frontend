export const SignUpFormTemplate = () => {
  return `
  <div class="signup-form-group" id="signup-form-title-group">
    <h2>Welcome to Evently</h2>
     <p>Sign up to create an account</p>
  </div> 

  <div id="error-container"></div>

  <div class="signup-form-group" id="signup-form-input-group"> 
    <div class="signup-form-input-div">
    <label for="signup-firstName" class="signup-label">First Name</label>
    <input type="string" id="signup-firstName" name="firstName" class="signup-input" required>
    </div>

    <div class="signup-form-input-div">
    <label for="signup-lastName" class="signup-label">Last Name</label>
    <input type="string" id="signup-lastName" name="lastName" class="signup-input" required>
    </div>

    <div class="signup-form-input-div">
    <label for="signup-username" class="signup-label">Username</label>
    <input type="string" id="signup-username" name="username" class="signup-input" required>
    </div>

    <div class="signup-form-input-div">
    <label for="signup-email" class="signup-label">Email</label>
    <input type="email" id="signup-email" name="email" placeholder="exemple@email.com" class="signup-input" required>
    </div> 

    <div class="signup-form-input-div">
    <label for="signup-password" class="signup-label">Password</label>
    <input type="password" id="signup-password" name="password" placeholder="••••••••" class="signup-input" required>
    </div>
  </div>

  <div class="signup-form-group" id="signup-form-avatar-group">
  </div>

  <div class="signup-form-group" id="signup-form-submit-group">
    <button type="submit" class="signup-submit-btn">Sign Up</button>
    <button type="button" class="signup-login-btn">Do you already have an account? <span>Login</span></button>
  </div>
  `
}
