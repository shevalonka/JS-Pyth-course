let sequence = [];
let humanSequence = [];
let level = 0;
const colors = ['blue', 'yellow', 'red', 'green'];

const startButton = document.getElementById('start');
const colorButtons = document.map(color => document.getElementById('color-button'));
const levelButton = document.getElementById('level');

startButton.addEventListener('click', start);
colorButtons.forEach(button => {
    button.addEventListener('click', () => handlePlayerInput(button.id));
});