// Home Page Controller
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

  // Theme management
  $scope.theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', $scope.theme);

  $scope.toggleTheme = function() {
    $scope.theme = $scope.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', $scope.theme);
    localStorage.setItem('theme', $scope.theme);
  };

  // Navigation function
  $scope.navigateToTool = function(url) {
    window.location.href = url;
  };

  // Developer News Data
  $scope.developerNews = [
    {
      title: "React 19 Released with New Features",
      excerpt: "React 19 brings significant improvements including automatic batching, new hooks, and better performance optimizations.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      category: "Frontend",
      date: "2 days ago",
      url: "https://react.dev/blog"
    },
    {
      title: "GitHub Copilot X: AI-Powered Development",
      excerpt: "GitHub announces Copilot X with chat interface, pull request support, and enhanced code generation capabilities.",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      category: "AI/ML",
      date: "1 week ago",
      url: "https://github.blog"
    },
    {
      title: "Node.js 20 LTS Now Available",
      excerpt: "Node.js 20 becomes the new LTS version with improved performance, security updates, and new experimental features.",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
      category: "Backend",
      date: "3 days ago",
      url: "https://nodejs.org/en/blog"
    },
    {
      title: "TypeScript 5.3 Introduces Import Attributes",
      excerpt: "Latest TypeScript release includes import attributes, better type inference, and enhanced developer experience.",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
      category: "Languages",
      date: "5 days ago",
      url: "https://devblogs.microsoft.com/typescript"
    },
    {
      title: "Docker Desktop 4.26 Performance Improvements",
      excerpt: "New Docker Desktop version brings significant performance improvements and better resource management.",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
      category: "DevOps",
      date: "1 week ago",
      url: "https://docs.docker.com/desktop/release-notes"
    },
    {
      title: "Chrome DevTools New Debugging Features",
      excerpt: "Chrome 120 introduces new debugging tools for better performance analysis and memory leak detection.",
      image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
      category: "Tools",
      date: "4 days ago",
      url: "https://developer.chrome.com/blog"
    }
  ];

  // Free Courses Data
  $scope.freeCourses = [
    {
      title: "Complete JavaScript Course 2024",
      description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.",
      provider: "freeCodeCamp",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
      level: "Beginner",
      duration: "37 hours",
      rating: 4.8,
      reviews: 15420,
      category: "programming",
      skills: ["JavaScript", "ES6+", "DOM", "Async/Await"],
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      visible: true
    },
    {
      title: "React - The Complete Guide",
      description: "Learn React from scratch including hooks, context, routing, and state management with real projects.",
      provider: "Codecademy",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      level: "Intermediate",
      duration: "42 hours",
      rating: 4.7,
      reviews: 8930,
      category: "web-dev",
      skills: ["React", "JSX", "Hooks", "Redux"],
      url: "https://www.codecademy.com/learn/react-101",
      visible: true
    },
    {
      title: "Python for Data Science",
      description: "Complete Python course focused on data science with pandas, numpy, matplotlib, and machine learning basics.",
      provider: "Coursera",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
      level: "Beginner",
      duration: "28 hours",
      rating: 4.9,
      reviews: 12340,
      category: "data-science",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
      url: "https://www.coursera.org/learn/python-data-analysis",
      visible: true
    },
    {
      title: "Full Stack Web Development",
      description: "Build complete web applications using HTML, CSS, JavaScript, Node.js, Express, and MongoDB.",
      provider: "The Odin Project",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
      level: "Intermediate",
      duration: "60 hours",
      rating: 4.6,
      reviews: 7820,
      category: "web-dev",
      skills: ["HTML", "CSS", "Node.js", "MongoDB"],
      url: "https://www.theodinproject.com/paths/full-stack-javascript",
      visible: true
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning concepts, algorithms, and practical implementation using Python.",
      provider: "edX",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      level: "Advanced",
      duration: "35 hours",
      rating: 4.8,
      reviews: 5670,
      category: "data-science",
      skills: ["ML", "Python", "Scikit-learn", "TensorFlow"],
      url: "https://www.edx.org/course/introduction-to-machine-learning",
      visible: true
    },
    {
      title: "React Native Mobile Development",
      description: "Build cross-platform mobile apps using React Native, navigation, state management, and native features.",
      provider: "Udacity",
      image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
      level: "Intermediate",
      duration: "25 hours",
      rating: 4.5,
      reviews: 4320,
      category: "mobile",
      skills: ["React Native", "Mobile", "iOS", "Android"],
      url: "https://www.udacity.com/course/react-nanodegree--nd019",
      visible: true
    },
    {
      title: "Java Programming Masterclass",
      description: "Comprehensive Java course covering OOP, data structures, algorithms, and enterprise development.",
      provider: "Oracle Academy",
      image: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg",
      level: "Beginner",
      duration: "45 hours",
      rating: 4.7,
      reviews: 9870,
      category: "programming",
      skills: ["Java", "OOP", "Spring", "Algorithms"],
      url: "https://academy.oracle.com/en/oa-web-overview.html",
      visible: true
    },
    {
      title: "Flutter Mobile App Development",
      description: "Create beautiful mobile apps for iOS and Android using Flutter and Dart programming language.",
      provider: "Google Developers",
      image: "https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg",
      level: "Intermediate",
      duration: "30 hours",
      rating: 4.6,
      reviews: 6540,
      category: "mobile",
      skills: ["Flutter", "Dart", "Mobile UI", "Firebase"],
      url: "https://developers.google.com/learn/pathways/intro-to-flutter",
      visible: true
    },
    {
      title: "Data Visualization with D3.js",
      description: "Learn to create interactive data visualizations using D3.js, SVG, and modern web technologies.",
      provider: "Observable",
      image: "https://images.pexels.com/photos/1181276/pexels-photo-1181276.jpeg",
      level: "Advanced",
      duration: "22 hours",
      rating: 4.4,
      reviews: 3210,
      category: "data-science",
      skills: ["D3.js", "SVG", "Data Viz", "JavaScript"],
      url: "https://observablehq.com/@d3/learn-d3",
      visible: true
    }
  ];

  // Course filtering
  $scope.selectedCategory = 'all';
  $scope.filteredCourses = $scope.freeCourses;

  $scope.filterCourses = function(category) {
    $scope.selectedCategory = category;
    
    if (category === 'all') {
      $scope.filteredCourses = $scope.freeCourses;
    } else {
      $scope.filteredCourses = $scope.freeCourses.filter(function(course) {
        return course.category === category;
      });
    }
    
    // Update visibility for animation
    $scope.freeCourses.forEach(function(course) {
      course.visible = $scope.filteredCourses.includes(course);
    });
  };

  // Generate stars for rating
  $scope.getStars = function(rating) {
    return new Array(Math.floor(rating));
  };

  // Developer Tools Links
  $scope.developerTools = [
    { name: 'JSON Formatter & Validator', url: 'Formatter/JSON/json_formatter.html' },
    { name: 'JSON to CSV Converter', url: 'Formatter/JSON/json_csv_conversion.html' },
    { name: 'JSON Visualizer', url: 'Formatter/JSON/json_visualizer.html' },
    { name: 'JSON Compare Tool', url: 'Formatter/JSON/json_compare.html' },
    { name: 'JavaScript Beautifier', url: 'Formatter/JS-Formatter/js_formatter.html' },
    { name: 'Markdown Compiler', url: 'MarkDown/markdown_compler.html' }
  ];

  // Learning Resources
  $scope.learningResources = [
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/' },
    { name: 'Codecademy', url: 'https://www.codecademy.com/' },
    { name: 'Khan Academy', url: 'https://www.khanacademy.org/' },
    { name: 'Coursera', url: 'https://www.coursera.org/' },
    { name: 'edX', url: 'https://www.edx.org/' },
    { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/' }
  ];
  
  // Social Links
  $scope.socialLinks = [
    { name: 'GitHub', url: 'https://github.com/engineering-hacks', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com/engineering_hks', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/engineering-hacks', icon: 'linkedin' },
    { name: 'YouTube', url: 'https://youtube.com/c/engineeringhacks', icon: 'youtube' },
    { name: 'Discord', url: 'https://discord.gg/engineering-hacks', icon: 'discord' }
  ];

  // Initialize animation observer
  angular.element(document).ready(function() {
    if ('IntersectionObserver' in window) {
      const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateOnScrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Start observing elements
      setTimeout(function() {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
          animateOnScrollObserver.observe(element);
        });
      }, 100);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setTimeout(function() {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
          element.classList.add('visible');
        });
      }, 100);
    }
  });
});