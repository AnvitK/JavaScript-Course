'use strict';

// console.log(document.querySelector('.message').textContent);   // dom selection

// document.querySelector('.message').textContent = 'Correct Number!! 👍';  // dom manipulation
// // console.log(document.querySelector('.message').textContent);

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 17;
// console.log(document.querySelector('.guess').value);

const randomNo1_20 = function() {
    return Math.trunc(Math.random() * 20) + 1;
}

let secretNum =  randomNo1_20();
// document.querySelector('.number').textContent = secretNum;

let score = 20;
let highScore = 0;

const displayMsg = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
    const guessNum = Number(document.querySelector('.guess').value);
    console.log(guessNum, typeof guessNum);
    
    if(!guessNum) {   // when guessNum is empty i.e. when there is no input
        displayMsg('⛔ No Number');
    } 
    
    else if(guessNum === secretNum) {   // when player wins i.e guessNum equals secretNum
        displayMsg('🏆 Correct Number!! You WON!!!');
        document.querySelector('.number').textContent = secretNum;
        
        // document.body.style.backgroundColor = 'green';
        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '25rem';

        if(score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } 
    
    else if(guessNum !== secretNum) {   // when guess is wrong
        if(score > 1) {
            displayMsg((guessNum > secretNum) ? '📈 Too High!!' : '📉 Too Low!!');
            // (guessNum > secretNum) ? displayMsg('📈 Too High!!') : displayMsg('📉 Too Low!!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMsg('👎 You LOST!!!');
            document.querySelector('.score').textContent = 0;
        }
    }

    // else if(guessNum > secretNum) {   // when guessNum > secretNum
    //     if(score > 1) {
    //         document.querySelector('.message').textContent = '📈 Too High!!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '👎 You LOST!!!';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // } 
    
    // else if(guessNum < secretNum) {   // when guessNum < secretNum
    //     if(score > 1) {
    //         document.querySelector('.message').textContent = '📉 Too Low!!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '👎 You LOST!!!';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }
});

document.querySelector('.again').addEventListener('click', function() {
    secretNum = randomNo1_20();
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    displayMsg('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.number').style.width = '15rem';
});