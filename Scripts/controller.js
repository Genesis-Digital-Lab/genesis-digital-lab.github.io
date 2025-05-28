// Main controller
angular.module('engineeringHacks').controller('mainController', function($scope, $interval) {
  // Mobile menu state
  $scope.isMenuOpen = false;
  
  // Toggle mobile menu
  $scope.toggleMenu = function() {
    $scope.isMenuOpen = !$scope.isMenuOpen;
  };
  
  // Close mobile menu when a link is clicked
  $scope.closeMenu = function() {
    $scope.isMenuOpen = false;
  };
  
  // Carousel data
  $scope.carouselSlides = [
    {
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
      alt: 'JSON Tool',
      title: 'JSON Formatter & Validator',
      description: 'Format, beautify, validate, and fix JSON issues with our powerful and easy-to-use tool.',
      link: '/json-tool',
      buttonText: 'Try Now'
    },
    {
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      alt: 'Code Generator',
      title: 'Code Generator',
      description: 'Generate boilerplate code for various programming languages and frameworks to save time.',
      link: '/code-gen',
      buttonText: 'Try Now'
    },
    {
      image: 'https://images.pexels.com/photos/6863175/pexels-photo-6863175.jpeg',
      alt: 'PDF Tools',
      title: 'PDF Editor & E-Signing',
      description: 'Edit PDF files, merge documents, and create electronic signatures without any installations.',
      link: '/pdf-tools',
      buttonText: 'Try Now'
    }
  ];
  
  // Current slide index
  $scope.currentSlide = 0;
  
  // Navigate to next slide
  $scope.nextSlide = function() {
    $scope.currentSlide = ($scope.currentSlide + 1) % $scope.carouselSlides.length;
  };
  
  // Navigate to previous slide
  $scope.prevSlide = function() {
    $scope.currentSlide = ($scope.currentSlide - 1 + $scope.carouselSlides.length) % $scope.carouselSlides.length;
  };
  
  // Navigate to specific slide
  $scope.goToSlide = function(index) {
    $scope.currentSlide = index;
  };
  
  // Auto-rotate carousel every 5 seconds
  const autoSlide = $interval(function() {
    $scope.nextSlide();
  }, 5000);
  
  // Clear interval when scope is destroyed
  $scope.$on('$destroy', function() {
    $interval.cancel(autoSlide);
  });
  
  // Tools data
  $scope.tools = [
    { name: 'JSON Formatter & Validator', url: '/json-tool' },
    { name: 'Code Generator', url: '/code-generator' },
    { name: 'PDF Editor & E-Sign', url: '/pdf-tools' },
    { name: 'Image Converter', url: '/image-converter' },
    { name: 'Markdown Editor', url: '/markdown-editor' },
    { name: 'Color Picker & Palette', url: '/color-picker' }
  ];
  
  // Guides data
  $scope.guides = [
    { name: 'JSON Basics Guide', url: '/guides/json-basics' },
    { name: 'Code Formatting Best Practices', url: '/guides/code-formatting' },
    { name: 'PDF Editing Tutorial', url: '/guides/pdf-editing' },
    { name: 'Image Optimization Guide', url: '/guides/image-optimization' },
    { name: 'Markdown Basics', url: '/guides/markdown-basics' },
    { name: 'Color Theory for Developers', url: '/guides/color-theory' }
  ];
  
  // Social links data
  $scope.socialLinks = [
    { name: 'GitHub', url: 'https://github.com/engineering-hacks', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com/engineering_hks', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/engineering-hacks', icon: 'linkedin' },
    { name: 'YouTube', url: 'https://youtube.com/c/engineeringhacks', icon: 'youtube' },
    { name: 'Discord', url: 'https://discord.gg/engineering-hacks', icon: 'discord' }
  ];

});