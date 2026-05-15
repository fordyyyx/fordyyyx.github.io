let stravaButton = document.getElementById("strava-button");
let homeButton = document.getElementById("home-nav-button");
let dropdownRunningButton = document.getElementById("dropdown-running-button");
let dropdownCyclingButton = document.getElementById("dropdown-cycling-button");
let dropdownFootballButton = document.getElementById("dropdown-football-button");
let dropdownExperienceButton = document.getElementById("dropdown-experience-button");
let dropdownPdpButton = document.getElementById("dropdown-pdp-button");
let dropdownEducationButton = document.getElementById("dropdown-education-button");
let dropdownWebDesignButton = document.getElementById("dropdown-web-design-button");
let dropdownPythonButton = document.getElementById("dropdown-python-button");
let dropdownGameDevelopmentButton = document.getElementById("dropdown-game-development-button");
let dropdownGamingButton = document.getElementById("dropdown-gaming-button");
let dropdownCookingButton = document.getElementById("dropdown-cooking-button");
let dropdownMusicButton = document.getElementById("dropdown-music-button");

let dropdownButtons = [[dropdownRunningButton, '../sports-pages/running.html'],
                       [dropdownCyclingButton, '../sports-pages/cycling.html'], 
                       [dropdownFootballButton, '../sports-pages/football.html'],
                       [dropdownExperienceButton, '../work-pages/experience.html'],
                       [dropdownPdpButton, '../work-pages/pdp.html'],
                       [dropdownEducationButton, '../work-pages/education.html'],
                       [dropdownWebDesignButton, '../programming-pages/web-design.html'],
                       [dropdownPythonButton, '../programming-pages/python.html'],
                       [dropdownGameDevelopmentButton, '../programming-pages/game-development.html'],
                       [dropdownGamingButton, '../hobbies-pages/gaming.html'],
                       [dropdownCookingButton, '../hobbies-pages/cooking.html'],
                       [dropdownMusicButton, '../hobbies-pages/music.hmtl']
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
