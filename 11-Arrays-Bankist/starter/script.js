'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;  // create copy of movements arr so not to change the original movements arr only display them sortly ascending

    movs.forEach(function(mov, i) {

        const amtType = (mov > 0) ? 'deposit' : 'withdrawal'; 

        const htmlMarkup = `
            <div class="movements__row">
                <div class="movements__type movements__type--${ amtType }">${ i + 1 } ${ amtType }</div>
                <div class="movements__value">${ mov }€</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', htmlMarkup);
    });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); 
    labelBalance.textContent = `${ acc.balance } EUR`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
                    .filter((mov) => (mov > 0))
                    .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${ incomes }€`;

    const outcomes = acc.movements
                    .filter((mov) => (mov < 0))
                    .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${ Math.abs(outcomes) }€`;

    const interest = acc.movements
                    .filter((mov) => (mov > 0))
                    .map((depositAmt) => depositAmt * acc.interestRate/100)
                    .filter((inte, i, arr) => {
                        // console.log(arr);
                        return inte >= 1;
                    })
                    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${ interest }€`;

};
// calcDisplaySummary(account1.movements);

const createUsernames = function(accs)
{
    accs.forEach(function(acc) {
        acc.username = acc.owner
                        .toLowerCase()
                        .split(' ')
                        .map((u) => u.charAt(0))  // .map((word) => word[0])
                        .join('');
    });
};
createUsernames(accounts);
// console.log(accounts);

// update and display UI
const updateUI = function(acc) {
    // Display movements
    displayMovements(acc.movements);
        
    // Display balance
    calcDisplayBalance(acc);
    
    // Display summary
    calcDisplaySummary(acc);
}

// Event handlers
// Login btn Event Handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {   // login method
    // Prevent form from submitting and going to other webpage
    e.preventDefault();
    // console.log('LOGIN');

    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
    // console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)) {   // optional chaining
        console.log('LOGIN');
        // Display UI and welcome msg
        labelWelcome.textContent = `Welcome Back, ${ currentAccount.owner.split(' ')[0] }`;
        containerApp.style.opacity = 100;
        
        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e) {   // transfer method
    e.preventDefault(); 
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
    // console.log(amount, receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username) {
        // console.log('Transferred Valid');
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
});

