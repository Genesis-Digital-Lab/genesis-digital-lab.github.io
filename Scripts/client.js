var app = angular.module("genesis", []);
app.controller("myCtrl", function($scope) {


});

//this is client side logic 
//this is client side logic 
function loadHeader() {

const SECRET_KEY = "{{SECRET_KEY_PLACEHOLDER}}";

// Use SECRET_KEY in your logic
console.log("The secret key is: ", SECRET_KEY);

    fetch('/src/header.html')
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('event')
    loadHeader();
});
