// Meme Editor Controller
angular.module('engineeringHacks').controller('memeEditorController', function($scope) {
  // Canvas and editor state
  let canvas;
  $scope.selectedObject = null;
  $scope.zoomLevel = 100;
  $scope.selectedSize = 'instagram-square';
  $scope.selectedLayout = null;
  $scope.customWidth = 800;
  $scope.customHeight = 600;

  // Editor settings
  $scope.newText = '';
  $scope.textFont = 'Impact';
  $scope.textSize = 40;
  $scope.textColor = '#ffffff';
  $scope.backgroundColor = '#ffffff';
  $scope.imageUrl = '';
  $scope.exportFormat = 'png';
  $scope.exportQuality = '1';

  // Theme management
  $scope.theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', $scope.theme);

  $scope.toggleTheme = function() {
    $scope.theme = $scope.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', $scope.theme);
    localStorage.setItem('theme', $scope.theme);
  };

  // Canvas sizes
  const canvasSizes = {
    'instagram-square': { width: 1080, height: 1080 },
    'instagram-story': { width: 1080, height: 1920 },
    'facebook-post': { width: 1200, height: 630 },
    'twitter-post': { width: 1200, height: 675 }
  };

  // Layout templates
  $scope.layouts = [
    {
      id: 'single',
      name: 'Single',
      gridColumns: '1fr',
      gridRows: '1fr',
      cells: [1]
    },
    {
      id: 'split-horizontal',
      name: 'Split H',
      gridColumns: '1fr 1fr',
      gridRows: '1fr',
      cells: [1, 2]
    },
    {
      id: 'split-vertical',
      name: 'Split V',
      gridColumns: '1fr',
      gridRows: '1fr 1fr',
      cells: [1, 2]
    },
    {
      id: 'quad',
      name: 'Quad',
      gridColumns: '1fr 1fr',
      gridRows: '1fr 1fr',
      cells: [1, 2, 3, 4]
    }
  ];

  // Popular meme templates
  $scope.memeTemplates = [
    {
      name: 'Drake Pointing',
      url: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg'
    },
    {
      name: 'Distracted Boyfriend',
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    },
    {
      name: 'Woman Yelling at Cat',
      url: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg'
    },
    {
      name: 'This is Fine',
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'
    },
    {
      name: 'Expanding Brain',
      url: 'https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg'
    },
    {
      name: 'Two Buttons',
      url: 'https://images.pexels.com/photos/1181276/pexels-photo-1181276.jpeg'
    }
  ];

  // Initialize canvas
  angular.element(document).ready(function() {
    initializeCanvas();
    setupEventListeners();
  });

  function initializeCanvas() {
    canvas = new fabric.Canvas('memeCanvas', {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff'
    });

    // Set initial canvas size
    $scope.changeCanvasSize();
  }

  function setupEventListeners() {
    canvas.on('selection:created', handleObjectSelection);
    canvas.on('selection:updated', handleObjectSelection);
    canvas.on('selection:cleared', clearObjectSelection);
    canvas.on('object:modified', updateCanvas);
  }

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

  function updateCanvas() {
    canvas.renderAll();
  }

  // Canvas size management
  $scope.changeCanvasSize = function() {
    const size = canvasSizes[$scope.selectedSize];
    if (size) {
      canvas.setWidth(size.width);
      canvas.setHeight(size.height);
      canvas.renderAll();
    }
  };

  $scope.applyCustomSize = function() {
    canvas.setWidth($scope.customWidth);
    canvas.setHeight($scope.customHeight);
    canvas.renderAll();
  };

  // Layout selection
  $scope.selectLayout = function(layout) {
    $scope.selectedLayout = layout.id;
    // Here you could add logic to create layout guides or grids
  };

  // Image handling
  $scope.triggerImageUpload = function() {
    document.getElementById('imageUpload').click();
  };

  $scope.handleImageUpload = function(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        fabric.Image.fromURL(e.target.result, function(img) {
          // Scale image to fit canvas
          const scale = Math.min(
            canvas.width / img.width * 0.5,
            canvas.height / img.height * 0.5
          );
          
          img.scale(scale);
          img.center();
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  $scope.addImageFromUrl = function() {
    if ($scope.imageUrl) {
      fabric.Image.fromURL($scope.imageUrl, function(img) {
        const scale = Math.min(
          canvas.width / img.width * 0.5,
          canvas.height / img.height * 0.5
        );
        
        img.scale(scale);
        img.center();
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      }, { crossOrigin: 'anonymous' });
      
      $scope.imageUrl = '';
    }
  };

  $scope.addMemeTemplate = function(template) {
    fabric.Image.fromURL(template.url, function(img) {
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      
      img.scale(scale);
      img.center();
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    }, { crossOrigin: 'anonymous' });
  };

  // Text handling
  $scope.addText = function() {
    if ($scope.newText) {
      const text = new fabric.Text($scope.newText, {
        left: 100,
        top: 100,
        fontFamily: $scope.textFont,
        fontSize: parseInt($scope.textSize),
        fill: $scope.textColor,
        stroke: '#000000',
        strokeWidth: 2,
        textAlign: 'center'
      });
      
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      
      $scope.newText = '';
    }
  };

  // Background management
  $scope.changeBackgroundColor = function() {
    canvas.setBackgroundColor($scope.backgroundColor, canvas.renderAll.bind(canvas));
  };

  $scope.clearCanvas = function() {
    canvas.clear();
    canvas.setBackgroundColor($scope.backgroundColor, canvas.renderAll.bind(canvas));
  };

  // Zoom controls
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

  // Undo/Redo (basic implementation)
  let canvasHistory = [];
  let historyIndex = -1;

  function saveState() {
    if (historyIndex < canvasHistory.length - 1) {
      canvasHistory = canvasHistory.slice(0, historyIndex + 1);
    }
    canvasHistory.push(JSON.stringify(canvas.toJSON()));
    historyIndex++;
  }

  $scope.undo = function() {
    if (historyIndex > 0) {
      historyIndex--;
      canvas.loadFromJSON(canvasHistory[historyIndex], canvas.renderAll.bind(canvas));
    }
  };

  $scope.redo = function() {
    if (historyIndex < canvasHistory.length - 1) {
      historyIndex++;
      canvas.loadFromJSON(canvasHistory[historyIndex], canvas.renderAll.bind(canvas));
    }
  };

  // Object property updates
  $scope.updateObjectProperty = function(property) {
    if ($scope.selectedObject) {
      $scope.selectedObject.set(property, $scope.selectedObject[property]);
      canvas.renderAll();
    }
  };

  // Layer management
  $scope.moveLayer = function(direction) {
    if (!$scope.selectedObject) return;
    
    if (direction === 'front') {
      $scope.selectedObject.bringToFront();
    } else if (direction === 'back') {
      $scope.selectedObject.sendToBack();
    }
    
    canvas.renderAll();
  };

  $scope.deleteObject = function() {
    if ($scope.selectedObject) {
      canvas.remove($scope.selectedObject);
      $scope.selectedObject = null;
      canvas.renderAll();
    }
  };

  // Export functionality
  $scope.downloadMeme = function() {
    const dataURL = canvas.toDataURL({
      format: $scope.exportFormat,
      quality: parseFloat($scope.exportQuality),
      multiplier: 1
    });
    
    const link = document.createElement('a');
    link.download = `meme.${$scope.exportFormat}`;
    link.href = dataURL;
    link.click();
  };

  // Save initial state
  angular.element(document).ready(function() {
    setTimeout(function() {
      saveState();
    }, 1000);
  });

  // Save state on object modifications
  canvas && canvas.on('object:added', saveState);
  canvas && canvas.on('object:removed', saveState);
  canvas && canvas.on('object:modified', saveState);
});