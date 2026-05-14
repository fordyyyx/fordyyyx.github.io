let stravaButton = document.getElementById("strava-button");
let homeButton = document.getElementById("home-nav-button");

stravaButton.addEventListener("click", function() {
    window.open('https://www.strava.com/athletes/116195932', '_blank');
}, false)

homeButton.addEventListener("click", function() {
    location.href = '../../index.html';
})