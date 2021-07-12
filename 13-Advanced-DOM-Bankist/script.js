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
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const allSections = document.querySelector('.section');
// console.log(allSections);
const header = document.querySelector('.header');
//
// document.getElementById('section--1');
// const allButtons = document.getElementsByName('button');
// console.log(allButtons);
//
// console.log(document.getElementsByClassName('btn'))

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Deleting element

document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      message.remove();
      // message.parentElement.removeChild(message)
    })

/////////////////////////////////////
// 6. Style, class and Attributes

// Style

message.style.backgroundColor = '#37383d';
message.style.width = '104%';
message.style.height =
    Number.parseFloat(getComputedStyle(message).height , 10) + 40 +'px';
/*


console.log(message.style.backgroundColor);
// Output: Nothing
console.log(message.style.height);

console.log(getComputedStyle(message).height);

// console.log(getComputedStyle(message).height)

document.documentElement.style.setProperty('--color-primary', 'orangered')

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non-standard attribute
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist')

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.getAttribute('href'));
console.log(link.href);

// Data attributes

console.log(logo.dataset.versionNumber);

*/
/////////////////////////////////////////////////
//7. Implementing scrolling smooth

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
    // const coordsS1 = section1.getBoundingClientRect();
    // console.log(coordsS1);
    // console.log(e.target.getBoundingClientRect());
    //
    // console.log('Current scroll: ', window.pageXOffset, window.pageYOffset);
    //
    // console.log('Height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    //
    // // Scroll to
    // // scrollTo(coordsS1.left + window.pageXOffset, coordsS1.top +window.pageYOffset);
    //
    // scrollTo(
    //     {
    //         left: coordsS1.left + window.pageXOffset,
    //         top: coordsS1.top + window.pageYOffset,
    //         behavior: 'smooth'
    //     }
    // )
    section1.scrollIntoView({behavior: "smooth"})

    
})













