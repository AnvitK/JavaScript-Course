'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // const score1 = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let scores;
let currScore;
let activePlayer;
let playing;

const init = function () {
  // initialise all the elements to it's real initial values
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // call immediately for first time loading

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // make current active player score element to 0 i.e. restart
  currScore = 0; // make actual current active player score to 0 i.e. restart
  activePlayer = activePlayer === 0 ? 1 : 0; // switch the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1,
    if (dice !== 1) {
      // Add dice to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
      // currScore0El.textContent = currScore;   // change later
    } else {
      // if true, switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currScore; // scores[1] = scores[1] + currScore or scores[0] = scores[0] + currScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is >= 100   >= endGoalScore
    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function() {
//     score0El.textContent = 0;
//     score1El.textContent = 0;
//     currScore0El.textContent = 0;
//     currScore1El.textContent = 0;
//     player0El.classList.remove('player--winner');
//     player1El.classList.remove('player--winner');
//     player0El.classList.add('player--active');
//     player1El.classList.remove('player--active');

//     diceEl.classList.add('hidden');

//     scores = [0, 0];
//     currScore = 0;
//     activePlayer = 0;
//     playing = true;
// });
