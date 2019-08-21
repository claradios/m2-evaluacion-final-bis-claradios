'use strict';
const btnStart = document.querySelector('.btn__start');
const cardsList = document.querySelector('.cards__list');
const radioInput = document.getElementsByName('game-options');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let cardsNumber = '';


function displayCards() {
  for (let i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked === true) {
      cardsNumber = radioInput[i].value;
    }
  }
}


function setGame() {
  displayCards();
  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${cardsNumber}.json`)
    .then(response => response.json())
    .then(data => console.log(data));
}



btnStart.addEventListener('click', setGame);
