"use strict";

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can DRIVE!!!");

// const interface = 'music';   // Uncaught SyntaxError: Unexpected strict mode reserved word (at script.js:9:7)
// const private = 378;         // Uncaught SyntaxError: Unexpected strict mode reserved word (at script.js:10:7)
// const if = 89;                  // Uncaught SyntaxError: Unexpected token 'if' (at script.js:11:7)

// functions
// function loggName() {
//     console.log('My name is Anvit Kamble');
// }

// loggName();   // calling / running / invoking
// loggName();
// loggName();

// function fruitProcessor(apples, oranges) {
//     // console.log(`Apples : ${ apples }, oranges : ${ oranges }`);
//     const juice = `Juice with ${ apples } apples and ${ oranges } oranges`;
//     return juice;
//     // return `Juice with ${ apples } apples and ${ oranges } oranges`;
// }

// console.log(fruitProcessor(5,6));
// const appleJuice = fruitProcessor(6, 0);
// console.log(appleJuice);
// const orangeJuice = fruitProcessor(0, 7);
// console.log(orangeJuice);
// const appleOrangeJuice = fruitProcessor(5, 7);
// console.log(appleOrangeJuice);

// const currYear = new Date().getFullYear();
// console.log(currYear);

// const age1 = calcAge1(2000);     // works fine
// console.log(age1);

// function calcAge1(birthYear) {       // function declaration
//     return currYear - birthYear;     // one can call function declaration before - Hoisting
// }

// const age2 = calcAge2(2000);   // Uncaught ReferenceError: Cannot access 'calcAge2' before initialization at script.js:48:14 (anonymous) @ script.js:48
// console.log(age2);

// const calcAge2 = function (birthYear) {     // function expression (function -> value)
//     return currYear - birthYear;            // one cannot call function expression before - Hoisting
// }

// const age1 = calcAge1(2000);
// const age2 = calcAge1(2005);
// console.log(age1, age2);

// const age3 = calcAge3(2000);    // script.js:59 Uncaught ReferenceError: Cannot access 'calcAge3' before initialization at script.js:59:14 (anonymous) @ script.js:59
// console.log(age3);

// const calcAge3 = (birthYear) => currYear - birthYear;      // Arrow function (function -> value)

// const age3 = calcAge3(2000);
// console.log(age3);

// const yearsUntilRetirement1 = (birthYear) => {       // arrow functions do not get this keywprd
//     const currAge = currYear - birthYear;
//     const remYears = 65 - currAge;
//     // return 65 - currAge;
//     return remYears;
// }

// const remRetireYears = yearsUntilRetirement1(2000);
// console.log(remRetireYears);

// const yearsUntilRetirement2 = (birthYear, name) => {
//     const currAge = currYear - birthYear;
//     const remYears = 65 - currAge;
//     // return 65 - currAge;
//     return `${ name } retires in ${ remYears } years`;
// }

// const remRetireYears2 = yearsUntilRetirement2(2000, 'Anvit Kamble');
// console.log(remRetireYears2);
// console.log(yearsUntilRetirement2(1990, 'xyz'));

// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);

//     // console.log(`Apples Pieces: ${ applePieces }, Oranges Pieces: ${ orangePieces }`);
//     const juice = `Juice with ${ applePieces } apples pieces and ${ orangePieces } oranges pieces`;
//     return juice;
// }

// console.log(fruitProcessor(2,3));
// console.log(fruitProcessor(4,4));

// const currYear = new Date().getFullYear();
// const calcAge3 = (birthYear) => currYear - birthYear;

// const yearsUntilRetirement3 = function(birthYear, name) {
//     const currAge = calcAge3(birthYear);
//     const remYears = 65 - currAge;

//     if(remYears > 0) {
//         return `${ name } retires in ${ remYears } years`;
//     }
//     else {
//         return `${ name } aleady retired`;
//     }
// }

// console.log(yearsUntilRetirement3(1991, 'Jonas'));
// console.log(yearsUntilRetirement3(1970, 'Mike'));
// console.log(yearsUntilRetirement3(1950, 'Tyler'));

// const friend1 = 'Anvit';
// const friend2 = 'Nishant';
// const friend3 = 'Rohith';

// const friends = ['Anvit', 'Nishant', 'Rohith', 'Gaurav', 'Yash'];
// console.log(friends);

// const years = new Array(2000, 2005, 2010, 2015, 2020);
// console.log(years[0])
// console.log(friends[2]);
// console.log(friends[friends.length - 1], years[years.length - 1]);
// console.log(friends.length, years.length);

// friends[2] = 'Pranil';
// console.log(friends);

// // friends = ['Siddhesh', 'Pradip', 'Atharva']; // Assignment to constant variable. at script.js:137:9 (anonymous) @ script.js:137

