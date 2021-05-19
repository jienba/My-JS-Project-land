'use strict';

//Selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, gamePlaying, currentScore, activePlayer;
//Starting conditions
const init = function () {
    scores = [0,0];
    gamePlaying = true;
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEL.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice feature
btnRoll.addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        // 3. Checked for rolled 1
        if (dice !== 1) {
            // Add dice to cuurent score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // Switch to next player
            switchPlayer();
        }
    }

});
btnHold.addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add current score to active's player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score > 100
        if (scores[activePlayer] >= 10) {
            // finish the game
            gamePlaying = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        } else {
            switchPlayer();
        }

    }
});

btnNew.addEventListener('click', init);