btnLoan.addEventListener('click', function(e) {    // loan method
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some((mov) => (mov >= amount * 0.1))) {
        // Add movement
        currentAccount.movements.push(amount);

        // update UI
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {    // delete user
    e.preventDefault();
    // console.log('Delete');
    // currentAccount = accounts.find((acc) => acc.username === inputCloseUsername.value);
    
    if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
        const index = accounts.findIndex((acc) => (currentAccount.username === acc.username));
        // console.log(index);
        // Delete account
        accounts.splice(index, 1);
        
        //  Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;                                       // state of sorting
btnSort.addEventListener('click', function(e) {           // sort or unsort movements
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

// const user = 'Steven Thomas Williams';  // stw
// const username = user.toLowerCase().split(' ').map((u) => u.charAt(0)).join('');


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // slice - does NOT change the arr
// console.log(arr.slice(2));      // from start to end
// console.log(arr.slice(2, 4));   // from start to end excluding end
// console.log(arr.slice(-2));     // from second last to end
// console.log(arr.slice(-1));     // only last ele
// console.log(arr.slice(1, -2));  // from start to end excluding end
// console.log(arr.slice());       // shallow copy
// console.log([...arr]);          // shallow copy

// // splice - does change arr and returns the new sliced arr
// console.log(arr.splice(2), arr);
// console.log(arr.splice(-1), arr);     // last element gets deleted
// console.log(arr.splice(1, 2), arr);   // from position 1, 2 elements gets deleted

// // reverse - does change the arr
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2);
// console.log(arr2.reverse(), arr2);

// // concat - join two arrs - does NOT change the arr
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // join - returns a string by joining array elements with using the separator
// console.log(letters.join('-'));

// const arr = [22, 33, 11];
// console.log(arr[0], arr.at(0));  // at method
// console.log(arr[arr.length - 1], arr.slice(-1)[0]);  // getting last element
// console.log(arr.at(-1), arr.at(-2));   // last and second-last element using at method
// console.log('anvit', 'anvit'.at(0), 'anvit'.at(-1));

// const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements2) {
//     if(movement > 0) {
//         console.log(`You deposited ${ movement }`);
//     } else {
//         console.log(`You withdrew ${ Math.abs(movement) }`);
//     }
// }

// console.log('--------------FOR entries------------------------------------------------')
// for(const [i, movement] of movements2.entries()) {   // entries - array of array, first ele - array element index, second ele - array element value
//     if(movement > 0) {
//         console.log(`Movement ${ i + 1 } You deposited ${ movement }`);
//     } else {
//         console.log(`Movement ${ i + 1 } You withdrew ${ Math.abs(movement) }`);
//     }
// }

// console.log('--------------FOREACH------------------------------------------------')
// // forEach method - higher order function - changes the original array
// movements2.forEach(function(movement) {   // each iteration the current element of the array as an argument to the function
//     if(movement > 0) {
//         console.log(`You deposited ${ movement }`);
//     } else {
//         console.log(`You withdrew ${ Math.abs(movement) }`);
//     }
// });
// // 0: function(200)
// // 1: function(450)
// // 2: function(-400)
// // ..

// console.log('--------------FOREACH entries------------------------------------------------')
// movements2.forEach(function(movement, index, array) {   // each iteration the current element of the array as an argument to the function
//     if(movement > 0) {                                  // forEach call-back function - first ele - array element value, second ele - array element index, third ele - array
//         console.log(`Movement ${ index + 1 } You deposited ${ movement }`);
//     } else {
//         console.log(`Movement ${ index + 1 } You withdrew ${ Math.abs(movement) }`);
//     }
// });
// 0: function(200, 0, arr)
// 1: function(450, 1, arr)
// 2: function(-400, 2, arr)
// ...

// break, continue - for, for of loop only NOT forEach loop

// forEach - map
// const currencies2 = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);
// currencies2.forEach(function(value, key, map) {
//     console.log(`${ key }: ${ value }`);
// })

// // forEach - set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'INR', 'EUR', 'EUR', 'INR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function(value, _, set) {  // set does not have any key nor any index, so thats' why use _(throw away)
//     console.log(`${ value }: ${ value }`);
// })

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs1 = function(dogsJulia, dogsKate) {
//     const dogsJulia2 = dogsJulia.slice(1, -2);
//     const allDogs = [...dogsJulia2, ...dogsKate];
//     console.log(allDogs);
//     allDogs.forEach(function(dogYear, idx, allDogs) {
//         console.log(`Dog number ${ idx + 1 } ${ (dogYear >= 3) ? `is an adult, and is ${ dogYear } years old` : 'is still a puppy 🐶' }`);
//     });    
// };
// checkDogs1([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs1([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const checkDogs2 = function(dogsJulia, dogsKate) {
//     const dogsJulia2 = dogsJulia.slice();
//     dogsJulia2.splice(0, 1);
//     dogsJulia2.splice(-2, 2);  // from second position, 2 elements gets deleted
//     // dogsJulia2.splice(-2);  // from second position, till last element all elements gets deleted

//     const allDogs = dogsJulia2.concat(dogsKate);
//     console.log(allDogs);
//     allDogs.forEach(function(dogYear, idx, allDogs) {
//         console.log(`Dog number ${ idx + 1 } ${ (dogYear >= 3) ? `is an adult, and is ${ dogYear } years old` : 'is still a puppy 🐶' }`);
//     });    
// };
// checkDogs2([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs2([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// MAP ARRAY Func
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;
// const movementsUSD = movements.map(function(movement) {   // returns new changed array without changing the original array
//     return movement * euroToUsd;
//     // return 22;
// });
// console.log(movementsUSD, movements);

// const movementsUSDFor = [];
// for(const movement of movements) { // using FOR OF loop
//     movementsUSDFor.push(movement * euroToUsd);
// }
// console.log(movementsUSDFor, movements);

// const movementsUSDArr = movements.map((movement) => movement * euroToUsd);    // using arrow function
// console.log(movementsUSDArr, movements);


// const movementsDescription = movements.map((movement, idx, arr) => {
//     // return `Movement ${ idx + 1 } You ${ (movement > 0) ? `deposited ${ movement }` : `withdrew ${ Math.abs(movement) }` } `;
//     if(movement > 0) {
//         return `Movement ${ idx + 1 } You deposited ${ movement }`;
//     } else {
//         return `Movement ${ idx + 1 } You withdrew ${ Math.abs(movement) }`;
//     }
// });
// console.log(movementsDescription);

// const movementsDescription2 = movements.map((movement, idx, arr) => 
//     `Movement ${ idx + 1 } You ${ (movement > 0) ? `deposited ${ movement }` : `withdrew ${ Math.abs(movement) }` } `
// );
// console.log(movementsDescription2);

// FILTER - does not change array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function(movement, i, arr) {
//     return (movement > 0);
// });
// console.log(deposits);

// const depositsArrow = movements.filter((movement) => (movement > 0));
// console.log(depositsArrow);

// const depositsFor = [];
// for(const movement of movements) {
//     if(movement > 0) {
//         depositsFor.push(movement);
//     }
// }
// console.log(depositsFor);

// const withdrawalArrow = movements.filter((movement) => (movement < 0));

// console.log(movements, deposits, depositsArrow, depositsFor, withdrawalArrow);

// REDUCE - 
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // // accumulator, current element, index, arrayName - paraemters in reduce function
// const totalBalance1 = movements.reduce(function(acc, curr, i, arr) {
//     console.log(`Iteration ${ i }: ${ acc }`);
//     return acc + curr;
// }, 0);   // initial starting value of accumulator

// const totalBalance2 = movements.reduce((balance, currAmt) => balance + currAmt);
// console.log(totalBalance1, totalBalance2);

// let totalBalance3 = 0;
// for(const movement of movements) {
//     totalBalance3 += movement;
// }
// console.log(totalBalance3);

// // Maximum value 
// const maximumMovement1 = movements.reduce((acc, mov) => {
//     if(mov > acc)
//         acc = mov;
//     return acc;
// }, movements[0]);

// const maximumMovement2 = movements.reduce((acc, mov) => {
//     if(acc > mov) return acc;
//     else return mov;
// }, movements[0]);

// const maximumMovement3 = movements.reduce((acc, mov) => (acc > mov) ? acc : mov, movements[0]);

// const minmumMovement1 = movements.reduce((acc, mov) => (acc < mov) ? acc : mov, movements[0]);
// console.log(maximumMovement1, maximumMovement2, maximumMovement3, minmumMovement1);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge1 = function(dogAges) {
//     const dogAgesHumans = dogAges.map(function(dogAge) {
//         if(dogAge <= 2) return 2 * dogAge;
//         else return 16 + dogAge * 4;
//     }); 
//     console.log(dogAgesHumans);
    
//     const adultdogAgesHumans = dogAgesHumans.filter(function(dogAgesHuman) {
//         return (dogAgesHuman >= 18);
//     });
//     console.log(adultdogAgesHumans);

//     const totalAdultdogAgesHumans = adultdogAgesHumans.reduce(function(acc, curr) {
//         return acc + curr;
//     });
//     console.log(totalAdultdogAgesHumans);

//     const avgAdultdogAgesHumans = (totalAdultdogAgesHumans / adultdogAgesHumans.length).toFixed(2); 
//     console.log(avgAdultdogAgesHumans);
// };
// calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);

// const calcAverageHumanAge2 = function(dogAges) {
//     const dogAgesHumans = dogAges.map((dogAge) =>  (dogAge <= 2 ) ? 2 * dogAge : 16 + dogAge * 4  );
//     console.log(dogAgesHumans);
    
//     const adultdogAgesHumans = dogAgesHumans.filter((dogAgesHuman) =>  (dogAgesHuman >= 18));
//     console.log(adultdogAgesHumans);

//     // const avgAdultdogAgesHumans = (adultdogAgesHumans.reduce((acc, curr) => acc + curr, 0) / adultdogAgesHumans.length).toFixed(2);
//     const avgAdultdogAgesHumans = (adultdogAgesHumans.reduce((acc, curr, i, arr) => acc + curr / arr.length, 0)).toFixed(2);
//     console.log(avgAdultdogAgesHumans);    
// };
// calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

// Chaining methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const euroToUsd = 1.1;
// const totalDepositsUSD = movements                             // main pipeline
//                             .filter((mov) => mov > 0)          // steps           
//                             // .map((mov) => mov * euroToUsd)  // steps           
//                             .map((mov, i, arr) => {
//                                 // console.log(arr);           // arr -result of previous step/operation
//                                 return mov * euroToUsd
//                             }) 
//                             .reduce((acc, mov) => acc + mov);  // steps
// console.log(totalDepositsUSD.toFixed(2));                      

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge3 = (dogAges) => {
//     const result = dogAges
//             .map((dogAge) => (dogAge <= 2 ) ? 2 * dogAge : 16 + dogAge * 4)
//             .filter((dogAgesHuman) =>  (dogAgesHuman >= 18))
//             .reduce((acc, curr, i, adultdogAgesHumans) => acc + curr / adultdogAgesHumans.length, 0) 
//             .toFixed(2);

//     console.log(result);
// };
// calcAverageHumanAge3([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge3([16, 6, 10, 5, 6, 1, 4]);

// FIND method - returns the first element that matches the condition and returns only one value
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === 'Steven Thomas Williams');
// console.log(account);

// SOME EVERY 
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// console.log(movements.includes(-130));     // includes - equality

// const anyDeposits = movements.some((mov) => mov > 0);    // some - condition, any/some elements should satisfy the condition
// console.log(anyDeposits);
// console.log(movements.some((mov) => mov > 5000));

// console.log(movements.every((mov) => mov > 0));      // all elements must satisfy the condition
// console.log(account4.movements.every((mov) => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// Flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());  // nested arr into normal arr, by default one level only

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));   // nested arr into normal arr, two levels only

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);

// const allAccountMovements = accountMovements.flat();
// console.log(allAccountMovements);

// const overallBalance1 = allAccountMovements.reduce((acc, mov) => acc +  mov, 0);
// console.log(overallBalance1);

// const overallBalance2 = accounts.map((acc) => acc.movements)
//                         .flat()
//                         .reduce((acc, mov) => acc +  mov, 0);
// console.log(overallBalance2);

// const overallBalance3 = accounts.flatMap((acc) => acc.movements)  // combines flat and map, goes only one level deep
//                         .reduce((acc, mov) => acc +  mov, 0);
// console.log(overallBalance3);

// Sorting arrays
// const owners = ['Anvit', 'Rohith', 'Yash', 'Nishant'];  //String sorting
// console.log(owners);
// console.log(owners.sort());   //  sort by default sorts using string ['Anvit', 'Nishant', 'Rohith', 'Yash']
// console.log(owners);          // ['Anvit', 'Nishant', 'Rohith', 'Yash']

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];   //Numbers sorting
// console.log(movements);
// console.log(movements.sort());   // just sorts using string [-130, -400, -650, 1300, 200, 3000, 450, 70] sees first char

// Ascending Sort
// return < 0, a, b ==> a < b ==> keep same order ==> a b
// return > 0, b, a ==> a > b ==> swap the order ==> b a
// movements.sort((no1, no2) => {    // sort works by comparing two values [-650, -400, -130, 70, 200, 450, 1300, 3000]
//     if(no1 > no2) return 1;
//     if(no1 < no2) return -1;
// });
// console.log(movements);
// movements.sort((no1, no2) => no1 - no2);
// console.log(movements);

// Descending Sort
// return > 0, a, b ==> a < b ==> keep same order ==> a b
// return < 0, b, a ==> a > b ==> swap the order ==> b a
// movements.sort((no1, no2) => {    // sort works by comparing two values [-650, -400, -130, 70, 200, 450, 1300, 3000]
//     if(no1 < no2) return 1;
//     if(no1 > no2) return -1;
// });
// console.log(movements);
// movements.sort((no1, no2) => no2 - no1);
// console.log(movements);

// More Array Creation and Array Filling methods
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array([1, 2, 3, 4, 5, 6, 7]));

