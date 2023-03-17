// let js = 'great';
// (js === 'greatest') ? alert('JS IS GREAT!!!!') : alert('JS IS BAD!!!!');
// console.log(55 + 87 - 5 * 7);

// console.log('Anvit Kamble');
// const firstName = 'Anvit';
// const lastName = 'Kamble';
// console.log(firstName + lastName);

// wring variable name conventions
// let _new = 89;        // right
// let function = 98;    // wrong
// let @fsno = 75;       // wrong
// let abc86$xyz = 34;   // right

// // variable name conventions
// let myFirstCompany = 'TCS';
// let myCurrCompany = 'None';

// let company1 = 'TCS';
// let company2 = 'None';
// console.log(myFirstCompany, myCurrCompany, company1, company2)

// datatypes
// let jsIsFun1;
// console.log(typeof jsIsFun1);
// let jsIsFun2 = false;
// console.log(typeof jsIsFun2);
// console.log(typeof undefined);
// console.log(typeof true, typeof false);
// console.log(typeof 0, typeof 1);
// console.log(typeof 46);
// console.log(typeof 'abcde');
// console.log(typeof "abcde");
// console.log(typeof NaN);
// console.log(typeof null);

// dynamic typing
// let jsIsFun = false;                  // typeof jsIsFun: boolean
// console.log(jsIsFun, typeof jsIsFun);
// jsIsFun = 'JS IS AMAZING!!!!!!!';     // typeof jsIsFun: string
// console.log(jsIsFun, typeof jsIsFun);

// let, var, const
// let age = 21;  // let - blocked scope
// age = 22;      // let variable - value can be changed

// const birthYear = 2000;   // const variable - value canNOT be changed
// birthYear = 2001;    // Error: script.js:49 Uncaught TypeError: Assignment to constant variable. at script.js:49:11
// let job;  // OK
// const job;  // ERROR!!!

// var job = 'codder';  // var - function scope
// job = 'web developer';

// firstName = 'Anvit';  // creates global property
// console.log(firstName);

// operators
// const currYear = 2023;
// const anvitAge = currYear - 2000;
// const darshanaAge = currYear - 1978;
// const manoharAge = currYear - 1965;
// console.log(currYear, anvitAge, darshanaAge, manoharAge);
// console.log(anvitAge + 5, anvitAge / 2, 2 ** 6);

// const firstName = 'Anvit';
// const lastName = 'Kamble';
// console.log(firstName + ' ' + lastName);

// let no = 15 + 6;
// no += 20;
// console.log(no);
// no -= 5;
// console.log(no);
// no++;
// console.log(no);
// no--;
// console.log(no);
// ++no;
// console.log(no);
// --no;
// console.log(no);
// no /= 2;
// console.log(no);

// console.log(anvitAge > darshanaAge);
// console.log(darshanaAge > manoharAge);
// console.log(anvitAge > manoharAge);

// console.log((manoharAge > anvitAge) && (manoharAge > darshanaAge));
// console.log((manoharAge > anvitAge) || (manoharAge > darshanaAge));
// console.log((darshanaAge > anvitAge) && (anvitAge > manoharAge));
// console.log((darshanaAge > anvitAge) || (anvitAge > manoharAge));

// const firstName = 'Anvit';
// const job = 'engineer';
// const currYear = 2023;
// const birthYear = 2000;

// const anvit1 = "I'm " + firstName + ", a " + (currYear - birthYear) + " years old " + job + "!!";
// console.log(anvit1);

// const anvit2 = `I'm ${ firstName }, a ${ (currYear - birthYear) } years old ${ job }!!`;
// console.log(anvit2);

// const msg1 = "My name\n\
// is Anvit\n\
// Kamble";
// console.log(msg1);

// const msg2 = `My name
// is Anvit
// Kamble`;
// console.log(msg2);23

// const age = +prompt('Enter age: ');   // parseInt(prompt('Enter age: ')); or Number(prompt('Enter age: '))
// if(age >= 18) {
//     alert('You can get driving license!! ');
// } else {
//     const yearsLeft = 18 - age;
//     alert(`You will get driving license after ${ yearsLeft } years!!`);
// }

