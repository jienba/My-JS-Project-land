'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
/////////////////////////////////////////////////
// 5. Selecting, Creating  and Deleting element

// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const allSections = document.querySelector('.section');
console.log(allSections);
const header = document.querySelector('.header');

document.getElementById('section--1');
const allButtons = document.getElementsByName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'))

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
header.before(message);
header.after(message);

// Deleting element

document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      message.remove();
      // message.parentElement.removeChild(message)
    })

