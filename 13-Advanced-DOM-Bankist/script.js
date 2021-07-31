'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const message = document.createElement('div');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainers = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');



///////////////////////////////////////
// Modal window

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

/////////////////////////////////////////////
// Creating and Deleting Cookies message

// Creating and inserting elements

//////////////////////////////////////////////////////////
// Button scrolling  smoothly

// btnScrollTo.addEventListener('click', function (e) {

    ////////// Old way
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

    /// Modern way
    // section1.scrollIntoView({behavior: "smooth"});
// });/////////////////////////////////////////////
// Creating and Deleting Cookies message

// Creating and inserting elements
/*

message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
message.innerHTML = 'We use cookie for improved functionality and analytics.<button class="btn btn--close-cookie"> Got it! </button>';

// header.prepend(message);
header.append(message);
// Deleting element
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        message.remove();
        // message.parentElement.removeChild(message)
    });
// Style
message.style.backgroundColor = '#37383d';
message.style.width = '104%';
message.style.height = Number.parseFloat(getComputedStyle(message).height , 10) + 40 +'px';

*/

/////////////////////////////////////////////////////////
// Page navigation
// impact performance
/*document
    .querySelectorAll('.nav__link')
    .forEach(function (el) {
        el.addEventListener('click', function (e){
            console.log('link');
            e.preventDefault();
            const id = this.getAttribute('href');
            document.querySelector(id).scrollIntoView({behavior: "smooth"})
        })
});*/

// With event delegation
// 1. Add event listener to common parent element
// 2. Determine what originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
    // console.log(e.target);
// Matching strategy
    if (e.target.classList.contains('nav__link')){
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }
});

//////////////////////////////////////////////////
// Tabbed component

tabsContainers.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return;

    // Remove classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    // Activate tab
    clicked.classList.add('operations__tab--active');
    // Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});
////////////////////////////////////////////////////////////
// 14. Implementing Menu fade animation

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('nav').querySelectorAll('.nav__link');
        const logo = link.closest('nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;

    }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////////////////
//15. Sticky navigation

/*const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
    window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
});*/

/////////////////////////////////////////////////////
// 16. Sticky navigation with observer intersection API
/*

const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
        // alert('hay');
    })

}
const obsOptions = {
    root: null,
    threshold: [0, 0.1, 0.2]
};
const observer = new IntersectionObserver(obsCallback, obsOptions)
observer.observe(section1);

*/

// const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;
    !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky');
}


const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight}px`
})
headerObserver.observe(header);

/*window.addEventListener('scroll', function () {
    console.log(window.scrollY);
});*/

/////////////////////////////////////////////////
// 17. Reveal sections

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold:0.1});

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});
//////////////////////////////////////////////////
// 18.Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    console.log(entry.target.src);
}

const imgObserver  = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
});

imgTargets.forEach(img => imgObserver.observe(img));


/////////////////////////////////////////////////
// 5. Selecting, Creating  and Deleting element

// Selecting
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const allSections = document.querySelector('.section');
// console.log(allSections);
//
// document.getElementById('section--1');
// const allButtons = document.getElementsByName('button');
// console.log(allButtons);
//
// console.log(document.getElementsByClassName('btn'))


// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);



/////////////////////////////////////
// 6. Style, class and Attributes


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

//////////////////////////////
// 8. Types of events and event handlers
/*

const alertH1 = function () {
    alert('Mouse hover on h1');
}
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1 );

setTimeout(
    () =>{
        h1.removeEventListener('mouseenter', alertH1);
    },
    10000
)
//old way
h1.onmouseenter = function (e) {
    alert('Mouse hover on h1');
}

*/
/////////////////////////////////////////////////////////
// 10. Event Propagation
//
// const randInt = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1) + min);
//
// const randomColor = () =>
//     `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
//
// document.querySelector('.nav__link').addEventListener
// ('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Link', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);
//
//     // Stop propagation
//     // e.stopPropagation();
// });
//
// document.querySelector('.nav__links').addEventListener
// ('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('container', e.target, e.currentTarget);
//
// }, true)
//
// document.querySelector('.nav').addEventListener
// ('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//
// })
//
//12. DOM Traversing
/*

const h1 = document.querySelector('h1');

//Going downwards: child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: parent

console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings

console.log(h1.previousSibling);
console.log(h1.nextElementSibling);
console.log('node', h1.previousSibling);
console.log('node', h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) el.style.transform = 'scale(0.5)'
})

*/