// empty arr fill method
// const x = new Array(7);    // empty array of size 7
// console.log(x);  // (7) [empty × 7]
// x.map(() => 5);  // map does not work
// console.log(x);  // (7) [empty × 7]
// x.fill(5);    // fill does work, fills all 7 elements with value 5 
// console.log(x);  // (7) [5, 5, 5, 5, 5, 5, 5]
// x.fill(1, 3);    // fills value 1 from index 3 to end
// console.log(x);
// x.fill(1, 3, 5);    // fills value 1 from index 3 to last provided index excluding last provided index
// console.log(x);

// arr.fill(22, 2, 6);
// console.log(arr);

// Array from
// const y = Array.from({length: 7}, () => 1);
// console.log(y);

// const z = Array.from({length: 7}, (_, i) => i + 1);   // _ ==> throw away
// console.log(z);   

// const randomDice100 = Array.from({length: 100}, () => Math.trunc(Math.random() * 6) + 1);
// console.log(randomDice100);

// labelBalance.addEventListener('click', function() {
//     const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el) => Number(el.textContent.replace('€', '')));   // querySelectorAll ==> nodeList structure ==> array like structure NOT exactly array
//     // console.log(movementsUI.map((el) => Number(el.textContent.replace('€', ''))));
//     console.log(movementsUI);