// type conversion    // type casting - user manually
// const inputYear = '2000';  // String
// console.log(Number(inputYear), inputYear);    // String -> Number, String
// console.log(Number(inputYear) + 22);  // String -> Number
// console.log(inputYear + 22);    // String
// console.log(Number('Anvit'), typeof NaN);   // NaN ==> Number

// type coercion   // automatic type conversion - interpreter automatic
// console.log('I am ' + 22 + ' years old!!');  // console.log('I am ' + '22' + ' years old!!'); console.log('I am ' + String(22) + ' years old!!');
// console.log('22' - '7' - 9)  // 6      (-) ==> string to no
// console.log('22' + '7' + 9)  //2279    (+) ==> no to string
// console.log('22' * 2)  // 44           (*) ==> string to no
// console.log('22' / 2)  // 11           (-, *, /) ==> string to no

// let no = '22' + 5; // no = 225
// no = no - 3;       // no = 222
// console.log(no);   // no = 222

// Truthy & Falsy
// 5 falsy values: 0, '', undefined, null, NaN
// console.log(Boolean(0));
// console.log(Boolean(''));
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(NaN));

// const money = 0;
// if(money) {
//     console.log("You have money, don't spend much ;)");
// } else {
//     console.log('Get a JOOOBBB!!! (:');
// }

// let height;      // falsy  height = undefined
// let height = 0;  // falsy
// let height = 165;   // truthy
// if (height) {
//     console.log("YaY!! Height is defined");
// } else {
//     console.log("Height is NOT defined");
// }

// eqaulity  === vs ==
// == type coercion, === NOT type coercion
// let age = 18;
// if(age === 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = '18';
// if(age === 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = 5;
// if(age === 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = 'adult';
// if(age === 18) console.log('You became an adult!!'); else console.log('FALSE!!');

// age = 18;
// if(age == 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = '18';
// if(age == 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = 5;
// if(age == 18) console.log('You became an adult!!'); else console.log('FALSE!!');
// age = 'adult';
// if(age == 18) console.log('You became an adult!!'); else console.log('FALSE!!');

// let favNo = prompt("What's your favourite number?");
// console.log(favNo, typeof favNo);
// if(favNo == 22) console.log('22 is a perfect No!!'); else console.log('FALSE!!');
// if(favNo === 22) console.log('22 is a perfect No!!'); else console.log('FALSE!!');

// favNo = parseInt(prompt("What's your favourite number?"));
// console.log(favNo, typeof favNo);
// if(favNo == 22) console.log('22 is a perfect No!!'); else console.log('FALSE!!');
// if(favNo === 22) console.log('22 is a perfect No!!'); else console.log('FALSE!!');

// const favNo = Number(prompt("What's your favourite number?"));
// console.log(favNo, typeof favNo);
// if (favNo == 22) {
//   console.log("22 is a perfect No!!");
// } else if (favNo == 11) {
//   console.log("11 is a perfect No!!");
// } else if (favNo == 5) {2
//   console.log("5 is a perfect No!!");
// } else {
//   console.log("No is not 22 nor 11 nor 5!!");
// }

// logical operators
// let hasDriversLicense = true;
// let hasGoodVision = true;
// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);

// hasDriversLicense = false;
// hasGoodVision = false;
// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);

// hasDriversLicense = false;
// hasGoodVision = true;
// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);

// hasDriversLicense = true;
// hasGoodVision = false;
// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);

// console.log(!hasDriversLicense, !hasGoodVision);

// hasDriversLicense =  true;
// hasGoodVision = true;

// let isTired = true;
// let shouldDrive = hasDriversLicense && hasGoodVision && !isTired;
// if(shouldDrive) {
//     console.log('Anvit can drive!!!');
// } else {
//     console.log('Someone else should drive!!!');
// }

// const dayNo = Number(prompt("Enter Day No"));
// switch (dayNo) {
//   case 1:
//     alert("MONDAY !");
//     break;
//   case 2:
//     alert("TUESAY !");
//     break;
//   case 3:
//     alert("WEDNESAY !");
//     break;
//   case 4:
//     alert("THURSDAY !");
//     break;
//   case 5:
//     alert("FRIDAY !");
//     break;
//   case 6:
//     alert("SATURDAY !");
//     break;
//   case 7:
//     alert("SUNDAY !");
//     break;
//   default:
//     alert("WRONG DAY NO!");
// };
