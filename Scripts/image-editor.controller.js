angular.module('engineeringHacks').controller('imageEditorController', function($scope) {
    // Initialize variables
    $scope.projectName = 'Untitled design';
    $scope.activeTab = 'templates';
    $scope.zoomLevel = 100;
    $scope.selectedSize = 'instagram-post';
    
    // Canvas initialization
    let canvas;
    
    angular.element(document).ready(function() {
      initializeCanvas();
      setupEventListeners();
    });
    
    function initializeCanvas() {
      canvas = new fabric.Canvas('canvas', {
        width: 1080,
        height: 1080,
        backgroundColor: 'white'
      });
      
      $scope.canvas = canvas;
    }
    
    function setupEventListeners() {
      canvas.on('selection:created', handleObjectSelection);
      canvas.on('selection:cleared', clearObjectSelection);
      canvas.on('object:modified', updateCanvas);
    }
    
    // Tab Management
    $scope.setActiveTab = function(tab) {
      $scope.activeTab = tab;
    };
    
    // Templates
    $scope.templates = [
      {
        name: 'Instagram Post',
        thumbnail: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
        width: 1080,
        height: 1080
      },
      {
        name: 'Instagram Story',
        thumbnail: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg',
        width: 1080,
        height: 1920
      },
      {
        name: 'Facebook Post',
        thumbnail: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
        width: 1200,
        height: 630
      }
    ];
    
    // Elements
    $scope.elementCategories = [
      {
        name: 'Shapes',
        elements: [
          { name: 'Circle', type: 'circle' },
          { name: 'Rectangle', type: 'rect' },
          { name: 'Triangle', type: 'triangle' }
        ]
      },
      {
        name: 'Lines',
        elements: [
          { name: 'Straight Line', type: 'line' },
          { name: 'Arrow', type: 'arrow' }
        ]
      }
    ];
    
    // Text Styles
    $scope.textStyles = [
      {
        name: 'Heading 1',
        preview: 'font-size: 48px; font-weight: bold;',
        properties: {
          fontSize: 48,
          fontWeight: 'bold'
        }
      },
      {
        name: 'Subtitle',
        preview: 'font-size: 24px; font-style: italic;',
        properties: {
          fontSize: 24,
          fontStyle: 'italic'
        }
      }
    ];
    
    // Fonts
    $scope.fonts = [
      { name: 'Arial', value: 'Arial' },
      { name: 'Helvetica', value: 'Helvetica' },
      { name: 'Times New Roman', value: 'Times New Roman' },
      { name: 'Courier New', value: 'Courier New' }
    ];
    
    // Image Filters
    $scope.imageFilters = [
      { name: 'Normal', preview: 'path/to/normal.jpg' },
      { name: 'Grayscale', preview: 'path/to/grayscale.jpg' },
      { name: 'Sepia', preview: 'path/to/sepia.jpg' }
    ];
    
    // Canvas Size Management
    $scope.changeCanvasSize = function() {
      const sizes = {
        'instagram-post': { width: 1080, height: 1080 },
        'instagram-story': { width: 1080, height: 1920 },
        'facebook-post': { width: 1200, height: 630 },
        'twitter-post': { width: 1200, height: 675 }
      };
      
      const newSize = sizes[$scope.selectedSize];
      if (newSize) {
        canvas.setWidth(newSize.width);
        canvas.setHeight(newSize.height);
        canvas.renderAll();
      }
    };
    
    // Zoom Controls
    $scope.zoomIn = function() {
      if ($scope.zoomLevel < 200) {
        $scope.zoomLevel += 10;
        canvas.setZoom($scope.zoomLevel / 100);
      }
    };
    
    $scope.zoomOut = function() {
      if ($scope.zoomLevel > 50) {
        $scope.zoomLevel -= 10;
        canvas.setZoom($scope.zoomLevel / 100);
      }
    };
    
    // Image Upload
    $scope.triggerUpload = function() {
      document.getElementById('imageInput').click();
    };
    
    $scope.handleImageUpload = function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        fabric.Image.fromURL(e.target.result, function(img) {
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          ) * 0.8;
          
          img.scale(scale);
          img.center();
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        });
      };
      
      reader.readAsDataURL(file);
    };
    
    // Text Management
    $scope.addText = function(type) {
      const textStyles = {
        heading: { fontSize: 48, fontWeight: 'bold' },
        subheading: { fontSize: 36 },
        body: { fontSize: 16 }
      };
      
      const text = new fabric.Text('Double click to edit', {
        left: 50,
        top: 50,
        ...textStyles[type],
        fontFamily: 'Arial',
        fill: '#000000'
      });
      
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    };
    
    // Object Selection
    function handleObjectSelection(options) {
      $scope.$apply(function() {
        $scope.selectedObject = options.target;
      });
    }
    
    function clearObjectSelection() {
      $scope.$apply(function() {
        $scope.selectedObject = null;
      });
    }
    
    // Object Properties
    $scope.updateObjectProperty = function(property) {
      if ($scope.selectedObject) {
        $scope.selectedObject.set(property, $scope.selectedObject[property]);
        canvas.renderAll();
      }
    };
    
    // Layer Management
    $scope.moveLayer = function(direction) {
      if (!$scope.selectedObject) return;
      
      if (direction === 'up') {
        $scope.selectedObject.bringForward();
      } else {
        $scope.selectedObject.sendBackwards();
      }
      
      canvas.renderAll();
    };
    
    // Delete Object
    $scope.deleteObject = function() {
      if ($scope.selectedObject) {
        canvas.remove($scope.selectedObject);
        $scope.selectedObject = null;
        canvas.renderAll();
      }
    };
    
    // Save & Export
    $scope.saveProject = function() {
      const projectData = {
        name: $scope.projectName,
        canvas: canvas.toJSON(),
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('imageEditorProject', JSON.stringify(projectData));
    };
    
    $scope.exportImage = function() {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      
      const link = document.createElement('a');
      link.download = `${$scope.projectName}.png`;
      link.href = dataURL;
      link.click();
    };
    
    // Canvas Updates
    function updateCanvas() {
      canvas.renderAll();
    }
  });