export const LoginFormTemplate = () => {
  return `
    <div class="login-form-group" id="login-form-title-group">
      <div class="login-form-div">
      <h2>Welcome back to Evently</h2>
      </div>
      <div class="login-form-div">
       <h3>Log in or create an account</h3>
       <p>Enter with your Evently account if you are already registered </p>
      </div>
    </div> 
  
    <div class=hidden id="error-container"></div>
  
    <div class="login-form-group" id="login-form-input-group">
      <div class="login-form-input-div">
        <label for="login-email" class="login-label">Email</label>
        <input type="email" id="login-email" name="email" placeholder="exemple@email.com" class="login-input" required>
      </div> 
  
      <div class="login-form-input-div">
        <label for="login-password" class="login-label">Password</label>
        <input type="password" id="login-password" name="password" placeholder="••••••••" class="login-input" required>
      </div>
    </div>
  
    <div class="login-form-group">
      <button type="submit" class="login-submit-btn">Log in</button>
      <button type="button" class="login-signup-btn">Don't have an account yet? <span>Sign up</span></button>
    </div>
    `
}
