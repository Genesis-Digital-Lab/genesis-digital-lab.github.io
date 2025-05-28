// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // If Angular hasn't initialized yet, set up a fallback toggle
  if (!angular || !angular.element(document.body).scope()) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition class for animation
      document.documentElement.classList.add('theme-transition');
      
      // Remove transition class after animation completes
      setTimeout(function() {
        document.documentElement.classList.remove('theme-transition');
      }, 500);
    });
  }
  
  // Apply stored theme on page load
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  // Add smooth transitions for theme changes
  const themeTransitionStyle = document.createElement('style');
  themeTransitionStyle.textContent = `
    .theme-transition,
    .theme-transition *,
    .theme-transition *:before,
    .theme-transition *:after {
      transition: all 0.3s ease-out !important;
      transition-delay: 0 !important;
    }
  `;
  document.head.appendChild(themeTransitionStyle);
});