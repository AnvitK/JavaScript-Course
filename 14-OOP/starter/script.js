'use strict';

///////////////////////////////////////
// Constructor Function and new keyword

// 1. New () object is created
// 2. function is called, this = New () object
// 3. New () object is linked to Prototype
// 4. function automatically returns the New () object

// const currYear = new Date().getFullYear();

// const Person = function(firstName, birthYear) {     // CONSTRUCTOR FUNCTION (blueprint)
//     // console.log(this);
//     this.firstName = firstName;                     // Instance Properties
//     this.birthYear = birthYear;                     // Instance Properties

//     // this.calcAge = function() {                     // NEVER Do this (eg for 1000 objects 1000 calcAge functions will be created)
//     //     console.log(currYear - this.birthYear);     // Alternative is using prototype given below
//     // };
// };

// const anvit = new Person('Anvit', 2000);   // object from the Person constructor function, instance 
// console.log(anvit);

// const raju = new Person('Raju', 2006);     // object from the Person constructor function, instance
// console.log(raju);

// const raman = new Person('Raman', 1990);   // object from the Person constructor function, instance
// console.log(raman);

// const rahul = 'Rahul';

// console.log(anvit instanceof Person, raju instanceof Person, raman instanceof Person, rahul instanceof Person);

// Person.hey = function () {                 // static method
//     console.log('Hey there 👋👋');      
//     console.log(this);                     // prints Person constructor function
// };

// Person.hey();           
// anvit.hey();         // script.js:40 Uncaught TypeError: anvit.hey is not a function at script.js:40:7 (static methods NOT available to instances but the class)

///////////////////////////////////////
// Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function() {              // DO this instead (eg for 1000 objects ONLY 1 calcAge functions will be created)           
//     console.log(currYear - this.birthYear);
// };

// anvit.calcAge();
// raju.calcAge();
// raman.calcAge();

// console.log(anvit.__proto__, anvit.__proto__ === Person.prototype);   // step 3 links the new objects created to prototype

// console.log(Person.prototype.isPrototypeOf(raju), Person.prototype.isPrototypeOf(anvit), Person.prototype.isPrototypeOf(raman));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = 'Homo Sapiens';      // .prototypeLinkedObjects
// console.log(anvit, raju, raman);
// console.log(anvit.species, raju.species, raman.species);

// console.log(anvit.hasOwnProperty('firstName'), anvit.hasOwnProperty('species'));

///////////////////////////////////////
// // Prototypal Inheritance on Built-In Objects
// console.log(anvit.__proto__);
// console.log(anvit.__proto__.__proto__);
// console.log(anvit.__proto__.__proto__.__proto__);       // Object.prototype (top of prototype chain)

// console.dir(Person.prototype.constructor);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 4, 2, 2, 6, 8];               // new Array === []
// console.log(arr, arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function() {           // DO NOT DO THIS
//     return [...new Set(this)];
// }

// console.log(arr.unique());                   

// const h1 = document.querySelector('h1');
// console.dir(h1);
// console.dir(x => x + 2);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function(make, speed) {
//     this.make = make;
//     this.speed = speed;
// };

// Car.prototype.accelerate = function() {
//     this.speed += 10;
//     console.log(`${ this.make } is going at ${ this.speed } km/h`);
// };

// Car.prototype.brake = function() {
//     this.speed -= 5;
//     console.log(`${ this.make } is going at ${ this.speed } km/h`);
// };

// const bmw = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();

///////////////////////////////////////
// ES6 Classes
// const PersonCl = class {}    // Class expression

// const currYear = new Date().getFullYear();

