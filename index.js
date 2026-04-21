let runningDiv = document.getElementById('running-div');
let cyclingDiv = document.getElementById('cycling-div');
let footballDiv = document.getElementById('football-div');
let experienceDiv = document.getElementById('experience-div');
let pdpDiv = document.getElementById('pdp-div');
let educationDiv = document.getElementById('education-div');
let webDesignDiv = document.getElementById('web-design-div');
let pythonDiv = document.getElementById('python-div');
let gameDevelopmentDiv = document.getElementById('game-development-div');
let gamingDiv = document.getElementById('gaming-div');
let cookingDiv = document.getElementById('cooking-div');
let musicDiv = document.getElementById('music-div');

let linkDivs = [
    [runningDiv, '/link-pages/sports-pages/running.html'],
    [cyclingDiv, '/link-pages/sports-pages/cycling.html'],
    [footballDiv, '/link-pages/sports-pages/football.html'],
    [experienceDiv, '/link-pages/work-pages/experience.html'],
    [pdpDiv, '/link-pages/work-pages/pdp.html'],
    [educationDiv, '/link-pages/work-pages/education.html'],
    [webDesignDiv, '/link-pages/programming-pages/web-design.html'],
    [pythonDiv, '/link-pages/programming-pages/python.html'],
    [gameDevelopmentDiv, '/link-pages/programming-pages/game-development.html'],
    [gamingDiv, '/link-pages/hobbies-pages/gaming.html'],
    [cookingDiv, '/link-pages/hobbies-pages/cooking.html'],
    [musicDiv, '/link-pages/hobbies-pages/music.html']
];

for (let div of linkDivs) {
    div[0].addEventListener('click', function() {
        location.href = div[1];
    }, false);
}