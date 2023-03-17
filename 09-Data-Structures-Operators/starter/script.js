'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  restaurantName: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours, // old way
  openingHours, // new es6 way

  // order: function (starterIdx, mainIdx) {   // old way
  //     return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  // },

  order(starterIdx, mainIdx) {
    // new es6 way
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },

  orderDelivery({ starterIdx = 1, mainIdx = 0, time = '20:00', address }) {
    // new es6 way
    console.log(starterIdx, mainIdx, time, address);
    console.log(
      `Received order: ${this.starterMenu[starterIdx]} and ${this.mainMenu[mainIdx]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIng, ...otherIngs) {
    console.log(mainIng, otherIngs);
  },
};

///////////////////////////////////////
// String Methods Practice
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// console.log(flights.split('+'));

// const getCode = str => str.slice(0, 3).toUpperCase();

// for(const flight of flights.split('+')) {
//     // console.log(flight.split(';'));

//     const [type, from, to, time] = flight.split(';');
//     const output = `${ type.startsWith('_Delayed') ? '🔴' : '' }${ type.replaceAll('_', ' ') } from ${ getCode(from) } to ${ getCode(to) } (${  time.replace(':', 'h') })`.padStart(52);  //`${ type.includes('Delayed') ? '🔴' : '' } ${ type.replaceAll('_', ' ') } ${ from } ${ to } (${  time.replace(':', 'h') })`;
//     console.log(output);
// }

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const textArea = document.createElement('textarea');
textArea.placeholder = 'Enter underscore variable names';
const submitBtn = document.createElement('button');
submitBtn.textContent = 'SUBMIT';
submitBtn.style.width = 'fit-content';

submitBtn.addEventListener('click', function () {
  // console.log('CLICKED!!');
  const text = textArea.value;
  // console.log(text);

  const textRows = text.split('\n');
  // console.log(textRows, textRows.entries());

  for (let i = 0; i < textRows.length; i++) {
    // console.log(textRows[i]);
    // console.log(textRows[i].toLowerCase().trim().split('_'));
    const newTextArr = textRows[i].toLowerCase().trim().split('_');
    // console.log(newTextArr[1].replace(newTextArr[1][0], newTextArr[1][0].toUpperCase()));
    let newText =
      newTextArr[0] +
      newTextArr[1].replace(newTextArr[1][0], newTextArr[1][0].toUpperCase());
    // console.log(newText);

    const correctSymbol = '✅';
    // console.log(`${ correctSymbol.repeat(i + 1) }`);
    newText = newText.padEnd(20) + `${correctSymbol.repeat(i + 1)}`;
    console.log(newText);
  }
});

document.body.append(textArea);
document.body.append(submitBtn);

// Strings --------------------------------------------------------------------------------------------------------------------------------------------------------
const airline = 'TAP Air India';
// const plane = 'A320';
// console.log(airline);
// console.log(plane);

// console.log(plane[0]);  // A
// console.log(plane[1]);  // 3
// console.log(plane[2]);  // 2
// console.log('B737'[0]); // B

// console.log(airline.length, plane.length, 'B737'.length);   // 13 4 4

// console.log(airline.indexOf('i'), airline.lastIndexOf('i'));   // 5 11
// console.log(airline.indexOf('India'));   // 8

// console.log(airline.slice(4));     // Air India
// console.log(airline.slice(4, 7));      // Air

// console.log(airline.slice(0, airline.indexOf(' ')));   // TAP
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));    // India

// console.log(airline.slice(-2));    // ia
// console.log(airline.slice(1, -1));    // AP Air Indi

// const checkMiddleSeat = function(seat) {
//     // B and E are middle seats
//     const ch = seat[seat.length - 1];      // ch = seat.slice(-1);
//     console.log(`${ (ch === 'B' || ch === 'E') ? 'Middle Seat' : 'Not Middle Seat'}`)
// }
//                            // boxing ==> converts primitive string into Object string
// checkMiddleSeat('11B');    // checkMiddleSeat(new String('11B'));
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// console.log('Anvit', new String('Anvit'), new String('Anvit').slice(1));
// console.log(typeof 'Anvit', typeof new String('Anvit'), typeof new String('Anvit').slice(1));

// console.log(airline.toLowerCase(), 'ANVIT'.toLocaleLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in passenger name
// const fixCapitalize = function(passenger) {
//     // const passenger = 'aNvIT';   // Anvit
//     const passengerLower = passenger.toLowerCase();    // anvit
//     const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);  // A + nvit
//     console.log(passengerCorrect);
// }
// fixCapitalize('aNvIT');
// fixCapitalize('ANVIT');
// fixCapitalize('mANohAR');

// // comparing emails
// const compareEmail = function (email1, email2) {
//     const lowerNospacesEmail = email2.toLowerCase().trim();    // lowerEmal =  loginEmail.toLowerCase(); trimmedEmail = lowerEmail.trim();
//     console.log(email1 === lowerNospacesEmail);
// }

// const email = 'hello@gmail.com';
// const loginEmail = '    Hello@gmail.com \n';
// const lowerNospacesEmail = loginEmail.toLowerCase().trim();    // lowerEmal =  loginEmail.toLowerCase(); trimmedEmail = lowerEmail.trim();
// console.log(email === lowerNospacesEmail);                     // email === trimmedEmail
// compareEmail('hello@gmail.com', '    Hello@gmail.com \n');

// // replacing
// const priceGB = '288,97£';
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceGB, priceUS);

// const annoucement = 'All passengers come to boarding door 22. Boarding door 22';
// console.log(annoucement);
// console.log(annoucement.replace('door', 'gate'));  // replaces only first occurence
// console.log(annoucement.replaceAll('door', 'gate'));  // replaces all occurences using replaceAll
// console.log(annoucement.replace(/door/g, 'gate'));  // replaces all occurences using regular expression 

// booleans
// const plane2 = 'Airbus A320neo';
// console.log(plane2);
// console.log(plane2.includes('A320'));
// console.log(plane2.includes('Boeing'));
// console.log(plane2.startsWith('Airb'));

// if(plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
//     console.log('Part of the NEW Airbus family!!');
// }

// // practice
// const checkBaggage = function(items) {
//     const baggage = items.toLowerCase();
//     if(baggage.includes('gun') || baggage.includes('knife')) {
//         console.log('You are NOT onboard');
//     } else {
//         console.log('Welcome onboard');
//     }
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some sacks and a gun for protection');

// // split and join
// console.log('a+very+nice+string'.split('+'));  // ['a', 'very', 'nice', 'string']
// console.log('Anvit Manohar Kamble'.split(' '));

// const [firstName, middleName, lastName] = 'Anvit Manohar Kamble'.split(' ');
// console.log(firstName, middleName, lastName);

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function(name) {
//     const nameArr = name.split(' ');
//     const newNameArr = [];
//     for(let namePart of nameArr) {
//         // newNameArr.push(namePart[0].toUpperCase() + namePart.slice(1));
//         newNameArr.push(namePart.replace(namePart[0], namePart[0].toUpperCase()));
//     }
//     const newName = newNameArr.join(' ');
//     console.log(newName);
// };

// capitalizeName('anvit manohar kamble');
// capitalizeName('darshana uttam teltumde');
// capitalizeName('manohar govindrao kamble');

// // Padding
// const msg = 'Go to gate 22!';
// console.log(msg.padStart(20, '+').padEnd(30, '+'));
// console.log('Anvit'.padStart(20, '+').padEnd(30, '+'));

// const maskCreditCard = function(cardNo) {
//     const cardNoStr = cardNo + '';    // same as String(cardNo);
//     const last4CardNo = cardNoStr.slice(-4);
//     console.log(last4CardNo.padStart(cardNoStr.length, '*'));
// }
// maskCreditCard(1234567689);
// maskCreditCard(12345678911223344);
// maskCreditCard('98765432199887766554433');

// // Repeat
// const msg2 = 'Bad weather!!......All departures are late!!! ';
// console.log(msg2.repeat(3));

// const planesInLine = function(planesNo) {
//     console.log(`There are ${ planesNo } waiting in line ${ '✈'.repeat(planesNo) }`);
// }
// planesInLine(5);
// planesInLine(3);
// planesInLine(10);

// Coding Challenge #3--------------------------------------------------------------------------------------------------------------------
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀
*/

// const gameEvents = new Map([
//     [17, '⚽️ GOAL'],
//     [36, '🔁 Substitution'],
//     [47, '⚽️ GOAL'],
//     [61, '🔁 Substitution'],
//     [64, '🔶 Yellow card'],
//     [69, '🔴 Red card'],
//     [70, '🔁 Substitution'],
//     [72, '🔁 Substitution'],
//     [76, '⚽️ GOAL'],
//     [80, '⚽️ GOAL'],
//     [92, '🔶 Yellow card'],
// ]);

// console.log(gameEvents);

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// for(const [min, event] of gameEvents) {
//     console.log(`${ (min <= 45) ? '[FIRST HALF]' : '[SECOND HALF]' } ${ min }: ${ event }`);
// }

// console.log(`An event happened, on average, every ${ 90 / gameEvents.size } minutes`);

// const lastTimeMin = [...gameEvents.keys()].pop();
// console.log(lastTimeMin);
// console.log(`An event happened, on average, every ${ lastTimeMin / gameEvents.size } minutes`);
// console.log(gameEvents);

// Map Fundamentals-------------------------------------------------------------------------------------------------------
// const restaurantMap = new Map();
// restaurantMap.set('name', 'Classico Italiano');
// restaurantMap.set(1, 'Firenze, Italy');
// console.log(restaurantMap.set(2, 'Lisbon, Portugal'));

// restaurantMap
//     .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//     .set('open', 11)
//     .set('close', 23)
//     .set(true, 'We are open :)')
//     .set(false, 'We are close :(');

// console.log(restaurantMap, restaurantMap.size);
// console.log(restaurantMap.get('name'), restaurantMap.get(true));
// console.log(restaurantMap.get('true'), restaurantMap.get('1'));          // datatypes of keys matter
// console.log(restaurantMap.get(false), restaurantMap.get(1));

// const time = 10;
// console.log(restaurantMap.get(time >= restaurantMap.get('open') && time <= restaurantMap.get('close')));

// console.log(restaurantMap.has('categories'));
// restaurantMap.delete(2);
// console.log(restaurantMap, restaurantMap.size);
// // restaurantMap.clear();
// // console.log(restaurantMap, restaurantMap.size);

// const arr = [1,2];
// restaurantMap.set(arr, 'TESTING!!!');    // restaurantMap.set([1, 2], 'TESTING!!!'),  [1, 2]
// console.log(restaurantMap, restaurantMap.size);   // different objects
// console.log(restaurantMap.get(arr));     // restaurantMap.get([1, 2]) ==> undefined,  [1, 2]

// restaurantMap.set(document.querySelector('h1'), 'Heading!!!');
// console.log(restaurantMap, restaurantMap.size);

// Map Iterations
// const question = new Map([
//     ['question', 'What is the best programming language in the world?'],
//     [1, 'C'],
//     [2, 'Java'],
//     [3, 'JavaScript'],
//     [4, 'Python'],
//     ['correct', 3],
//     [true, 'Correct 🎉🏆'],
//     [false, 'Try again!!!'],
// ]);
// console.log(question);

// convert object to map
// console.log(Object.entries(openingHours));
// const openingHoursMap = new Map(Object.entries(openingHours));
// console.log(openingHoursMap);

// // Quiz App
// console.log(question.get('question'));
// for(const [key, value] of question) {
//     if(typeof key === 'number') {
//         console.log(`Answer ${ key }: ${value}`);
//     }
// }
// const answer = +prompt("Your answer??");     // Number(prompt("Your answer??"));
// console.log(answer);

// if(answer === question.get('correct')) {
//     console.log(question.get(true));
// } else {
//     console.log(question.get(false));
// }
// console.log(question.get(answer === question.get('correct')));

// convert map to arr
// console.log([...question]);

// console.log(question.entries());
// console.log(question.keys(), question.values());
// console.log([...question.keys()], [...question.values()]);

// ------------------------------------------------------------------------------------------------------------------------------------------------
// Sets - kind of array but only unique values and order irrelevant
// const orderSet = new Set([
//     'Pasta',
//     'Pizza',
//     'Pizza',
//     'Risotto',
//     'Pasta',
//     'Pizza',
// ]);

// console.log(orderSet);
// console.log(new Set('Anvit'), new Set());
// console.log(orderSet.size);
// console.log(orderSet.has('Pasta'), orderSet.has('Paneer'));
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread');
// console.log(orderSet);
// orderSet.delete('Risotto');
// console.log(orderSet);
// // orderSet.clear();
// // console.log(orderSet);

// for(let order of orderSet) {
//     console.log(order);
// }

// const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];
// console.log(staff);
// console.log("Total unique staff members: ", new Set(['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter']).size);
// const staffSet = new Set(staff);
// console.log(staffSet);
// const uniqueStaff1 = [...staffSet]  ;  // [...new Set(staff)];
// console.log(uniqueStaff1);
// const uniqueStaff2 = Array.from(staffSet);
// console.log(uniqueStaff2);

// console.log(new Set('Anvit Manohar Kamble').size);

// Coding Challenge #2--------------------------------------------------------------------------------------------------------------
/*
Let's continue with our football betting app!
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
GOOD LUCK 😀
*/

// const game = {
//     team1: 'Bayern Munich',
//     team2: 'Borrussia Dortmund',
//     players: [
//         [
//             'Neuer',
//             'Pavard',
//             'Martinez',
//             'Alaba',
//             'Davies',
//             'Kimmich',
//             'Goretzka',
//             'Coman',
//             'Muller',
//             'Gnarby',
//             'Lewandowski',
//         ],
//         [
//             'Burki',
//             'Schulz',
//             'Hummels',
//             'Akanji',
//             'Hakimi',
//             'Weigl',
//             'Witsel',
//             'Hazard',
//             'Brandt',
//             'Sancho',
//             'Gotze',
//         ],
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//         team1: 1.33,
//         x: 3.25,
//         team2: 6.5,
//     },
// };

// for(let i = 0; i < game.scored.length; i++) {
//     console.log(`Goal ${ i + 1 }: ${game.scored[i]}`);
// }

// const oddValuesArr = Object.values(game.odds);
// console.log(oddValuesArr);
// let sum = 0;
// for(let oddValue of oddValuesArr) {
//     sum += oddValue;
// }
// console.log((sum / oddValuesArr.length).toFixed(1));

// const oddKeysArr = Object.keys(game.odds);
// for(let odd of oddKeysArr) {
//     console.log(`Odd of ${ (odd !== 'x') ? `victory ${ game[odd] }` : 'draw' }: ${ game.odds[odd] }`);
// }

// const scorers = {};
// for(let player of game.scored) {
//     scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// Looping objects
// property names/keys
// const openingHoursKeyArr = Object.keys(openingHours);
// console.log(openingHoursKeyArr);

// let openStr = `We are  open on ${ openingHoursKeyArr.length } days: `;

// for(const day of openingHoursKeyArr) {
//   openStr += `${ day }, `;
// }

// console.log(openStr);

// // property values
// const openingHoursValueArr = Object.values(openingHours);
// console.log(openingHoursValueArr);

// // entries object
// const openingHoursEntriesArr = Object.entries(openingHours);
// console.log(openingHoursEntriesArr);

// for(const [day, { open, close } ] of openingHoursEntriesArr) {
//   console.log(`We open at ${ open } and close at ${ close } on ${ day }`)
// }

// OPTIONAL Chaininig
// if(restaurant.openingHours && restaurant.openingHours.mon)   // check if exists
// console.log(restaurant.openingHours.mon.open);     // error when no checking done - script.js:57 Uncaught TypeError: Cannot read properties of undefined (reading 'open') at script.js:57:41

// if(restaurant.openingHours.fri)
// console.log(restaurant.openingHours.fri.open);

// console.log(restaurant.openingHours.mon.open);   // script.js:63 Uncaught TypeError: Cannot read properties of undefined (reading 'open') at script.js:63:41 (anonymous) @ script.js:63

// OPTIONAL Chaininig checking => ?
// console.log(restaurant.openingHours.mon?.open);     // check for open, mon assume present
// console.log(restaurant.openingHours?.mon?.open);    // check for open, check for mon
// console.log(restaurant.openingHours.sat?.open);     // check for open, sat assume present
// console.log(restaurant.openingHours?.sat?.open);    // check for open, check for sat

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for(let day of days) {
//     console.log(day, restaurant.openingHours[day]?.open);
//     // console.log(day);
//     if(restaurant.openingHours?.[day]) {
//         const open = restaurant.openingHours[day]?.open;
//         console.log(`We open at ${ open } on ${  day}`);
//     }

//     // const open = restaurant.openingHours[day]?.open || "closed";   // for sat open = 0,  OR 0 || something = somteing
//     // console.log(`We open at ${ open } on ${  day}`);

//     // const open = restaurant.openingHours[day]?.open ?? "closed";   // to solve sat open = 0, use NULLISH operator ??
//     // console.log(`We open at ${ open } on ${  day}`);
// }

// Methods
// console.log(restaurant.order?.(0, 1) ?? "Method does not exists!!");
// console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exists!!");

// // Arrays
// const users = [{ name: "Anvit", email: "anvit@gmail.com" }, { name: "Darshana", email: "darshu@gmail.com" }]
// console.log(users[0]?.name ?? "Error");
// console.log(users[0]?.email ?? "Error");
// console.log(users[1]?.name ?? "Error");
// console.log(users[1]?.email ?? "Error");
// console.log(users[2]?.email ?? "Error");

// FOR OF loop -------------------------------------------------------------------------------------------------------------------------------------------------
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for(let item of menu) {
//     console.log(item);
// }

// console.log(...menu.entries());
// console.log([...menu.entries()]);
// for(let item of menu.entries()) {
//     console.log(`${ item[0] + 1 } : ${ item[1] }`);
// }

// for(let [i, item] of menu.entries()) {
//     console.log(`${ i + 1 } : ${ item }`);
// }

///////////////////////////////////////
// Coding Challenge #1

/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//     team1: 'Bayern Munich',
//     team2: 'Borrussia Dortmund',
//     players: [
//         [
//             'Neuer',
//             'Pavard',
//             'Martinez',
//             'Alaba',
//             'Davies',
//             'Kimmich',
//             'Goretzka',
//             'Coman',
//             'Muller',
//             'Gnarby',
//             'Lewandowski',
//         ],
//         [
//             'Burki',
//             'Schulz',
//             'Hummels',
//             'Akanji',
//             'Hakimi',
//             'Weigl',
//             'Witsel',
//             'Hazard',
//             'Brandt',
//             'Sancho',
//             'Gotze',
//         ],
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//         team1: 1.33,
//         x: 3.25,
//         team2: 6.5,
//     },
//     printGoals: function(...players) {
//         for(let player of players) {
//             console.log(player);
//         }
//         console.log("Goals: ", players.length);
//     }
// };

// // const players1 = [...game.players[0]];
// // console.log(players1);
// const [players1, players2] = game.players;
// console.log(players1, players2);

// const [players1GK, ...players1fieldPlayers] = players1;
// console.log(players1GK, players1fieldPlayers);

// // const players2 = [...game.players[1]];
// // console.log(players2);
// const [players2GK, ...players2fieldPlayers] = players2;
// console.log(players2GK, players2fieldPlayers);

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // const { team1, team2 } = game.odds;
// // const draw = game.odds.x;
// const { odds: { team1, x: draw, team2} } = game;
// console.log(team1, draw, team2);

// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// game.printGoals(...game.scored);

// team1 < team2 && console.log("Team1 is more likely to win than team2");
// team1 > team2 && console.log("Team2 is more likely to win than team1");

// ------------------------------------------------------------------------------------------------------------------
// const rest1 = {
//     restaurantName: 'Red Sun',
//     // numGuests: 50,
//     numGuests: 0,
// };

// const rest2 = {
//     restaurantName: 'Kuba',
//     owner: 'Darshana Kamble',
// };

// // OR assignmnent operator
// // rest1.numGuests = rest1.numGuests || 40;
// // rest2.numGuests = rest2.numGuests || 40;

// // rest1.numGuests ||= 40;
// // rest2.numGuests ||= 40;

// // NULLISH(??) assignmnent operator (null/undefined)
// rest1.numGuests ??= 40;
// rest2.numGuests ??= 40;

// // rest1.owner = rest1.owner && "<ANONYMOUS>";
// // rest2.owner = rest2.owner && "<ANONYMOUS>";
// rest1.owner &&= "<ANONYMOUS>";
// rest2.owner &&= "<ANONYMOUS>";
// console.log(rest1, rest2);

// ------------------------------------------------------------------------------------------------------------------
// Short Circuiting (&&, ||)
// use ANY DATATYPE, return ANY DATATYPE, short cicuiting  L ----> R
// ----------------OR------------------------------------sees first true then immediate returns it and ignore other parts
// console.log("----------------OR------------------------------------");
// console.log(5 || "Anvit");
// console.log("" || "Anvit");
// console.log(0 || "Anvit");
// console.log(true || 0);
// console.log(undefined || null);    // both false || returns last false value
// console.log(null || undefined);    // both false || returns last false value

// console.log(undefined || 0 || "" || "Hi" || 22 || null);

// restaurant.numGuests = 0;
// const guests1 = (restaurant.numGuests) ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// // ----------------AND------------------------------------sees first false then immediate returns it and ignore other parts
// console.log("----------------AND------------------------------------");
// console.log(5 && "Anvit");    // return "Anvit" because && return last true value
// console.log("" && "Anvit");   // return "" because && return first false value
// console.log(0 && "Anvit");
// console.log(true && 0);
// console.log(undefined && null);     // both false && returns first false value
// console.log(null && undefined);     // both false && returns first false value

// console.log(undefined && 0 && '' && 'Hi' && 22 && null);

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('chicken', 'bbq sauce');
// }

// restaurant.orderPizza && restaurant.orderPizza('paneer', 'vegies');

// // NULLISH (??) operator
// const guests3 = restaurant.numGuests ?? 10; // 10 only if first part is null/undefined
// console.log(guests3); // 0 if restaurant.numGuests = 0, 10 if restaurant.numGuests = null/undefined

// ---------------------------------------------------------------------------------------------------------------------------------------------
// Rest operator -- COMPRESS ==> separate items into one collective item
// SPREAD because of RIGHT side of =
// Destructing
// const arr = [1, 2, ...[3, 4]];
// console.log(arr);

// // REST because of LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // REST is only on LEFT side of = and at last position
// const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(pizza, risotto, otherFood);

// // objects
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(sat, weekDays);

// // functions
// const add = function(...numbers) {
//     let sum = 0;
//     for(let no of numbers) {
//         sum += no;
//     }
//     console.log(`Arguments: ${ numbers }, Sum: ${ sum }`);
// };

// add(2, 3);
// add(2, 4, 6, 8);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [11, 22, 33];
// add(...x);

// restaurant.orderPizza("chicken", "onion", "tomato", "pizza base");
// restaurant.orderPizza("paneer");

// -------------------------------------------------------------------------------------------------------------------------------------------
// Spread operator -- EXPAND ==> one collective item into separate items
// const arr = [4, 5, 6];
// console.log("Arr", arr);

// const badNewArr = [arr[0], arr[1], arr[2], 7, 8 ,9];
// console.log("Bad Arr", badNewArr);

// const goodNewArr = [...arr, 7, 8 ,9];
// console.log("Good Arr", goodNewArr);
// console.log(...goodNewArr);
// console.log(4, 5, 6, 7, 8, 9);

// const newMenu = [...restaurant.mainMenu, 'Gnoocci'];     // spread operator takes all elements out but does NOT create new variables
// console.log(newMenu);

// // copy array
// const mainMenuCpy = [...restaurant.mainMenu];     // shallow copy

// // join 2 array
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);
// console.log(...menu);

// ITERABLES: arrays, strings, maps, sets, NOT objects
// const str = "Anvit";
// const letters = [...str, " ", "K."];
// console.log(str, letters);
// console.log(...str);
// console.log(...letters);
// // console.log(`${...str} Anvit`);  // Uncaught SyntaxError: Unexpected token '...' (at script.js:67:16)

// const ingredients = [prompt("Let's make pasta!! Ingredient 1?"), prompt("Ingredient 2?"), prompt("Ingredient 3?")];
// console.log(ingredients);
// // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// objects spread
// const newRestaurant = { foundIn: 2010 , ...restaurant, founder: "Anvit" }
// console.log(newRestaurant);

// const restaurantCpy = {...restaurant, founder: "Anvit"};      // shallow copy - outer addings, outer modification does not effect original but nested arr/objec adding or modification does affect the original object
// restaurantCpy.restaurantName = "Golden Wok";
// console.log(restaurantCpy.restaurantName, restaurant.restaurantName);
// restaurantCpy.mainMenu.push('Ice Cream');       // this will also add Ice Cream in main menu of restaurant object
// console.log(restaurantCpy, restaurant);

// ------------------------------------------------------------------------------------------------------------------------------------------------
// // Object Destructing
// restaurant.orderDelivery({
//     time: "3:57",
//     address: "Via del Sole, 21",
//     mainIdx: 2,
//     starterIdx: 2,
// });

// const { restaurantName, categories, openingHours: oh } = restaurant;
// console.log(restaurantName, categories, oh);

// const { restaurantName: restauName, categories: restauCategories, openingHours: restauOpeningHours } = restaurant;
// console.log(restauName, restauCategories, restauOpeningHours );

// // default values
// const { menu = [], starterMenu: starters = []} = restaurant;
// console.log(menu, starters);

// // mutating variables
// let a = 111;
// let b = 222;
// console.log("Before: ",a, b);
// const obj = {a: 11, b: 22, c: 33};

// ({a , b} = obj);
// console.log("After: ",a, b);

// // nested object Destructing
// const { fri } = openingHours;
// console.log(fri);
// const { fri: { open, close } } = openingHours;
// console.log(open, close);
// const { fri: { open: o, close: c } } = openingHours;
// console.log(o, c);

// --------------------------------------------------------------------------------------------------------
// // Array Destructing
// const arr = [1, 2, 3,];
// const a = arr[0];           // normal assign
// const b = arr[1];
// const c = arr[2];
// console.log(a, b, c);

// const [x, y, z] = arr;      // destructing
// console.log(x, y, z);
// console.log(arr);

// const [firstCategory, secondCategory] = restaurant.categories;      // 0 1
// console.log(firstCategory, secondCategory);

// const [firstCategory, , secondCategory] = restaurant.categories;      // 0 2
// console.log(firstCategory, secondCategory);

// let [main, , secondary] = restaurant.categories;      // 0 2
// console.log(main, secondary);

// // swap 1 technique
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// // // swap 2 technique
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // receive 2 return values from a function
// const [starterCourse, mainCourse] = restaurant.order(2, 0);
// console.log(starterCourse, mainCourse);

// const nested = [2, 4, [5, 6]];
// const [firstEle, , thirdEle] = nested;
// console.log(firstEle, thirdEle);

// // nested destructing
// const [first, , [second, third]] = nested;
// console.log(first, second, third);

// // default values
// const [p, q, r] = [5, 8];
// console.log(p, q, r);      // 5 8 undefined
// const [m = 1, n = 1, o = 1] = [11,22];
// console.log(m, n, o);      // 11 22 1