//     const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//     console.log(movementsUI2);
// });

//////////////////////////////////////////////////////////
// Array Methods Pratice

// 1.
// const bankDepositSum = accounts.flatMap((acc) => acc.movements) // accounts.map((acc) => acc.movements).flat();
//                                .filter((mov) => (mov > 0))
//                                .reduce((acc, mov) => acc + mov, 0);
// console.log(bankDepositSum);

// // 2.
// const numDeposits1000_1 = accounts.flatMap((acc) => acc.movements) // accounts.map((acc) => acc.movements).flat();   using filter
//                                   .filter((mov) => (mov >= 1000)).length;
// console.log(numDeposits1000_1);                            

// const numDeposits1000_2 = accounts.flatMap((acc) => acc.movements) // accounts.map((acc) => acc.movements).flat();  using reduce
//                                 //   .reduce((countMov, mov) => (mov >= 1000 ) ? countMov + 1 : countMov, 0);  // correct 
//                                 //   .reduce((countMov, mov) => (mov >= 1000 ) ? countMov++ : countMov, 0);    // incorrect countMov ==> 0
//                                   .reduce((countMov, mov) => (mov >= 1000 ) ? ++countMov : countMov, 0);   // correct
// console.log(numDeposits1000_2);

// // prefix and postfix operator
// let a = 10;
// console.log(a++, a);    // post increment - increase, then change
// console.log(++a, a);    // pre increment - increase and change simultaneously 
// console.log(a = a + 1, a);

