'use strict';
const btnStart = document.querySelector('.btn__start');
const cardsList = document.querySelector('.cards__list');
const radioInput = document.getElementsByName('game-options');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let cardsNumber = '';

if (localStorage !== '') {
  const storagedValue = localStorage.getItem('play');
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].value === storagedValue) {
      radioInput[i].checked = true;
    }
  }
}

function displayCards() {
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked === true) {
      cardsNumber = radioInput[i].value;
      localStorage.setItem('play', radioInput[i].value);
    }
  }
}

// function retarded (event) {
//   setInterval(compare, 1000);
// }

function flipCards(event) {
  const clickedCard = event.currentTarget;
  const haz = clickedCard.querySelector('.front');
  const enves = clickedCard.querySelector('.back');
  haz.classList.toggle('hidden');
  enves.classList.toggle('hidden');

  const cardResult = document.querySelectorAll('.card-pack');
  for (let i = 0; i < cardResult.length; i++) {
    cardResult[i].addEventListener('click', compare);
  }
}

function compare(event) {
  const clickedCard = event.currentTarget;
  const haz = clickedCard.querySelector('.front');
  const enves = clickedCard.querySelector('.back');
  const arrayOfCards = document.querySelectorAll('.front');
  setTimeout(function () {
    for (const item of arrayOfCards) {
      if (item.classList.contains('hidden') === false) {
        const visibleMother = item.parentElement;
        const itemBack = visibleMother.querySelector('.back');
        if (clickedCard.getAttribute('data-id') !== visibleMother.getAttribute('data-id')) {
          item.classList.toggle('hidden');
          itemBack.classList.toggle('hidden');
          haz.classList.toggle('hidden');
          enves.classList.toggle('hidden');
        }
      }
    }
  }, 1000);
}

function setGame() {
  displayCards();
  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${cardsNumber}.json`)
    .then(response => response.json())
    .then(data => {
      let acc = '';
      for (const item of data) {

        acc += `<li class="card-pack" data-id="${item.pair}">
                  <div class="card-frame  deco hidden front">
                    <img class="card-image"  src="${item.image}"  alt="cara de la carta">
                  </div>
                  <div class="card-frame deco back">
                    <img class="card-image" src="${backCard}"  alt="envés de la carta">
                  </div>
                </li>`;
      }
      cardsList.innerHTML = acc;
      const cardResult = document.querySelectorAll('.card-pack');
      for (let i = 0; i < cardResult.length; i++) {
        cardResult[i].addEventListener('click', flipCards);
      }
    }
    );
}

function setGameEnter(event) {
  if (event.key === 'Enter') {
    setGame();
  }
}

btnStart.addEventListener('click', setGame);
document.addEventListener('keyup', setGameEnter);



