'use strict';

// const currYear = new Date().getFullYear();

// // console.log(firstName);    // Uncaught ReferenceError: Cannot access 'firstName' before initialization at script.js:5:13

// function calcAge(birthYear) {
//     const age = currYear - birthYear;

//     console.log(firstName);     // firstName is able to access using scope chain (variable lookup)
//     // console.log(lastName);      // Uncaught ReferenceError: lastName is not defined at calcAge (script.js:8:17), at script.js:13:13

//     function printAge() {
//         let output = `${ firstName }'s age is ${ age }, born in ${ birthYear }! `;
//         console.log(output);

//         if(birthYear >= 1981 && birthYear <= 1996) {
//             const firstName = 'Darshana';     // Creating NEW variable with same name as outer scope's variable

//             var millenialBool = true;     // variables declared with var are function scope

//             const millenialStr = `Oh, you are also a millenial!!, ${ firstName }`;
//             console.log(millenialStr);

//             function add(a, b) {
//                 return a + b;
//             }

//             output = 'NEW OUTPUT';     // Reasssigning outer scope's variable
//         }
//         // console.log(millenialStr);    // Uncaught ReferenceError: millenial is not defined at printAge (script.js:20:21) at calcAge (script.js:23:5) at script.js:29:13 printAge @ script.js:19 calcAge @ script.js:21 (anonymous) @ script.js:27
//         console.log(millenialBool);
//         // console.log(add(5, 6));    // script.js:26 Uncaught ReferenceError: add is not defined at printAge (script.js:26:9) at calcAge (script.js:28:5) at script.js:34:13
//         console.log(output);
//     }
//     printAge();

//     return age;
// }

// const firstName = 'Anvit';      // global variable
// console.log(calcAge(1990));
// console.log(age);   // script.js:22 Uncaught ReferenceError: age is not defined at script.js:22:13 (anonymous) @ script.js:22
// printAge();   // script.js:23 Uncaught ReferenceError: printAge is not defined at script.js:23:1

// Hoisting - Variables
// console.log(me);
// console.log(job);     // script.js:47 Uncaught ReferenceError: Cannot access 'job' before initialization at script.js:49:13 (anonymous) @ script.js:49
// console.log(year);       // script.js:48 Uncaught ReferenceError: Cannot access 'year' before initialization at script.js:50:13 (anonymous) @ script.js:50

// var me = 'Anvit';          // hoisted with undefined value
// let job = 'developer';
// const year = 2000;

// Hoisting - Functions
// console.log(addDeclaration(3, 5));
// console.log(addExpression(3, 5));     // Uncaught ReferenceError: Cannot access 'addExpression' before initialization at script.js:58:13 (anonymous) @ script.js:58
// console.log(addArrow(3, 5));        // Uncaught ReferenceError: Cannot access 'addArrow' before initialization at script.js:59:13

// function addDeclaration(a, b) {
//     return a + b;
// }

// const addExpression = function (a, b) {  // hoist with const
//     return a + b;
// }

// const addArrow = (a, b) => a + b;  // hoist with const

// console.log(addExpression(3, 5));     // script.js:72 Uncaught TypeError: addExpression is not a function at script.js:72:13 (anonymous) @ script.js:72  [undefined(3, 5)]
// console.log(addArrow(3, 5));       // script.js:73 Uncaught TypeError: addArrow is not a function at script.js:73:13 (anonymous) @ script.js:73  [undefined(3, 5)]

// var addExpression = function (a, b) {  // hoisted with undefined value ==> addExpression = undefined
//     return a + b;
// }

// var addArrow = (a, b) => a + b;   // // hoisted with undefined value ==> addArrow = undefined

// Eg
// console.log(numProducts);
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!!');
// }

// Rules -
// 1. always use const or let if the variables' value changes, dont use var
// 2. always declare variables at the top
// 3. always declare function first and then use

// var x = 1;   // creates property on window object
// let y = 2;
// const z = 3;

// console.log(x === window.x, y === window.y, z === window.z);

// console.log(this);     // Window global

const currYear = new Date().getFullYear();

// const calcAge = function(birthYear) {
//     console.log(currYear - birthYear);
//     console.log(this);     // strit mode - undefined, not strit mode - Window
// }
// calcAge(2000);

// const calcAgeArrow = (birthYear) => {
//     console.log(currYear - birthYear);
//     console.log(this);     // arrow does not gets its this keyword, so its looks for this keyword of its parent scope - Window
// }
// calcAgeArrow(2000);

// const anvit = {
//     birthYear: 2000,
//     calcAge: function() {
//         console.log(this);
//         console.log(currYear - this.birthYear);
//     },
// };
// anvit.calcAge();

// const darshana = {
//     birthYear: 1978,
// };
// darshana.calcAge = anvit.calcAge;        // method borrowing  (method copying but not calling)
// darshana.calcAge();                    // this always points to method calling it

