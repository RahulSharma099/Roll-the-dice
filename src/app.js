/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- if the player gets two 6 in a row, his GLOBAL score gets lost. After that, it's the next player's turn
- players can set the final score to decide upon on what score the winner will be decalred
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach final score points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, prevDice, finalScore;

//For info -
//document.querySelector('#current-' + activePlayer).textContent = dice; (we should not use it)
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//DOM varibles
var diceDOM1 = document.querySelector('.dice1');
var diceDOM2 = document.querySelector('.dice2');
var diceDOMALL = document.querySelectorAll('.dice');
var score0 = document.getElementById('score-0');
var score1 = document.getElementById('score-1');
var current0 = document.getElementById('current-0');
var current1 = document.getElementById('current-1');

var newButton = document.querySelector('.btn-new');
var rollButton = document.querySelector('.btn-roll');
var holdButton = document.querySelector('.btn-hold');

//function to set all values to default
function newGame() {
  roundScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  prevDice = 0;
  hideDice();
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  rollButton.disabled = false;
  holdButton.disabled = false;
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  finalScore = prompt('Set the final score');
  if (isNaN(finalScore) === true || finalScore === null) {
    alert('No Score Set!! Please enter a number.');
    newGame();
  }
}

//Invoke newGame in the begining
window.onload = newGame;

function hideDice() {
  diceDOMALL.forEach(ele => {
    ele.style.display = 'none';
  });
}

function showDice() {
  diceDOMALL.forEach(ele => {
    ele.style.display = 'block';
  });
}

function rollDice() {
  //Create random number between 1 to 6
  var dice = [0, 0];
  dice[0] = Math.floor(Math.random() * 6 + 1);
  dice[1] = Math.floor(Math.random() * 6 + 1);

  //display the result
  diceDOM1.src = 'images/dice-' + dice[0] + '.png';
  diceDOM2.src = 'images/dice-' + dice[1] + '.png';
  showDice();

  //return dice sum value
  return dice;
}

function getSumScore(arr) {
  var totalSum = 0;
  arr.forEach(ele => {
    totalSum += ele;
  });
  return totalSum;
}

function checkConsecutiveSix(dice, prevDice) {
  if (dice[0] === 6 && dice[1] === 6 && prevDice[0] === 6 && prevDice[1] === 6) return true;
  else return false;
}

function toggleActive() {
  //Nullify current score
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  //Hide Dice
  hideDice();

  //Change UI and toggle active
  //Remove active class from current activePlayer
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  //Change activePlayer
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //Add active class to current activePlayer
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

newButton.addEventListener('click', newGame); // directly invoking newGame on click

rollButton.addEventListener('click', () => {
  //example of arrow functions
  var dice = rollDice();
  var totalSum = getSumScore(dice);

  //check if previous and new value are both 12
  if (checkConsecutiveSix(dice, prevDice) === true) {
    //Update global score
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    toggleActive();
  }

  //Update the round score if number is not 1
  if ((dice[0] !== 1 && dice[1] !== 1) || (dice[0] === 1 && dice[1] === 1)) {
    //add Score
    roundScore += totalSum;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Change UI
    toggleActive();
  }
  prevDice = dice;
});

holdButton.addEventListener('click', function () {
  //example of anonymous function
  //Add current score to global score
  scores[activePlayer] += roundScore;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //check if player won the game
  if (scores[activePlayer] >= finalScore) {
    var playerName = document.getElementById('name-' + activePlayer);
    playerName.textContent = 'Winner!';
    hideDice();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    rollButton.disabled = true;
    holdButton.disabled = true;
    return;
  } else {
    //Change UI
    toggleActive();
  }
});
