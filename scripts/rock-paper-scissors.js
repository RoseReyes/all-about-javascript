const resultElement = document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');
const autoPlayButtonElement = document.querySelector('.js-auto-play');
const resetButtonElement = document.querySelector('.js-reset-button');

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
  intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove), 6000;
  });

  if (!isAutoPlaying) {
    autoPlay();
    isAutoPlaying = true;
    document.querySelector('.js-auto-play').innerText = 'Stop Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
  }
};

const pickComputerMove = () => {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
};

const playGame = (letter) => {
  const computerMove = pickComputerMove();
  const playerMove =
    letter === 'r' ? 'rock' : letter === 'p' ? 'paper' : 'scissors';

  let result = '';

  switch (letter) {
    case 'r':
      if (computerMove === 'paper') {
        result = 'You lose, go home.';
      } else if (computerMove === 'scissors') {
        result = 'You win!';
      } else if (computerMove === 'rock') {
        result = 'Tie!';
      }
      break;
    case 'p':
      if (computerMove === 'scissors') {
        result = 'You lose, go home.';
      } else if (computerMove === 'rock') {
        result = 'You win!';
      } else if (computerMove === 'paper') {
        result = 'Tie!';
      }
      break;
    case 's':
      if (computerMove === 'rock') {
        result = 'You lose, go home.';
      } else if (computerMove === 'paper') {
        result = 'You win!';
      } else if (computerMove === 'scissors') {
        result = 'Tie!';
      }
      break;
    default:
      console.log('invalid letter');
  }

  if (result.includes('You win!')) {
    score.wins++;
  } else if (result.includes('You lose, go home.')) {
    score.losses++;
  } else if (result.includes('Tie!')) {
    score.ties++;
  }

  resultElement.innerText = result;
  movesElement.innerHTML = `You
      <img
        src="../images/${playerMove}-emoji.png"
        class="move-icon"
        alt="rock" /><img
        src="../images/${computerMove}-emoji.png"
        class="move-icon"
        alt="rock" />Computer`;

  updateScore();
  localStorage.setItem('score', JSON.stringify(score));
};

const updateScore = () => {
  const scoreElement = document.querySelector('.js-score');
  scoreElement.innerText = ` Wins: ${score.wins}, Looses: ${score.losses}, Ties: ${score.ties}`;
};

const resetGame = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  updateScore();
  resultElement.innerText = '';
  movesElement.innerHTML = '';
  localStorage.removeItem('score');
};

/* Events */
resetButtonElement.addEventListener('click', () => {
  resetGame();
});

autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  playGame(event.key);
});

const init = () => {
  updateScore();
};

init();