// class PersonCl {     // Class declaration
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     calcAge() {     // Methods will be automatically added to .prototype property
//         console.log(currYear - this.birthYear);
//     }

//     greet() {                // instance method
//         console.log(`Hi ${ this.fullName }`);  
//     };

//     get age() {              // instance method BUT not function kind of like variable
//         return currYear - this.birthYear;
//     }

//     // Set a property that alreadt exists
//     set fullName(name) {       // instance method BUT not function kind of like variable
//         console.log(name);
//         if(name.includes(' ')) this._fullName = name;
//         else alert(`${ name } is not a full name`);
//     }

//     get fullName() {       // instance method BUT not function kind of like variable
//         return this._fullName;
//     }

//     static hey() {        // static method
//         console.log('Hey there 👋👋');
//         console.log(this);
//     }
// };

// const jake = new PersonCl('Jake Tyler', 1994);
// console.log(jake);
// jake.calcAge();
// console.log(jake.age);

// console.log(jake.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function() {
//     console.log(`Hi ${ this.fullName }`);  
// };
// jake.greet();

// 1. Classes are NOT hoisted
// 2. Classes are also first-class citizens
// 3. Classes are always executed in the strict mode

// const joker = new PersonCl('Joker Card', 1998);

// PersonCl.hey();

///////////////////////////////////////
// Setters and Getters
// const account = {
//     owner: 'anvit',
//     movements: [100, 330, 400, 200, 60],

//     get latest() {
//         // return this.movements[this.movements.length - 1];
//         return this.movements.slice(-1).pop();
//     },

//     set latest(mov) {
//         this.movements.push(mov);
//     },
// }

// console.log(account.latest);

// account.latest = 80;
// console.log(account.movements);

///////////////////////////////////////
// Object.create
// const currYear = new Date().getFullYear();

// const PersonProto = {
//     calcAge() {     
//         console.log(currYear - this.birthYear);
//     },

//     init(firstName, birthYear) {             // like a constructor
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// const steve = Object.create(PersonProto);       // links prototype i.e calcAge is present as prototype to the steve js object
// console.log(steve);
// steve.name = 'Steve';
// steve.birthYear = 1980;
// steve.calcAge();

// console.log(steve, steve.__proto__);        // birthYear: 1980, name: "Steve", [[Prototype]]: Object;   {calcAge: ƒ}
// console.log(steve.__proto__ === PersonProto);

// const john = Object.create(PersonProto);
// john.init('John', 1987);
// john.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class CarCl {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }

//     accelerate() {
//         this.speed += 10;
//         console.log(`${ this.make } is going at ${ this.speed } km/h`);
//     }
    
//     brake() {
//         this.speed -= 5;
//         console.log(`${ this.make } is going at ${ this.speed } km/h`);
//     }

//     set speedUS(speedUS) {                      // sets speed in km/h, gets speed in mi/h 
//         this.speed = speedUS * 1.6;
//     }

//     get speedUS() {                             // return speed in mi/h, i.e converts km/h to mi/h
//         return this.speed / 1.6;
//     }
// };


// const bmw = new CarCl('BMW', 120)
// const mercedes = new CarCl('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

///////////////////////////////////////
// Inheritance between Classes using Constructor Function
// const currYear = new Date().getFullYear();

// const Person = function(firstName, birthYear) {     // CONSTRUCTOR FUNCTION (blueprint)
//     this.firstName = firstName;                     // Instance Properties
//     this.birthYear = birthYear; 
// };

// Person.prototype.calcAge = function() {              // DO this instead (eg for 1000 objects ONLY 1 calcAge functions will be created)           
//     console.log(currYear - this.birthYear);
// };

// const Student = function(firstName, birthYear, course) {     // CONSTRUCTOR FUNCTION
//     // this.firstName = firstName;                              // Instance Properties
//     // this.birthYear = birthYear;
//     Person.call(this, firstName, birthYear);          // points this of Person to this of Student
//     this.course = course; 
// };

// Student.prototype = Object.create(Person.prototype);          // GOOD, linking prototypes
// // Student.prototype = Person.prototype;                      // BAD

// Student.prototype.introduce = function() {
//     console.log(`My name is ${ this.firstName } and I study in ${ this.course }`)
// };

// const mike = new Student('Mike', 2010, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function(make, speed) {
//     this.make = make;
//     this.speed = speed;
// };

// Car.prototype.accelerate = function() {
//     this.speed += 10;
//     console.log(`${ this.make } is going at ${ this.speed } km/h`);
// };

// Car.prototype.brake = function() {
//     this.speed -= 5;
//     console.log(`${ this.make } is going at ${ this.speed } km/h`);
// };


// const EV = function(make, speed, charge) {
//     Car.call(this, make, speed);
//     this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);    // Link the prototypes

// EV.prototype.chargeBattery = function(chargeTo) {
//     this.charge = chargeTo;
// };

// EV.prototype.accelerate = function() {         // EV and Car both has accelerate method i.e EV class (child class) overided/overwrite the accelerate method of Car class (parent class)
//     this.speed += 20;                          // Polymorphism
//     this.charge -= 1;
//     console.log(`${ this.make } going at ${ this.speed } km/h, with a charge of ${ this.charge }%`);
// }

// // EV.prototype.constructor = EV;

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.brake();
// tesla.accelerate();

///////////////////////////////////////
// Inheritance between Classes using Class Declaration ES6 Classes
// const currYear = new Date().getFullYear();

// class PersonCl {     // Class declaration
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     calcAge() {     // Methods will be automatically added to .prototype property
//         console.log(currYear - this.birthYear);
//     }

//     greet() {                // instance method
//         console.log(`Hi ${ this.fullName }`);  
//     };

//     get age() {              // instance method
//         return currYear - this.birthYear;
//     }

//     // Set a property that alreadt exists
//     set fullName(name) {       // instance method
//         // console.log(name);
//         if(name.includes(' ')) this._fullName = name;
//         else alert(`${ name } is not a full name`);
//     }

//     get fullName() {       // instance method
//         return this._fullName;
//     }

//     static hey() {        // static method
//         console.log('Hey there 👋👋');
//         console.log(this);
//     }
// };

// class StudentCl extends PersonCl {     // extends also automatically links the prototypes
//     constructor(fullName, birthYear, course) {
//         super(fullName, birthYear);    // Always needs to happen first
//         this.course = course;
//     }

//     introduce() {
//         console.log(`My name is ${ this.fullName } and I study in ${ this.course }`)
//     }

//     calcAge() {     
//         console.log(`I'm ${ currYear - this.birthYear } years old, but as a student I feel more like ${ currYear - this.birthYear - 10 }` );
//     }
// }

// // const jonas = new StudentCl('Jonas Jones', 1995);
// const jonas = new StudentCl('Jonas Jones', 1995, 'Information Technology');
// jonas.introduce();
// jonas.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create
// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     },
  
//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };
// const steve = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function(firstName, birthYear, course) {
//     PersonProto.init.call(this, firstName, birthYear);
//     this.course = course;
// };
// StudentProto.introduce = function() {
//     console.log(`My name is ${ this.firstName } and I study in ${ this.course }`);
// };

// const ankit = Object.create(StudentProto);
// ankit.init('Ankit', 2004, 'Computer Science');
// ankit.introduce();
// ankit.calcAge();

// class Account {
//     // constructor(owner, currency, pin, movements) {
//     constructor(owner, currency, pin) {
//         this.owner = owner;
//         this.currency = currency;
//         this._pin = pin;
//         // this.movements = movements;
//         this._movements = [];                 // protected property
//         this.locale = navigator.language;

//         console.log(`Thanks for opening an account, ${ this.owner }`);
//     }
//     //  Public Interface
//     getMovements() {
//         return this._movements;
//     }

//     deposit(amt) {        
//         this._movements.push(amt);
//     }

//     withdraw(amt) {
//         this.deposit(-amt);
//     }

//     _approveLoan(amt) {
//         return true;
//     }

//     requestLoan(amt) {
//         if(this._approveLoan(amt)) {
//             this.deposit(amt);
//             console.log('Loan Approved!!');
//         }
//     }
// }

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

// class Account {
    
//     // 1) Public fields (instances NOT on prototypes)
//     locale = navigator.language;         
    
//     // 2) Privare fields (instances NOT on prototypes)
//     #movements = [];
//     #pin;

//     constructor(owner, currency, pin) {
//         this.owner = owner;
//         this.currency = currency;
//         // this._pin = pin;                      // protected property
//         // this._movements = [];                 // protected property
//         // this.locale = navigator.language;
//         this.#pin = pin;

//         console.log(`Thanks for opening an account, ${ this.owner }`);
//     }

//     // 3) Public methods ,Public Interface
//     getMovements() {
//         return this.#movements;
//     }

//     deposit(amt) {        
//         this.#movements.push(amt);
//         return this;
//     }

//     withdraw(amt) {
//         this.deposit(-amt);
//         return this;
//     }

//     requestLoan(amt) {
//         if(this._approveLoan(amt)) {
//             this.deposit(amt);
//             console.log('Loan Approved!!');
//         }
//         return this;
//     }

//     // Static method (only on Class NOT on instances)
//     static helper() {
//         console.log("HELPER!!!");
//     }

//     // Protected method
//     _approveLoan(amt) {
//         return true;
//     }

//     // 4) Private methods
//     // #approveLoan(amt) {
//     //     return true;
//     // }
// }

// // const acc1 = new Account('Jonas', 'EUR', 2222, []);     ERROR!!
// const acc1 = new Account('Jonas', 'EUR', 2222);
// // acc1._movements.push(350);     ERROR!!
// // acc1._movements.push(-180);     ERROR!!
// acc1.deposit(400);
// acc1.withdraw(200);
// acc1.requestLoan(1300);
// console.log(acc1.getMovements());
// console.log(acc1);
// // console.log(acc1.#movements);        // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class (at script.js:588:17)
// // console.log(acc1.#pin);              // Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class (at script.js:591:17)
// // console.log(acc1.#approveLoan(2222));   // Uncaught SyntaxError: Private field '#approveLoan' must be declared in an enclosing class (at script.js:591:17)
// Account.helper();

// // Chaining 
// // acc1.deposit(250).deposit(400).withdraw(30).requestLoan(3000).withdraw(4000);    // script.js:605 Uncaught TypeError: Cannot read properties of undefined (reading 'deposit') at script.js:605:18 because first deposit returns undefined
// acc1.deposit(250).deposit(400).withdraw(30).requestLoan(3000).withdraw(4000);       // since all methods returns this
// console.log(acc1.getMovements());


























































