'use strict';
const btnStart = document.querySelector('.btn__start');
const cardsList = document.querySelector('.cards__list');
const radioInput = document.getElementsByName('game-options');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let cardsNumber = '';
let acc = '';

function displayCards() {
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked === true) {
      cardsNumber = radioInput[i].value;
    }
  }
}

function faceDown (event) {
  const clickedCard = event.currentTarget;
  clickedCard.classList.toggle('hidden');
}

function setGame() {
  displayCards();
  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${cardsNumber}.json`)
    .then(response => response.json())
    .then(data => {
      let acc = '';
      for (const item of data) {
        acc += `<li>
                  <div class="card-frame">
                    <img class="card-image" src="${item.image}"  alt="cara de la carta">
                  </div>
                  <div class="card-frame">
                    <img class="card-image back " src="${backCard}"  alt="cara de la carta">
                  </div>
                </li>`;
      }
      cardsList.innerHTML = acc;
      const cardResult = document.querySelectorAll('.card-frame');
      for (let i = 0; i < cardResult.length; i++) {
        cardResult[i].addEventListener('click',faceDown);
      }
    }
    );
}



btnStart.addEventListener('click', setGame);