// // 3.
// const sumDespositsWithdrawals = accounts.flatMap((acc) => acc.movements)
//                                         .reduce((sums, curr) => {
//                                             (curr > 0) ? sums.deposits += curr : sums.withdrawals += curr;
//                                             return sums;
//                                         }, { deposits: 0, withdrawals: 0 });
// console.log(sumDespositsWithdrawals, sumDespositsWithdrawals.deposits, sumDespositsWithdrawals.withdrawals);

// const { deposits, withdrawals } = accounts.flatMap((acc) => acc.movements)
//                                             .reduce((sums, curr) => {
//                                                 (curr > 0) ? sums.deposits += curr : sums.withdrawals += curr;
//                                                 return sums;
//                                             }, { deposits: 0, withdrawals: 0 });
// console.log(deposits, withdrawals);

// const { deposits2, withdrawals2 } = accounts.flatMap((acc) => acc.movements)
//                                             .reduce((sums, curr) => {
//                                                 // (curr > 0) ? sums.deposits += curr : sums.withdrawals += curr;
//                                                 sums[curr > 0 ? 'deposits2' : 'withdrawals2'] += curr;
//                                                 return sums;
//                                             }, { deposits2: 0, withdrawals2: 0 });
// console.log(deposits2, withdrawals2);

// 4.
// // Title Case: this is a nice title ==> This is a Nice Title
// const convertToTitleCase = function(title) {
//     const exceptions = ['a', 'is', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
//     const res = title
//                     .toLowerCase()
//                     .split(' ')
//                     .map((word) => (!exceptions.includes(word)) ? `${ word[0].toUpperCase() }${ word.slice(1) }`: word)
//                     .join(' ');
//     return res;
// }
// console.log(convertToTitleCase('this is a nice title'));
// console.log(convertToTitleCase('this is a LONG title but not too long !!'));
// console.log(convertToTitleCase('and here is another title with an EXAMPLE'));

