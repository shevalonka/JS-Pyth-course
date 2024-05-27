let sequence = [];
let playerSequence = [];
let level = 1;
const colors = ['blue', 'yellow', 'red', 'green'];

const startButton = document.getElementById('start');
const colorButtons = document.getElementsByClassName('color-button');
const levelButton = document.getElementById('level');
const repeatClick = document.getElementById('repeat-click');
const levelElement = document.getElementById('level');

function start() {
    console.log('the player starts game');
    startButton.style.display = 'none';
    repeatClick.style.display = 'flex';
    levelElement.textContent = 'Level ' + level;
}

startButton.addEventListener('click', start);


for (let button of colorButtons) {
    button.addEventListener('click', () => {
        playerSequence.push(button.id);
        console.log(playerSequence);
    })
}
