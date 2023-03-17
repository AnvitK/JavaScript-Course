'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-12-27T17:01:17.194Z',
    '2022-12-28T23:36:17.929Z',
    '2022-12-29T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    
    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);
    
    if(daysPassed === 0) return 'Today';
    else if(daysPassed === 1) return 'Yesterday';
    else if(daysPassed <= 7) return `${ daysPassed } days ago`;
    else {
        // const day = `${ date.getDate() }`.padStart(2, 0);   // using JS Date
        // const month = `${ date.getMonth() + 1 }`.padStart(2, 0);   
        // const year = date.getFullYear();
        // return `${ day }/${ month }/${ year }`;
        return new Intl.DateTimeFormat(locale).format(date);  // using Intl (Internationalization) API 
    }
};

const formatCurrency = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

const displayMovements = function(acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;  // create copy of movements arr so not to change the original movements arr only display them sortly ascending

    movs.forEach(function(mov, i) {
        const amtType = (mov > 0) ? 'deposit' : 'withdrawal'; 

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);

        const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

        const htmlMarkup = `
            <div class="movements__row">
                <div class="movements__type movements__type--${ amtType }">${ i + 1 } ${ amtType }</div>
                <div class="movements__date">${ displayDate }</div>
                <div class="movements__value">${ formattedMov }</div>
            </div>
        `;
        //      <div class="movements__value">${ mov.toFixed(2) }€</div>

        containerMovements.insertAdjacentHTML('afterbegin', htmlMarkup);
    });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); 
    const formattedBalance = formatCurrency(acc.balance, acc.locale, acc.currency);
    labelBalance.textContent = formattedBalance;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
                    .filter((mov) => (mov > 0))
                    .reduce((acc, mov) => acc + mov, 0);
    const formattIncomes = formatCurrency(incomes, acc.locale, acc.currency);
    labelSumIn.textContent = formattIncomes;

    const outcomes = acc.movements
                    .filter((mov) => (mov < 0))
                    .reduce((acc, mov) => acc + mov, 0);
    const formattOutcomes = formatCurrency(outcomes, acc.locale, acc.currency);
    labelSumOut.textContent = formattOutcomes;

    const interest = acc.movements
                    .filter((mov) => (mov > 0))
                    .map((depositAmt) => depositAmt * acc.interestRate/100)
                    .filter((inte, i, arr) => {
                        // console.log(arr);
                        return inte >= 1;
                    })
                    .reduce((acc, int) => acc + int, 0);
    const formatInterest = formatCurrency(interest, acc.locale, acc.currency);
    labelSumInterest.textContent = formatInterest;

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
    displayMovements(acc);
        
    // Display balance
    calcDisplayBalance(acc);
    
    // Display summary
    calcDisplaySummary(acc);
}

const startLogoutTimer = function() {

    const tickTock = function() {
        const mins = String(Math.trunc(time / 60)).padStart(2, 0);
        const secs = String(time % 60).padStart(2, 0);

        // In each call, print the remaining time to UI
        labelTimer.textContent = `${ mins }:${ secs }`;

        // When 0 second, stop timer and log out user
        if(time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = 'Log in to get started';
            containerApp.style.opacity = 0;
        }
        
        // Decrease 1s
        time--;
    }

    // Set time to 5 mins 
    let time = 30;

    // Call the timer every second
    tickTock();
    const timer = setInterval(tickTock, 1000);

    // return timer for deleteing if there is already other user timer running
    return timer;
};

// Event handlers
// Login btn Event Handler
let currentAccount, timer;

// Fake Always LOGGED In
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Date
// const now = new Date();
// console.log(now);
// labelDate.textContent = now;  // As of Fri Dec 30 2022 18:04:14 GMT+0530 (India Standard Time)