// const convertToTitleCase2 = function(title) {
//     const capitzalize =(str) => str[0].toUpperCase() + str.slice(1);
//     const exceptions = ['a', 'and', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
//     const titleCase = title
//                            .toLowerCase()
//                            .split(' ')
//                            .map((word) => (exceptions.includes(word)) ? word : capitzalize(word))
//                            .join(' ');
//     return capitzalize(titleCase);
// }
// console.log(convertToTitleCase2('this is a nice title'));
// console.log(convertToTitleCase2('this is a LONG title but not too long !!'));
// console.log(convertToTitleCase2('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// const dogs = [
//     { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//     { weight: 8, curFood: 200, owners: ['Matilda'] },
//     { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//     { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// console.log(dogs);

// // 1.
// dogs.forEach((dog) => {
//     // console.log(dog);
//     dog.recommendedFoodPortion = Math.trunc(dog.weight ** 0.75 * 28);
// })
// console.log(dogs);

// // 2.
// const moreOrLessFood = (dog) => {
//     if(dog.curFood > dog.recommendedFoodPortion)  console.log(`${ dog.owners.join(' and ')}'s dog is eating too much!`);
//     else if(dog.curFood < dog.recommendedFoodPortion) console.log(`${ dog.owners.join(' and ')}'s dog is eating too little!`);
// }

// const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// moreOrLessFood(dogSarah);

// // 3. 4.
// const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.recommendedFoodPortion).flatMap((dog) => dog.owners);
// console.log(ownersEatTooMuch);
// console.log(`${ ownersEatTooMuch.join(' and ') }'s dog eat too much!`);

// const ownersEatTooLittle = dogs.filter((dog) => dog.curFood < dog.recommendedFoodPortion).flatMap((dog) => dog.owners);
// console.log(ownersEatTooLittle);
// // console.log(`${ ownersEatTooLittle.join(' and ') }'s dog eat too little!`);

// // // 5. 6.
// console.log(dogs.some((dog) => dog.curFood === dog.recommendedFoodPortion));
// // console.log(dogs.some((dog) => (dog.curFood < (dog.recommendedFoodPortion + dog.recommendedFoodPortion * 0.1)) && (dog.curFood > (dog.recommendedFoodPortion - dog.recommendedFoodPortion * 0.1))));  // my code wrong
// console.log(dogs.some((dog) => (dog.curFood > (dog.recommendedFoodPortion * 0.9)) && (dog.curFood < (dog.recommendedFoodPortion * 1.1))));
// const checkEatingOkay = (dog) => (dog.curFood > (dog.recommendedFoodPortion * 0.9)) && (dog.curFood < (dog.recommendedFoodPortion * 1.1));
// console.log(dogs.some(checkEatingOkay));

// // // 7.
// const dogsOkayFood = dogs.filter((dog) => (dog.curFood > (dog.recommendedFoodPortion * 0.9)) && (dog.curFood < (dog.recommendedFoodPortion * 1.1)));
// console.log(dogsOkayFood);
// const dogsOkayFood2 = dogs.filter(checkEatingOkay);
// console.log(dogsOkayFood2);
// // 8.
// const dogsSorted = dogs.slice().sort((dogA, dogB) => dogA.recommendedFoodPortion - dogB.recommendedFoodPortion);     // dogA, dogB are objects not value
// console.log(dogsSorted);