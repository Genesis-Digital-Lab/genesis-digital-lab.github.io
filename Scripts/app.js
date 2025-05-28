// Initialize Angular app
const app = angular.module('engineeringHacks', []);

// Configuration
app.config(function($sceDelegateProvider) {
  // Configure SCE for resource loading
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://images.pexels.com/**'
  ]);
});

// Run block for app initialization
app.run(function($rootScope) {
  // Check for stored theme preference
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  // Set theme state in rootScope
  $rootScope.theme = storedTheme;
  
  // Expose theme toggle function
  $rootScope.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    $rootScope.theme = newTheme;
  };
  
  // Initialize animation observer
  if ('IntersectionObserver' in window) {
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateOnScrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Start observing elements when DOM is loaded
    angular.element(document).ready(function() {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScrollObserver.observe(element);
      });
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      element.classList.add('visible');
    });
  }
});