var score, roundScore, activePlayer, dice;

score = [0, 0];
roundScore = 0;
activePlayer = 0;



//document.querySelector('#current-' + activePlayer).textContent = dice;

document.getElementById('score-0').textContent = 0
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;



document.querySelector('.dice').style.display = 'none';

function btn() {
    var dice = Math.floor(Math.random() * 6) + 1; //random no.

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice > 1) {
        roundScore += dice;
        document.querySelector('current-' + activePlayer).textContent = roundScore;
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.dice').style.display = 'none';
    }

}

document.querySelector('.btn-roll').addEventListener('click', btn);

function hold() {
    scores[activePlayer] += roundScore;

    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];


}

document.querySelector('.btn-hold').addEventListener('click', hold);