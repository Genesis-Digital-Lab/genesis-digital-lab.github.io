// Resume Builder Controller
angular.module('engineeringHacks').controller('resumeBuilderController', function($scope) {
  // Initialize resume data
  $scope.resumeData = {
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      photo: null
    },
    social: {
      linkedin: '',
      github: '',
      leetcode: '',
      hackerrank: '',
      portfolio: ''
    },
    summary: '',
    skills: [],
    experience: [],
    education: [],
    certifications: []
  };

  // Template data
  $scope.templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and modern design perfect for tech roles',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Professional template for senior positions',
      preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Eye-catching design for creative professionals',
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean layout',
      preview: 'https://images.pexels.com/photos/590024/pexels-photo-590024.jpeg'
    }
  ];

  $scope.selectedTemplate = 'modern';
  $scope.newSkill = '';

  // Theme management
  $scope.theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', $scope.theme);

  $scope.toggleTheme = function() {
    $scope.theme = $scope.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', $scope.theme);
    localStorage.setItem('theme', $scope.theme);
  };

  // Photo upload handler
  $scope.handlePhotoUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.resumeData.personal.photo = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Skills management
  $scope.addSkill = function(event) {
    if (event && event.keyCode !== 13) return;
    if ($scope.newSkill && $scope.newSkill.trim()) {
      $scope.resumeData.skills.push($scope.newSkill.trim());
      $scope.newSkill = '';
    }
  };

  $scope.removeSkill = function(index) {
    $scope.resumeData.skills.splice(index, 1);
  };

  // Experience management
  $scope.addExperience = function() {
    $scope.resumeData.experience.push({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  $scope.removeExperience = function(index) {
    $scope.resumeData.experience.splice(index, 1);
  };

  // Education management
  $scope.addEducation = function() {
    $scope.resumeData.education.push({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: ''
    });
  };

  $scope.removeEducation = function(index) {
    $scope.resumeData.education.splice(index, 1);
  };

  // Certification management
  $scope.addCertification = function() {
    $scope.resumeData.certifications.push({
      name: '',
      issuer: '',
      date: ''
    });
  };

  $scope.removeCertification = function(index) {
    $scope.resumeData.certifications.splice(index, 1);
  };

  // Template selection
  $scope.selectTemplate = function(templateId) {
    $scope.selectedTemplate = templateId;
  };

  $scope.getTemplateUrl = function() {
    return `Templates/resume-${$scope.selectedTemplate}.html`;
  };

  // Export functions
  $scope.downloadPDF = function() {
    const element = document.getElementById('resumePreview');
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf if available, otherwise fallback to jsPDF
    if (window.html2pdf) {
      html2pdf().set(opt).from(element).save();
    } else {
      // Fallback using jsPDF and html2canvas
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('resume.pdf');
      });
    }
  };

  $scope.downloadDOC = function() {
    const element = document.getElementById('resumePreview');
    const html = element.innerHTML;
    
    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.doc';
    link.click();
    URL.revokeObjectURL(url);
  };

  $scope.downloadHTML = function() {
    const element = document.getElementById('resumePreview');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .resume-template { line-height: 1.6; color: #333; }
          .resume-header { text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #333; }
          .resume-header h1 { margin: 0; font-size: 2rem; color: #333; }
          .resume-section { margin-bottom: 1.5rem; }
          .resume-section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          .social-links { display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; }
          .social-links a { color: #007bff; text-decoration: none; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Initialize with sample data
  $scope.addExperience();
  $scope.addEducation();
  $scope.addCertification();
});