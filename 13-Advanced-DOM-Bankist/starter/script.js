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

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((btnOpenModal) => btnOpenModal.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Button Srcolling - Learn more btn
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();    // first section position
    console.log('Section1: ', s1coords);   

    console.log('Scoll Button: ', e.target.getBoundingClientRect());      // scroll button position

    // console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);      // old way
    console.log('Current scroll (X/Y):', window.scrollX, window.scrollY);    // current scroll position   new way

    console.log('height/width:', document.documentElement.clientHeight, document.documentElement.clientWidth);     // window view height/width

    // Scrolling
    // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);       // direct scroll

    // manual scrolling
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth",
    // });

    section1.scrollIntoView({behavior: "smooth"});  // new way smooth scrolling
});

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el) {    // using normal way
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         // console.log('LINK!!');
//         const scrollToID = this.getAttribute('href'); // this.href --> gives whole url, this.getAttribute('href') --> gives only the needed url
//         console.log(scrollToID);
//         document.querySelector(scrollToID).scrollIntoView({behavior: "smooth"});
//     });
// });

// 1. Add Event Listener to common parent element
// 2. Determine which element orginiated the event
// document.querySelector('.nav__links').addEventListener('click', function(e) {     // using Event Delegation
//     // console.log(e.target);
//     e.preventDefault();

//     // Matching strategy
//     if(e.target.classList.contains('nav__link')) {
//         // console.log('LINK');
//         const scrollToID = e.target.getAttribute('href'); // this.href --> gives whole url, this.getAttribute('href') --> gives only the needed url
//         console.log(scrollToID);
//         document.querySelector(scrollToID).scrollIntoView({behavior: "smooth"});
//     }
// });

// Operation Tab Container
const operTabs = document.querySelectorAll('.operations__tab');
const operTabContainer = document.querySelector('.operations__tab-container');
const operTabsContents = document.querySelectorAll('.operations__content');

// 1. Add Event Listener to common parent element
// 2. Determine which element orginiated the event
operTabContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);

    if(!clicked) return;    // guard close

    // Activate Tab by removing the active class in all the elements then adding the active class to the required element
    operTabs.forEach((operTab) => operTab.classList.remove('operations__tab--active'));    // Removing
    clicked.classList.add('operations__tab--active');    // Adding

    // Activate content area by removing the active class in all the elements then adding the active class to the required element
    // console.log(clicked.dataset.tab);           // data-tab=1 ===> 1, data-tab=2 ===> 2, data-tab=3 ===> 3
    operTabsContents.forEach((operTabsContent) => operTabsContent.classList.remove('operations__content--active'));     // Removing active class from all the elements
    document.querySelector(`.operations__content--${ clicked.dataset.tab }`).classList.add('operations__content--active');     // Adding active class to the required element
});


// operTabs.forEach((operTab) => operTab.addEventListener('click', () => console.log('TAB')));