// day/month/year
// const day = `${ now.getDate() }`.padStart(2, 0);
// const month = `${ now.getMonth() + 1 }`.padStart(2, 0);   
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${ day }/${ month }/${ year }, ${ hour }:${ min }`;

btnLogin.addEventListener('click', function(e) {   // login method
    // Prevent form from submitting
    e.preventDefault();
    // console.log('LOGIN');

    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
    // console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)) {   // optional chaining
        // console.log('LOGIN');
        // Display UI and welcome msg
        labelWelcome.textContent = `Welcome Back, ${ currentAccount.owner.split(' ')[0] }`;
        containerApp.style.opacity = 100;
        
        // Create current Date and Time Method 1 using JS Date
        // const now = new Date();
        // const day = `${ now.getDate() }`.padStart(2, 0);
        // const month = `${ now.getMonth() + 1 }`.padStart(2, 0);   
        // const year = now.getFullYear();
        // const hour = `${ now.getHours() }`.padStart(2, 0);
        // const min = `${ now.getMinutes() }`.padStart(2, 0);
        // labelDate.textContent = `${ day }/${ month }/${ year }, ${ hour }:${ min }`;

        // Create current Date and Time Method 2 using Intl (Internationalization) API 
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            // weekday: 'long'
        };
        // const locale = navigator.language;
        // console.log(locale);
        const locale = currentAccount.locale;
        labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Logout/Reset Timer
        // if a timer of a user already exists, clear/delete that timer, if not cleared then two simultaneous timers will be present
        if(timer) clearInterval(timer);
        timer = startLogoutTimer();

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

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date());

        // Update UI
        updateUI(currentAccount);

        // Reset timer
        clearInterval(timer);
        timer = startLogoutTimer();
    }
});

btnLoan.addEventListener('click', function(e) {    // loan method
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some((mov) => (mov >= amount * 0.1))) {
        setTimeout(function() {
            // Add movement
            currentAccount.movements.push(amount);

            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount); 

            // Logout/Reset Timer
            // if a timer of a user already exists, clear/delete that timer, if not cleared then two simultaneous timers will be present
            if(timer) clearInterval(timer);
            timer = startLogoutTimer();
        }, 2500);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {    // delete user
    e.preventDefault();
    // console.log('Delete');
    // currentAccount = accounts.find((acc) => acc.username === inputCloseUsername.value);
    
    if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {   // currentAccount.pin === +(inputClosePin.value)
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
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

// const user = 'Steven Thomas Williams';  // stw
// const username = user.toLowerCase().split(' ').map((u) => u.charAt(0)).join('');


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Conversion and Checking Numbers
// console.log(22 === 22.0);  // true

// // Base 10 - 0 to 9
// // Binary base 2 - 0 and 1
// console.log(0.1 + 0.2);    // 0.30000000000000004
// console.log(0.1 + 0.2 === 0.3);   // false

// // Conversion str - no
// console.log(Number('22'), +'22', Number('22') === +'22');    // 22 22 true

// // Parsing
// console.log(Number.parseInt('22px'), Number.parseInt('e22'));  // console.log(parseInt('22px'), parseInt('e22'));  22 NaN
// console.log(Number.parseFloat('2.2rem'), Number.parseInt('2.2rem'));  // 2.2 2

// // isNaN - checking if value is not a number
// console.log(Number.isNaN(22), Number.isNaN('22'), Number.isNaN(+'20X'), Number.isNaN(+'22A'));  // false false true true
// console.log(Number.isNaN(22 / 0));   // false

// // isFinite - checking if value is real number 
// console.log(Number.isFinite(22), Number.isFinite('22'), Number.isFinite(+'20X'), Number.isFinite(+'22A'));  // true false false false
// console.log(Number.isFinite(22 / 0));      // false
 
// // isInteger - checking if value is integer number
// console.log(Number.isInteger(22), Number.isInteger('22'), Number.isInteger(+'20X'), Number.isInteger(+'22A'));  // true false false false
// console.log(Number.isInteger(22 / 0));      // false

// Math and Rounding
// Sqrt, Cbrt, power
// console.log(Math.sqrt(36));
// console.log(36 ** (1/2));
// console.log(8 ** (1/3));

// // Max and Min
// console.log(Math.max(5, 9, 22, 33, 2));
// console.log(Math.max(5, 9, '22', 33, 2));
// console.log(Math.max(5, 9, '22px', 33, 2));

// console.log(Math.min(5, 9, 22, 33, 2));

// console.log(Math.PI * Number.parseFloat('10.5px') ** 2);

// // Random
// console.log(Math.trunc(Math.random() * 6) +  1);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) +  1) + min;
//                                         // 0....1  ==>    o....(max - min)     ==> min....(max)
// console.log(randomInt(10, 20));

// // Rounding
// console.log(Math.trunc(22.22));

// console.log(Math.round(22.4));
// console.log(Math.round(22.7));

// console.log(Math.ceil(22.4));
// console.log(Math.ceil(22.7));

// console.log(Math.floor(22.4));
// console.log(Math.floor(22.7));
// console.log(Math.round('22.7'));

// console.log(Math.trunc(22.4));
// console.log(Math.trunc(-22.4));
// console.log(Math.floor(-22.4));

// // Rounding Decimals
// console.log((22.5).toFixed(0));   // toFixed returns string, 23
// console.log((22.5).toFixed(1));   // toFixed returns string, 22.5
// console.log((22.5).toFixed(3));   // toFixed returns string, 22.500
// console.log((22.5678).toFixed(2));   // toFixed returns string, 22.57
// console.log(+(22.5678).toFixed(2));   // toFixed returns string, 22.57, + converts string to Number

// Remainder
// console.log(5 % 2);   // 1  
// console.log(5 / 2);   // 2.5    

// console.log(8 % 3);   // 2
// console.log(8 / 3);   // 2.6666666666666665    

// console.log(6 % 2);   // 0
// console.log(6 / 2);   // 3    
// console.log(7 % 2);   // 1
// console.log(7 / 2);   //  3.5   

// const isEven = (no) => ((no % 2) === 0);
// console.log(isEven(4), isEven(6), isEven(3), isEven(414), isEven(1111));

// labelBalance.addEventListener('click', function() {
//     [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
//         if(i % 2 === 0) row.style.backgroundColor = 'orange';
//         if(i % 3 === 0) row.style.backgroundColor = 'green';
//     });    
// });

// Numeric Separator
// const diameter = 287460000000;  // 287,460,000,000
// const diameter2 = 287_460_000_000;  
// console.log(diameter, diameter2);

// const price = 345_99;
// console.log(price);

// const transferFee1 = 15_00;  
// const transferFee2 = 1_500;  
// console.log(transferFee1, transferFee2);

// const PI = 3.1415;  // _3.1415, 3_.1415 ==> ERROR;  3.14_15 ==> OK
// console.log(PI);

// console.log(Number('222000'));    // 222_000 ==> ERROR;
// console.log(parseInt('222_000'));    // 222_000 ==> 222 ==> OK but returns not expected result

// BigInt
// console.log(2 ** 53 - 1);               // 9007199254740991
// console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991 
// console.log(2 ** 53 + 0, 2 ** 53 + 1, 2 ** 53 + 2, 2 ** 53 + 3, 2 ** 53 + 4);  // 9007199254740992 9007199254740992 9007199254740994 9007199254740996 9007199254740996
// console.log(123456789112233445566778899111222333444555666777888999n);           // 123456789112233445566778899111222333444555666777888999n
// console.log(BigInt(123456789112233445566778899111222333444555666777888999));    // 123456789112233439947269605406919565360216830531076096n different result

// console.log(10000n + 20000n);         // 30000n
// console.log(123456789112233445566778899111222333444555666777888999n + 10000n);

// const hugeNo = 112233445566778899n;
// const no = 22;
// // console.log(hugeNo + no);  // error
// console.log(hugeNo + BigInt(no));

// console.log(22n > 11, 22n === 22, typeof 22n, 22n == '22');     // true false 'bigint' true
// console.log(hugeNo + ' is a very big number!!');

// console.log(11n / 3n, 11 / 3);

// Dates
// Date Creation
// const now = new Date();
// console.log(now);

// console.log(new Date('Fri Dec 30 2022 17:12:29'));
// console.log(new Date('December 24, 2022'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2040, 10, 20, 16, 25, 55));  // Tue Nov 20 2040 16:25:55 GMT+0530 (India Standard Time)
// console.log(new Date(2040, 10, 31), new Date(2040, 10, 33));  // Sat Dec 01 2040 00:00:00 GMT+0530 (India Standard Time) Mon Dec 03 2040 00:00:00 GMT+0530 (India Standard Time)

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60* 1000));

// const futureDate = new Date(2040, 10, 20, 16, 25);
// console.log(futureDate);
// console.log(futureDate.getFullYear(), futureDate.getMonth(), futureDate.getDate(), futureDate.getDay());
// console.log(futureDate.getHours(), futureDate.getMinutes(), futureDate.getSeconds());
// console.log(futureDate.toISOString());
// console.log(futureDate.getTime());  // Time stamp  2237021700000
// console.log(new Date(2237021700000));  // Tue Nov 20 2040 16:25:00 GMT+0530 (India Standard Time)
// console.log(Date.now());  // current time stamp 1672403226189

// futureDate.setFullYear(2044);
// console.log(futureDate);

// Date Operations
// const futureDate = new Date(2040, 10, 20, 16, 25);
// console.log(futureDate, Number(futureDate), +futureDate);

// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const days1 = calcDaysPassed(new Date(2040, 2, 1), new Date(2040, 2, 31));
// const days2 = calcDaysPassed(new Date(2040, 2, 1), new Date(2040, 1, 25));
// console.log(days1, days2);

// Internationalizing Dates done in project, now Internationalizing Numbers
// const num = 1234567.89;

// const options = {
//     style: "currency",  // style - unit, percent, currency
//     // unit: 'celsius',    // unit for when style is only unit
//     currency: 'INR',
//     // useGrouping: false
// }

// console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('India: ', new Intl.NumberFormat('en-IN', options).format(num));
// console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log('Browser: ', navigator.language, new Intl.NumberFormat(navigator.language, options).format(num));

// // Timers: setTimeout() and setInterval()
// setTimeout(() => console.log('Here is your pizza 🍕🍕!!!'), 3000);
// setTimeout((ing1, ing2) => console.log(`Here is your pizza 🍕🍕 with ${ ing1 } and ${ ing2 }`), 3000, 'chicken', 'tomatoes');
// const ings = ['chicken', 'tomatoes'];
// const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza 🍕🍕 with ${ ing1 } and ${ ing2 }`), 3000, ...ings);
// console.log('Waiting!!!');   // asynchronus

// if(ings.includes('chicken')) clearTimeout(pizzaTimer);    // cutting/deleteing/removing pizzaTimer

// setInterval(function() {
//     const now = new Date();
//     console.log(now);
// }, 3000);

















