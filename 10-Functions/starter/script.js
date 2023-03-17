'use strict';

// const bookings = [];

// const createBooking = function(flightNo, noPassengers = 1, price = 3000, totalPrice = price * noPassengers) {      // function(flightNo, noPassengers, price) old way   function(flightNo, noPassengers = 1, price = 3000) new way
//     // noPassengers = noPassengers || 1;  // old way
//     // price = price || 3000;  // old way

//     const booking = {
//         flightNo,
//         noPassengers,
//         price,
//         totalPrice
//     }

//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking('AB123');
// createBooking('AB123', 10, 4000);
// createBooking('AB123', undefined, 4000);

// JS functions has only pass by value NO pass by ref, the objects address/ref acts/is the value while passing

// const flight = 'AB123';   // primitive copy 1000
// const anvit = {           // object address i.e. reference  2000
//     name: 'Anvit Kamble',
//     passport: 1234567890
// };

// const checkIn = function(flightNo, passenger) {     // flighNo ==> 3000, passenger ==> 2000
//     flightNo = 'CD456';
//     passenger.name = 'Mr. ' + passenger.name;

//     console.log(flightNo, anvit);
//     if(passenger.passport === 1234567890) {
//         alert('Checked In!!');
//     } else {
//         alert('Wrong person!!');
//     }
// };

// checkIn(flight, anvit);
// console.log(flight, anvit);
// // flightNo = flight, passenger = anvit    
// // flighNo ==> 3000, passenger ==> 2000

// const newPassport = function(person) {
//     person.passport = Math.trunc(Math.random() * 1000000000000);
// }

// newPassport(anvit);
// // console.log(anvit);
// checkIn(flight, anvit);
// console.log(flight, anvit);

// first-class functions ==> first-class citizens  i.e. simply values (concept)
// first-class functions ==> higher-order functions that recieves function as argument or returns a function or does both (actual)

// const oneWord = function(str) {
//     return str.replaceAll(' ', '').toLowerCase();   // str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function(str) {
//     const [firstWord, ...otherWords] = str.split(' ');
//     return [firstWord.toUpperCase(), ...otherWords].join(' ');
// };

// // High Order Function
// const transformer = function(str, func) {
//     console.log(`Original String: ${ str }`)
//     console.log(`Transformed String: ${ func(str) }`);
//     console.log(`Transformed by: ${ func.name }`)
// };

// transformer('JavaScript is the best language!!!', upperFirstWord);     // passing/calling only the value
// transformer('JavaScript is the best language!!!', oneWord);            // call-back function

// const high5 = function() {
//     console.log('👋👋');
// };

// document.body.addEventListener('click', high5);   // call-back function/event-handler/event-listener,  addEventListener - higher order function

// ['Anvit', 'Manohar', 'Darshana'].forEach(high5);  // forEach - higher order function

// const greet = function(greeting) {   // closure
//     return function(name) {
//         console.log(`${ greeting } ${ name }`);
//     }
// }

// const greetHi = greet('Hi');  // const greetHi = function(name) { console.log(`${ greeting } ${ name }`); }, greeting = 'Hi'
// greetHi('Anvit');
// const greetHey = greet('Hey');  // const greetHey = function(name) { console.log(`${ greeting } ${ name }`); }, greeting = 'Hey'
// greetHey('Anvit');
// greet('Hello')('Anvit');

// const greet2 = (greeting) => {   // closure
//     return (name) => {
//         console.log(`${ greeting } ${ name }`);
//     }
// }

// const greet2 = (greeting) => (name) => console.log(`${ greeting } ${ name }`);

// const greet2Hi = greet2('Hi');  // const greetHi = function(name) { console.log(`${ greeting } ${ name }`); }, greeting = 'Hi'
// greet2Hi('Anvit');
// const greet2Hey = greet2('Hey');  // const greetHey = function(name) { console.log(`${ greeting } ${ name }`); }, greeting = 'Hey'
// greet2Hey('Anvit');
// greet2('Hello')('Anvit');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flighNo, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flighNo}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flighNo}`, name });
//   },
// };

// lufthansa.book(123, 'Anvit Kamble');
// lufthansa.book(456, 'Manohar Kamble');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;     // copy of luthansa obj's book method to standalone global book method
// // book(56, 'Darshana Kamble');  // script.js:118 Uncaught TypeError: Cannot read properties of undefined (reading 'airline') at book (script.js:118:57) at script.js:138:1

// // Call Method
// book.call(eurowings, 567, 'Darshana Kamble'); // call method calls book method whose this points to eurowings, other parameters are usual parameter of book method
// console.log(eurowings);

// book.call(lufthansa, 789, 'Rohith Reddy'); // call method calls book method whose this points to lufthansa, other parameters are usual parameter of book method
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 295, 'Nishant Poojary');
// console.log(swiss);

// // Apply Method
// const flighData1 = [468, 'Yash Bhagat'];
// book.apply(swiss, flighData1);
// console.log(swiss);

// const flighData2 = [357, 'Gaurav Mali'];
// book.call(swiss, ...flighData2);
// console.log(swiss);

// // Bind Method - bind methods binds the function this with the provided this pointing object and ultimately returns the resultant function with required this keyword
// // book.call(eurowings, 567, 'Darshana Kamble');
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(445, 'Nishant Mankar');
// console.log(eurowings);

// const bookEW22 = book.bind(eurowings, 22);
// bookEW22('Pradeep Kande');
// console.log(eurowings);

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };
// // lufthansa.buyPlane();  // this ==> lufthansa

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);  // this ==> buy button,  in event handler listener, the THIS always points to element on which the handler is attached to
// // lufthansa.buyPlane(handler function) attached to document.querySelector('.buy')(element)