// const f = anvit.calcAge;
// f();        // undefined, script.js:122 Uncaught TypeError: Cannot read properties of undefined (reading 'birthYear') at calcAge (script.js:122:37) at script.js:134:1

// var firstName = "Anvit";    // var creates firstName property on Window object

// const anvit = {
//     firstName: "Anvit",
//     birthYear: 2000,
//     calcAge: function() {
//         console.log('calcAge' ,this);
//         console.log(currYear - this.birthYear);

//         // Problem
//         // const isMillenial = function() {
//         //     console.log('isMillenial', this);    // isMillenial undefined
//         //     console.log(this.birthYear >= 1981 && this.birthYear <= 1996);   // script.js:147 Uncaught TypeError: Cannot read properties of undefined (reading 'birthYear') at isMillenial (script.js:147:30) at Object.calcAge (script.js:155:9) at script.js:169:7
//         // };

//         // Sol - 1
//         // const self = this;
//         // const isMillenial = function() {
//         //     console.log('isMillenial', self);
//         //     console.log(self.birthYear >= 1981 && self.birthYear <= 1996);
//         // };

//         // Sol - 2
//         const isMillenial = () => {
//             console.log(this);  // arrow functions inherits this keyword from parent function i.e. calcAge function
//             console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
//         };
//         isMillenial();
//     },
//     // greet: () => {
//     //     console.log(this);
//     //     console.log(`Hi ${ this.firstName }`);   // arrow does not gets its this keyword, so its looks for this keyword of its parent scope - Window
//     // },
//     greet: function() {
//         console.log(this);
//         console.log(`Hi ${ this.firstName }`);   // arrow does not gets its this keyword, so its looks for this keyword of its parent scope - Window
//     },
// };

// anvit.greet(); // greet() --> Hi Window.firstName --> Hi undefined
// // console.log(this, this.firstName);  // Window, undefineds
// anvit.calcAge();

// const addExpression = function (a, b) {
//     console.log(arguments);
//     return a + b;
// }
// addExpression(5, 9);
// addExpression(2, 6, 8, 9, 15);

// var addArrow = (a, b) => {
//     console.log(arguments);    // script.js:187 Uncaught ReferenceError: arguments is not defined at addArrow (script.js:187:17) at script.js:190:1
//     return a + b;
// }
// addArrow(1, 3);

// Primitive Eg
// let age = 22;                // age: 0001
// let oldAge = age;            // oldAge: => age: 0001
// age = 23;                    // age: 0002
// console.log(age, oldAge);     // 23 22

// // Object Eg
// const me = {                 // me: stack[addr:0003, value: abcd] heap: abcd
//     name: "Anvit",
//     age: 22,
// };
// const friend = me;           // friend: => me: stack[addr:0003, value: abcd] heap: abcd
// friend.age = 21;
// console.log("Friend: ", friend);   // Friend:  {name: 'Anvit', age: 21}
// console.log("Me: ", me);       // Me:  {name: 'Anvit', age: 21}

// // Primitive types
// let lastName = "Teltumde";
// let oldLastName = lastName;
// lastName = "Kamble";
// console.log(lastName, oldLastName);

// // Reference types
// const darshana = {
//   firstName: 'Darshana',
//   lastName: 'Teltumde',
//   age: 44,
// };

// const marriedDarshana = darshana;
// marriedDarshana.lastName = 'Kamble';
// console.log('Before marriage: ', darshana);
// console.log('After marriage: ', marriedDarshana);

// marriedDarshana = {};      // script.js:224 Uncaught TypeError: Assignment to constant variable. at script.js:224:17

// // Copying objects
// const darshana2 = {
//   firstName: 'Darshana',
//   lastName: 'Teltumde',
//   age: 44,
//   family: ['Nanda', 'Uttam', 'Kalyani', 'Atul'],
// };

// // const marriedDarshana2 = Object.assign({}, darshana2);
// // marriedDarshana2.lastName = 'Kamble';
// // console.log('Before marriage: ', darshana2);
// // console.log('After marriage: ', marriedDarshana2);

// // marriedDarshana2.family.push('Anvit');      // script.js:241 Uncaught TypeError: Cannot read properties of undefined (reading 'push') at script.js:241:24
// // marriedDarshana2.family.push('Manohar');       // script.js:242 Uncaught TypeError: Cannot read properties of undefined (reading 'push') at script.js:242:24
// // console.log("Before marriage: ", darshana2);         // shallow clone
// // console.log("After marriage: ", marriedDarshana2);

// let marriedDarshana3 = {...darshana2};
// marriedDarshana3 = {
//     ...darshana2,
//     lastName: "Kamble",
//     family: [...marriedDarshana3.family],
// };
// marriedDarshana3.family.push('Anvit');
// marriedDarshana3.family.push('Manohar');
// console.log("Before marriage: ", darshana2);            // deep clone
// console.log("After marriage: ", marriedDarshana3);
