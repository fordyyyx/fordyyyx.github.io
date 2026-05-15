let stravaButton = document.getElementById("strava-button");
let homeButton = document.getElementById("home-nav-button");
let dropdownRunningButton = document.getElementById("dropdown-running-button");
let dropdownCyclingButton = document.getElementById("dropdown-cycling-button");
let dropdownFootballButton = document.getElementById("dropdown-football-button");
let dropdownExperienceButton = document.getElementById("dropdown-experience-button");
let dropdownPdpButton = document.getElementById("dropdown-pdp-button");
let dropdownEducationButton = document.getElementById("dropdown-education-button");

let dropdownButtons = [[dropdownRunningButton, '../../link-pages/sports-pages/running.html'],
                       [dropdownCyclingButton, '../../link-pages/sports-pages/cycling.html'], 
                       [dropdownFootballButton, '../../link-pages/sports-pages/football.html'],
                       [dropdownExperienceButton, '../../link-pages/work-pages/experience.html'],
                       [dropdownPdpButton, '../../link-pages/work-pages/pdp.html'],
                       [dropdownEducationButton, '../../link-pages/work-pages/education.html']
                    ]

stravaButton.addEventListener("click", function() {
    window.open('https://www.strava.com/athletes/116195932', '_blank');
}, false)

homeButton.addEventListener("click", function() {
    location.href = '../../index.html';
})

for (let btn of dropdownButtons) {
    btn[0].addEventListener("click", function() {
        location.href = btn[1];
    })
}
