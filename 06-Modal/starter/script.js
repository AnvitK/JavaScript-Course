'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// const btnsOpenModal = document.querySelector('.show-modal');
// console.log(btnsOpenModal);     // selects only the first element

const btnsOpenModal = document.querySelectorAll('.show-modal');
// console.log(btnsOpenModal);     // selects all the elements

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  // console.log(btnsOpenModal[i] ,btnsOpenModal[i].textContent);
  // btnsOpenModal[i].addEventListener('click', function() {
  //     // console.log(`Button ${ i + 1 } Clicked!!!`);
  //     console.log('Button clicked!');
  //     modal.classList.remove('hidden');   // modal.style.display = 'block';
  //     overlay.classList.remove('hidden');
  // });
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal); // when clicking on close button
overlay.addEventListener('click', closeModal); // when clicking on overlay i.e. blur background

document.addEventListener('keydown', function (e) {
  console.log(e, e.code, e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log('Escape was pressed!');
    closeModal();
  }
});
