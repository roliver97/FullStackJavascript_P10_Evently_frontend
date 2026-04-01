export const CreatedEventsTemplate = (context) => {
  return `
    <h2 class=profile-title>${context.isSelf ? 'Your Events' : 'Events'}</h2>

      <div class="profile-cards-container">
      </div>
    `
}
