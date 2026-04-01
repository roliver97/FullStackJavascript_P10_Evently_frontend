export const HeaderFilterFormTemplate = (filtersData) => {
  const cities = filtersData?.cities || []
  const categories = filtersData?.categories || []

  return `   
   <div class="header-filter-form-container">
      <button id="close-filter">X</button>
      
      <form class="header-filter-form">
        
        <div class="header-filter-form-title-group">
          <h3>Filter Events</h3>
          <p>Choose your preferences to find the perfect plan</p>
        </div>

        <div class="header-filter-form-input-group">
          <div class="filter-field">
            <label for="filter-category">Category</label>
            <select id="filter-category" name="category">
              <option value="">All Categories</option>
              ${categories.map((cat) => `<option value="${cat}">${cat}</option>`).join('')} 
            </select>
          </div>

          <div class="filter-field">
            <label for="filter-city">City</label>
            <select id="filter-city" name="city">
              <option value="">All Cities</option>
              ${cities.map((city) => `<option value="${city}">${city}</option>`).join('')}
            </select>
          </div>

          <div class="filter-field">
            <label for="filter-date">From Date</label>
            <input type="date" id="filter-date" name="date">
          </div>
        </div>

        <div class="header-filter-form-actions-group">
         <button type="submit" id="apply-filters-btn" class="btn-primary">Apply Filters</button>
          <button type="button" id="clear-filters-btn" class="btn-secondary">Clear All</button>
        </div>

      </form>
    </div>
    `
}
