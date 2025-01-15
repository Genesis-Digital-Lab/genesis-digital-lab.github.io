var app = angular.module("genesis", []);
app.controller("myCtrl", function($scope) {


});

//this is client side logic 
//this is client side logic 
function loadHeader() {
    fetch('header.html')
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
