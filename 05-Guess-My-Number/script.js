'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click' , () => {
    const guess = Number(document.querySelector('.guess').value);
    //When there is no input
    if (!guess){
        document.querySelector('.message').textContent = '⛔ No number!';
    // When player wins
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number!';
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if (score > highScore){
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }

    // When guess number is too high
    } else if (guess !== secretNumber) {
        if (guess > 1){
            displayMessage(guess > secretNumber ? '📈 Too high!' :  '📉 Too low!')
            score--;
            document.querySelector('.score').textContent = score;
        }else {
            displayMessage('💥 You lost the game');
            document.querySelector('.score').textContent = 0;

        }
    // When guess number is too loow
    }

});

document.querySelector('.again').addEventListener('click', () =>{
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.score').textContent = score;
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';

});
