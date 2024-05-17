const cards = document.querySelectorAll(".memory-card");
const message = document.querySelector(".message");

let hasFlippedCard = false;
let isBoardLocked = false;
let firstCard, secondCard;
let matches = 0;

function flipCard() {
  if (isBoardLocked) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // second click

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    firstCard.dataset.framework === secondCard.dataset.framework
      ? disableCards()
      : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matches++;
  checkWin();
  resetBoard();
}

function unflipCards() {
  isBoardLocked = true;
  setTimeout(() => {
    firstCard.classList.toggle("flip");
    secondCard.classList.toggle("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, isBoardLocked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();

function checkWin() {
  if (matches === 6) message.textContent = "YOU WIN!!";
}

cards.forEach((card) => card.addEventListener("click", flipCard));