// Menu Fade Animation
const handleHover = function(e) {
    // console.log(this, e.currentTarget);
    if(e.target.classList.contains('nav__link')) {
        const linkOver = e.target;
        const siblingsLinks = linkOver.closest('.nav').querySelectorAll('.nav__link');
        const logo = linkOver.closest('.nav').querySelector('img');

        siblingsLinks.forEach((siblingLink) => {
            // console.log('Hover');
            if(siblingLink !== linkOver) siblingLink.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

const nav = document.querySelector('nav');
// nav.addEventListener('mouseover', handleHover(e, 0.5)); // ERROR!! script.js:129 Uncaught ReferenceError: e is not defined at script.js:129:46
// nav.addEventListener('mouseover', function(e) {  // One way to solve
//     handleHover(e, 0.5);
// });
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation, 1st: Using Scroll Event
// const initialCoords = section1.getBoundingClientRect();   
// console.log(initialCoords);

// window.addEventListener('scroll', function() {
//     console.log(window.scrollY);
//     if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky'); 
//     else nav.classList.remove('sticky'); 
// });

// Sticky Navigation, 2nd: Using Intersection Observer API
// const observerCallback = function(entries, observer) {
//     entries.forEach((entry) => {
//         console.log(entry);
//     });
// };

// const observerOptions = {
//     root: null,
//     threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function(entries) {
    const [entry] = entries;
    // console.log(entry);

    if(!entry.isIntersecting)  nav.classList.add('sticky');
    else nav.classList.remove('sticky'); 
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
});

// Lazing Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function(entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if(!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    // entry.target.classList.remove('lazy-img');    // Takes lots of times for slow browser

    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTargets.forEach((imgTarget) => imgObserver.observe(imgTarget));

// Slider
const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let currSlide = 0;
    const maxSlide = slides.length;

    // const slider = document.querySelector('.slider');
    // slider.style.transform = 'scale(0.4) translate(-800px';
    // slider.style.overflow = 'visible';

    // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);   // 0%, 100%, 200%, 300%

    // Functions
    // Create Dots function
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    // createDots();

    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };
    // activateDot(0);                                   // Activate Dot for slide 0

    // GoToSlide function
    const goToSlide = function(slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);   
    }
    // goToSlide(0);                                     // currSlide = 0: 0%, 100%, 200%, 300%

    // Next Slide
    const nextSlide = function() {                    // currSlide = 1: -100%, 0%, 100%, 200%
        if(currSlide === maxSlide - 1) currSlide = 0; // currSlide = 2: -200%, -100%, 0%, 100%
        else currSlide++;                             // currSlide = 3: -300%, -200%, -100%, 0%

        goToSlide(currSlide);
        activateDot(currSlide);
    }
    // btnRight.addEventListener('click', nextSlide);

    // Previous Slide
    const prevSlide = function() {                    // currSlide = 2: -200%, -100%, 0%, 100%
        if(currSlide === 0) currSlide = maxSlide - 1; // currSlide = 1: -100%, 0%, 100%, 200%
        else currSlide--;                             // currSlide = 0: 0%, 100%, 200%, 300%
                            
        goToSlide(currSlide);
        activateDot(currSlide);
    }
    // btnLeft.addEventListener('click', prevSlide);

    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    // Event Handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function(e) {
        console.log(e);
        if(e.key === 'ArrowLeft') prevSlide();
        else if(e.key === 'ArrowRight') nextSlide(); // e.key === 'ArrowRight' && nextSlide()
    });

    dotContainer.addEventListener('click', function(e) {
        if(e.target.classList.contains('dots__dot')) {
            // console.log('DOT');
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
}
slider();


/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Selecting Elements
// console.log(document);                                 // #document
// console.log(document.documentElement);                 // html
// console.log(document.head, document.body);             // head body

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// const allButtons2 = document.getElementsByClassName('btn');
// console.log(allButtons2);

// // Creating and Inserting Elements
// // .insertAdjacentHTML already done in bankist project
// const messageDiv = document.createElement('div');
// messageDiv.classList.add('cookie-message');

// // messageDiv.textContent = 'We use cookies for improved website functionality and analytics';
// messageDiv.innerHTML = 'We use cookies for improved website functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // an element is added in html only once, for multiple insertions use cloneNode(true)
// // header.prepend(messageDiv);      // inserts at begining of the element
// // header.append(messageDiv);    // inserts at end of the element, if prepend is uncommented, then append moves the required element
// // header.append(messageDiv.cloneNode(true));   // inserts copy at end of the element  

// header.before(messageDiv);      // inserts above element
// // header.after(messageDiv);    // inserts below element

// // Delete Elements
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//     // messageDiv.parentElement.removeChild(messageDiv);         // using DOM traversing
//     messageDiv.remove();                                   // using direct remove method
// });

// // Styles
// messageDiv.style.backgroundColor = '#37383d';
// messageDiv.style.width = '120%';                       // zooms a bit more than 100% width

// console.log(messageDiv.style.height);
// console.log(messageDiv.style.color);
// console.log(messageDiv.style.backgroundColor, messageDiv.style.width);     // in this only inline style gets output

// console.log(getComputedStyle(messageDiv));
// console.log(getComputedStyle(messageDiv).color, getComputedStyle(messageDiv).height);

// messageDiv.style.height = Number.parseFloat(getComputedStyle(messageDiv).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt, logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// // // Non - standard custom
// console.log(logo.designer, logo.getAttribute('designer'));     // undefined 'anvit'
// logo.setAttribute('company', 'bankist');

// console.log(logo.src, logo.getAttribute('src'));               // http://127.0.0.1:5500/complete-javascript-course-master/13-Advanced-DOM-Bankist/starter/img/logo.png img/logo.png

// const link = document.querySelector('.twitter-link');
// console.log(link.href, link.getAttribute('href'));
// const link2 = document.querySelector('.nav__link--btn');
// console.log(link2.href, link2.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);               // after data in camelCase

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('cc');    // contains NOT includes
// logo.className = 'anvit';    // Dont use we overwrite all the other classes present with only only one

// Events Types and Events handlers
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function(e) {     // addEventListener allows to add multiple event handlers to the same event
//     alert('h1 addEventListener: Great!! You are reading the heading!!!');
// });

// const alertH1 = function(e) {     // addEventListener allows to add multiple event handlers to the same event
//     alert('h1 addEventListener: Great!! You are reading the heading!!!');
//     // h1.removeEventListener('mouseenter', alertH1);                   // when this is uncommented, then the alertH1 works ONLY ONCE
// }
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);    // the alertH1 works FOR ONLY 3 secs
// h1.onmouseenter = function(e) {    // onFunctions DOES NOT allows to add multiple event handlers to the same event, the last onFunction overwrites the previous ones
//     alert('h1 onmouseenter: Great!! You are reading the heading!!!');
// };

// Event Propagation - bubbling and capturing
// capturing - from parent Element to target Element
// bubbling - from target Element to parent Element
// rgb(255, 255,255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) - min);
// const randomColor = () => `rgb(${ randomInt(0, 255) }, ${ randomInt(0, 255) }, ${ randomInt(0, 255) })`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function(e) {         // first nav__link ==> Features
//     this.style.backgroundColor = randomColor();
//     console.log('NAV LINK', e.target, e.currentTarget);
//     console.log(e.currentTarget === this, e.target === this);

//     // stop propoagation - all the parent elements event handlers will not happen
//     e.stopPropagation();       // i.e., the below event handler function wont work for first nav__link ==> Features
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {        // all the nav__links
//     this.style.backgroundColor = randomColor();
//     console.log('NAV LINKS CONTAINER', e.target, e.currentTarget);
//     console.log(e.currentTarget === this, e.target === this);
// });    // no parameter/false --> DOES NOT makes capturing phase,  by default bubbling phase

// document.querySelector('.nav').addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV CONTAINER', e.target, e.currentTarget);
//     console.log(e.currentTarget === this, e.target === this);
// });    // true --> makes capturing phase

// Event Delegation done in project above

// // DOM Traversing 
// const h1 = document.querySelector('h1');

// // Going Downwards - child/children
// console.log(h1.querySelectorAll('.highlight'));     // select all .highlight class elements in h1 element
// console.log(h1.childNodes);                         // gives all nodes i.e text, comment, span.highlight(element),br(element) in h1 element
// console.log(h1.children);                           // gives ONLY elements present in h1 element
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going Upwards - parent/parents
// console.log(h1.parentNode, h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';     // from h1 goes to header i.e, header gets selected
// h1.closest('h1').style.background = 'var(--gradient-primary)';            // from h1 goes to h1 i.e, h1 gets selected

// // Going sideways - siblings
// console.log(h1.previousElementSibling, h1.nextElementSibling);           // no element so null, next element h4
// console.log(h1.previousSibling, h1.nextSibling);

// const h1ParentChildren = h1.parentElement.children;
// console.log(h1ParentChildren);                                           // returns HTMLCollection i.e., h1, h4, button, img
// // [...h1ParentChildren].forEach(function(el) {              
// //     if(el !== h1) {
// //         el.style.transform = 'scale(0.5)';
// //     }
// // });

// document.addEventListener('DOMContentLoaded', function(e) {
//     console.log('HTML parsed and DOM tree built!!!', e);
// });

// window.addEventListener('load', function(e) {
//     console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function(e) {
//     e.preventDefault();
//     console.log(e);
//     e.returnValue = '';
// });













































































