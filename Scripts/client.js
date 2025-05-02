var app = angular.module("genesis", []);
app.controller("genesis-controller", function($scope) {

    $scope.carouselObj = [{
        "id":1,
        "title": "Join the Instructables Contest!",
        "image": "https://ischool.uw.edu/sites/default/files/2024-04/h4sg1440b.jpg",  
        "description": "Show off your creativity, win amazing prizes, and become part of a global community of makers. Enter your DIY projects now!",
        "buttonText": "Participate Now",
        "buttonLink": "https://www.instructables.com/contest",
        "altText": "Instructables Contest",
        "target": "_blank"
      },
      {
        "id":2,
        "title": "Your Guide to Becoming a Developer",
        "image": "https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/66743550c419e40f1a70c9e6_image%20(122).png",
        "description": "Explore structured and interactive roadmaps to become a Frontend, Backend, DevOps, or any kind of developer. Start your learning journey today!",
        "buttonText": "Explore Roadmaps",
        "buttonLink": "https://roadmap.sh/",
        "altText": "Instructables Contest",
        "target": "_blank"
        
      }
      ]

      $scope.helpfulLinks = [{
        "title": "JSON Formatter",
        "href": "Formatter/JSON/json_formatter.html",
        "target": "_blank"
      },
      {
        "title": "JSON - CSV Convertor.",
        "href": "Formatter/JSON/json_csv_conversion.html",
        "target": "_blank"
      },
      {
        "title": "Image Editor",
        "href": "Formatter/JSON/json_csv_conversion.html",
        "target": "_blank"
      },
      {
        "title": "Code Complier",
        "href": "Formatter/JSON/json_formatter.html",
        "target": "_blank"
      },
      {
        "title": "JSON Visualizer",
        "href": "Formatter/JSON/json_visualizer.html",
        "target": "_blank"
      }
    ]


});


function loadHeader() {

const SECRET_KEY = "{{SECRET_KEY_PLACEHOLDER}}";

// Use SECRET_KEY in your logic
console.log("The secret key is: ", SECRET_KEY);

    fetch('/src/header.html')
        .then(response => response.text())
        .then(data => {
            //console.log(data)
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

        fetch('/src/footer.html')
        .then(response => response.text())
        .then(data => {
            //console.log(data)
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('event')
    loadHeader();
});


// Theme toggle script Starts Here
const storageKey = 'theme-preference'

const onClick = () => {
  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild
    .setAttribute('data-theme', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })
// Theme toggle script Ends Here