// document
//   .querySelector('.buy')
// //   .addEventListener('click', lufthansa.buyPlane());   // this ==> lufthansa
//      .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // this ==> lufthansa,  in event handler listener, the THIS always points to element on which the handler is attached to
// lufthansa.buyPlane(handler function) attached to lufthansa(object)

// // Parial app
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.18);
// // addVAT = (rate, value) => value + value * 0.18;
// console.log(addVAT(100), addVAT(50));

// const addTax2 = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTax2(0.18);
// console.log(addVAT2(100), addVAT2(50));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section 😃
//     answers: new Array(4).fill(0),
//     registerNewAnswer: function() {
//         // const answer = Number(
//         //     prompt(`
//         //     ${ this.question }
//         //     ${ this.options[0] }
//         //     ${ this.options[1] }
//         //     ${ this.options[2] }
//         //     ${ this.options[3] }
//         //     (Write option number)
//         // `));

//         // get answer and prompt question and options
//         console.log(this);

//         const answer = Number(
//             prompt(`${ this.question }\n${ this.options.join('\n') }\n(Write option number)
//         `));

//         // register answer
//         typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;   // short circuiting &&
//         this.displayResults();
//         this.displayResults('string');        
//     },
//     displayResults(type = 'array') {
//         console.log(this, this.answers);
//         if(type === 'array') {
//            console.log(this.answers); 
//         } else if(type === 'string') {
//             console.log(`Poll results are ${ this.answers.join(',') }`);
//         }
//     },
// };

// // poll.registerNewAnswer();
// // document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer);   // script.js:266 Uncaught TypeError: Cannot read properties of undefined (reading 'join') at HTMLButtonElement.registerNewAnswer (script.js:266:57)
// // document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

// const testData1 = [5, 2, 3];
// const testData2 = [1, 5, 3, 9, 6, 1];
// // poll.displayResults({answers: testData1});      // will NOT work because answer in poll obj will be [0, 0, 0, 0] because this points to default poll object
// // poll.displayResults({answers: testData2});      // will NOT work because answer in poll obj will be [0, 0, 0, 0] because this points to default poll object
// poll.displayResults.call({answers: testData1});    // will work because answer in poll obj will be [5, 2, 3] because this points to poll object with answer set to testData1 as answer
// poll.displayResults.call({answers: testData1}, 'array');
// poll.displayResults.call({answers: testData1}, 'string');
// poll.displayResults.call({answers: testData2});
// poll.displayResults.call({answers: testData2}, 'array');
// poll.displayResults.call({answers: testData2}, 'string');

// function run only once NOT again and again
// const runOnce = function() {
//     console.log('This will only run once and will never run again!!!');
// }
// runOnce();
// // runOnce();
// // runOnce();
 
// // Immediately Inovke Function Expression (IIFE)
// (function() {
//     console.log('This will only run once and will never run again!!!');
//     const isPrivate = 22;      // encapsulated
// })();
// console.log(isPrivate);    // script.js:312 Uncaught ReferenceError: isPrivate is not defined at script.js:312:13

// // Immediately Inovke Function Arrow
// (() => console.log('This will only run once and will never run again!!!'))();

// {
//     const isPrivate = 22;
//     var notPrivate = 22;
// }
// // console.log(isPrivate);     // script.js:321 Uncaught ReferenceError: isPrivate is not defined at script.js:321:13 (anonymous) @ script.js:321
// console.log(notPrivate);

// Closures
// A function has access to the variable environment (VE) of the execution context in which it was created.
// Closure: VE attached to the function, exactly as it was at the time and place the function was created.

// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The
// function keeps a reference to its outer scope, which preserves the scope chain throughout time.

// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were
// present in the environment where the function was created.

// const secureBooking = function() {  // birth place
//     let passengerCount = 0;
//                                     // Closure makes child remember birth
//     return function() {             // child place remebers passengerCount
//         passengerCount++;
//         console.log(`${ passengerCount } passengers`);
//     }
// };

// const booker = secureBooking();  // booker = function() { passengerCount++; console.log(`${ passengerCount } passengers`); }    
// booker();
// booker();
// booker();

// console.dir(booker);

// Closure Examples
// Eg 1
// let f;

// const g = function() {
//     const a = 22;
//     f = function() {
//         console.log(a * 2);
//     };
// };

// const h = function() {
//     const b = 44;
//     f = function() {
//         console.log(b * 2);
//     };
// };

// g();
// f();
// console.dir(f);

// // Reassigning f function
// h();
// f();
// console.dir(f);

// // Eg 2
// const boardPassengers = function(noPassengers, wait) {
//     const passengersPerGroup = noPassengers / 3;

//     setTimeout(function() {
//         console.log(`We are now boarding all ${ noPassengers } passengers`);            // then this will execute after waiting timer       
//         console.log(`There are 3 groups with ${ passengersPerGroup } passengers`);      // then this will execute after waiting timer 
//     }, wait * 1000);

//     console.log(`Will start boarding in ${ wait } seconds`);      // First this will execute
// };

// setTimeout(function() {        // setTimeout(function, timer) ==> function executes only after waiting timer
//     console.log('TIMER');
// }, 2000);

// // const passengersPerGroup = 1000;
// boardPassengers(180, 3);
// console.dir(boardPassengers);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {   // birth place
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';       // closure
  });
})();






























