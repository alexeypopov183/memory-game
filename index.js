const cards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const info = document.querySelector('.info');

let firstCard, secondCard;
let isFlipCard = false;
let lockBoard = false;
let countScore = 5;
let countTime = 600;

function createEndGame() {
  let div = document.createElement('div');
  div.innerHTML = 'You win!';
  info.append(div);
}


function counter() {
  countScore += 1;
  score.textContent = countScore;
  if (countScore === 6) {
    createEndGame()
    // clearTimeout(timer)
  }
}

function timer() {
  time.textContent = countTime;
  countTime -= 1;
  if (countTime < 0) {
    location.reload()
  }
  setTimeout(timer, 1000) 
}
// timer()

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!isFlipCard) {
    isFlipCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkCard();
  }
}
function checkCard() {
  let isMatch = firstCard.dataset.logo === secondCard.dataset.logo;

  isMatch
  ? disableCard()
  : returnCard();
}
function disableCard() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  counter();
}
function returnCard() {
  lockBoard = true;
  setTimeout(() => {firstCard.classList.remove('flip'), secondCard.classList.remove('flip'), resetBoard()}, 1000)
}
function resetBoard() {
  [isFlipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

;(function shuffleCards() {
  cards.forEach((card) => card.style.order = `${getRandom()}`)
})()
function getRandom() {
  return Math.floor(Math.random() * cards.length)
}
cards.forEach((card) => card.addEventListener('click', flipCard));