// const anvit = ['Anvit', 2022 - 2000, 'developer', friends];
// console.log(anvit, anvit.length);

// const currYear = new Date().getFullYear();
// const calcAge3 = (birthYear) => currYear - birthYear;

// console.log(calcAge3(years[0]), calcAge3(years[1]), calcAge3(years[years.length - 1]));

// const ages = [calcAge3(years[0]), calcAge3(years[1]), calcAge3(years[years.length - 1])];
// console.log(ages);

// const friends = ['Anvit', 'Nishant', 'Rohith'];
// friends.push('Yash');       // add ele at last
// console.log(friends, friends.length);
// friends.push('Gaurav');
// console.log(friends, friends.length);
// friends.unshift('Pranil');  // add ele at start
// console.log(friends, friends.length);
// const poppedFriend = friends.pop();              // remove ele from last
// console.log(friends, poppedFriend, friends.length);
// const shiftedFriend = friends.shift() ;           // remove ele from start
// console.log(friends, shiftedFriend, friends.length);

// console.log(friends.indexOf('Anvit'), friends.indexOf('Rohith'), friends.indexOf('Gaurav'));
// console.log(friends.includes('Anvit'), friends.includes('Rohith'), friends.includes('Gaurav'));

// friends.push(25);
// console.log(friends.includes(25), friends.includes('25'));

// if(friends.includes('Rohith')) {
//     console.log('You have a friend called Rohith')
// }

// const anvitArr = ['Anvit', 2022 - 2000, 'developer', friends];

// const anvitObj = {
//     firstName: 'Anvit',
//     lastName: 'Kamble',
//     age: 2023 - 2000,
//     job: 'developer',
//     friends: ['Anvit', 'Nishant', 'Rohith', 'Gaurav', 'Yash']
// };

// console.log(anvitObj);
// console.log(anvitObj.age, anvitObj.firstName, anvitObj.lastName, anvitObj.job, anvitObj.friends);
// console.log(anvitObj['age'], anvitObj['firstName'], anvitObj['lastName'], anvitObj['job'], anvitObj['friends']);

// const nameKey = 'Name';
// console.log(anvitObj['first' + nameKey]);
// console.log(anvitObj['last' + nameKey]);

// const interestedIn = prompt('What do you want to know about Anvit? Choose between firstName, lastName, age, job and friends');
// // console.log(anvitObj.interestedIn);

// if(anvitObj[interestedIn]) {
//     console.log(anvitObj[interestedIn]);
// } else {
//     console.log('Wrong request!! Choose between firstName, lastName, age, job and friends ');
// }

// anvitObj.location = 'India';
// anvitObj['color'] = 'blue';
// console.log(anvitObj);
// console.log(`${ anvitObj['firstName'] } has ${ anvitObj['friends'].length } friends, and his best friend is called ${ anvitObj['friends'][2] }.`)
// console.log(`${ anvitObj.firstName } has ${ anvitObj.friends.length } friends, and his best friend is called ${ anvitObj.friends[2] }.`)

// const anvit = {
//     firstName: 'Anvit',
//     lastName: 'Kamble',
//     birthYear: 2000,
//     job: 'developer',
//     friends: ['Anvit', 'Nishant', 'Rohith', 'Gaurav', 'Yash'],
//     hasDriverLicense: true,

//     calcAge1: function(birthYear) {
//         console.log(this);            // points to anvit object
//         return 2022 - birthYear;      // answer depends on birthYear parameter which is passed
//     },

//     calcAge2: function() {
//         console.log(this);                // points to anvit object
//         return 2022 - this.birthYear;     // 22     because anvit.birthYear property is present ==> 2022 - 2000 = 22
//     },

//     calcAge3: () => {                     // arrow functions ALWAYS points to the global object
//         console.log(this);                // points to global document object i.e, window object
//         return 2022 - this.birthYear;     // NaN    because Window.birthYear property is absent ==> 2022 - undefined = NaN
//     },

//     calcAge4: function() {
//         console.log(this);
//         this.age = 2022 - this.birthYear;     // points to anvit object and adds the anwser i.e 2022 - 2000 = 22 to age that becomess anvit object property
//         return this.age;
//     },

//     getSummary: function() {
//         return  `${ this.firstName } ${ this.lastName } was born on ${  this.birthYear }. His job is of ${ this.job }. His friends are ${ this.friends }. He ${ (this.hasDriverLicense) ? 'has' : 'does not have' } a drving license.` ;
//     }
// };

// console.log(anvit);
// console.log(anvit.calcAge1(2000), anvit['calcAge1'](2000));
// console.log(anvit.calcAge2());
// console.log(anvit.calcAge3());
// console.log(anvit.calcAge4());
// console.log(anvit.age);

// console.log(anvit.getSummary());

// anvit.hasDriverLicense = false;
// console.log(anvit.getSummary());
