angular.module('engineeringHacks').controller('toolsController', function($scope) {
    // Current tool state
    $scope.currentTool = 'json';
    
    // Tool templates mapping
    const toolTemplates = {
      'json': 'templates/json-formatter.html',
      'csv': 'templates/csv-formatter.html',
      'yaml': 'templates/yaml-formatter.html',
      'string': 'templates/string-formatter.html',
      'jsondiff': 'templates/json-diff.html',
      'base64': 'templates/base64.html',
      'filebase64': 'templates/file-base64.html',
      'urlencode': 'templates/url-encoder.html',
      'barcode': 'templates/barcode-generator.html',
      'md2html': 'templates/markdown-to-html.html',
      'html2md': 'templates/html-to-markdown.html',
      'regex': 'templates/regex-validator.html'
    };
  
    // Get template for current tool
    $scope.getToolTemplate = function() {
      return toolTemplates[$scope.currentTool];
    };
  
    // Theme toggle
    $scope.theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', $scope.theme);
  
    $scope.toggleTheme = function() {
      $scope.theme = $scope.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', $scope.theme);
      localStorage.setItem('theme', $scope.theme);
    };
  
    // Mobile sidebar toggle
    $scope.isSidebarOpen = false;
    
    $scope.toggleSidebar = function() {
      $scope.isSidebarOpen = !$scope.isSidebarOpen;
    };
  
    // Close sidebar when selecting a tool on mobile
    $scope.setTool = function(tool) {
      $scope.currentTool = tool;
      if (window.innerWidth <= 768) {
        $scope.isSidebarOpen = false;
      }
    };
  });