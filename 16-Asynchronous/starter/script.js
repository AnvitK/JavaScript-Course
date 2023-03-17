'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// URL: https://restcountries.com/v2/

// XMLHttpRequest
// const getCountryData = function(country) {
//     const req = new XMLHttpRequest();
//     // console.log(req);
//     req.open('GET', `https://restcountries.com/v2/name/${country}`);   // get the url
//     req.send();                                                       // requests the url
//     // console.log(req.responseText); empty

//     req.addEventListener('load', function() {
//         // console.log(this.responseText);

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const htmlMarkup = `
//             <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//             </article>
//         `;
        
//         countriesContainer.insertAdjacentHTML('beforeend', htmlMarkup);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');
// getCountryData('bharat');

const renderCountry = function(data, className = '') {
    const htmlMarkup = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;
        
        countriesContainer.insertAdjacentHTML('beforeend', htmlMarkup);
        countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbourData = function(country) {     // callback hell example 1
//     const req = new XMLHttpRequest();    // AJAX call country 1
//     req.open('GET', `https://restcountries.com/v2/name/${country}`);   // get the url, in name you get country names which can be similar ==> arr of objects
//     req.send();                                                       // requests the url
//     // console.log(req.responseText); empty

//     req.addEventListener('load', function() {
//         // console.log(this.responseText);

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         renderCountry(data);     // Render country 1

//         const neighbour = data.borders?.[0];    // Get neighbour Country
//         console.log(neighbour);

//         if(!neighbour) return;

//         const req2 = new XMLHttpRequest();    // AJAX call neighbour country 2
//         req2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);   // get the url, in alpha you get country codes which are unique ==> only objects
//         req2.send();

//         req2.addEventListener('load', function() {
//             // console.log(this.responseText);
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');     // Render country 2
//         });
//     });
// };

// // getCountryAndNeighbourData('portugal');
// getCountryAndNeighbourData('usa');

// setTimeout(() => {      // callback hell example 2
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 second passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 4000);
//         }, 3000);
//     }, 2000);
// }, 1000);

// Fetch Promise
// const req = new XMLHttpRequest();
// req.open('GET', `https://restcountries.com/v2/name/${country}`);   // get the url
// req.send();  

// const req = fetch('https://restcountries.com/v2/name/portugal');
// console.log(req);

// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)  // fetch return a promise
//     .then(function(response) {                             // then handles that returned promise
//         console.log(response);
//         return response.json();                            // json also return a promise
//     })
//     .then(function(data) {                                 // then handles that returned promise
//         console.log(data);
//         renderCountry(data[0]);
//     });
// };

// const getCountryData = function(country) {   // handling err in each then()
//     fetch(`https://restcountries.com/v2/name/${country}`)   // Country 1
//     .then((response) =>  response.json(), (err) => alert(err))
//     .then((data) => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];

//         if(!neighbour)  return;
        
//         // fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then((response) =>  response.json())   // WRONG CALLBACK HELL AGAIN

//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);   // Country 2
//     })
//     .then((response) =>  response.json(), (err) => alert(err))
//     .then((data) => renderCountry(data, 'neighbour'));
// };

// const getJSON = function(url, errorMsg = 'Something went wrong!!') {
//     return fetch(url).then((response) => {
//         if(!response.ok)    throw new Error(`${errorMsg} ${response.status}`);
//         return response.json();
//     });
// }

// const getCountryData = function(country) {   
//     fetch(`https://restcountries.com/v2/name/${country}`)   // Country 1
//     .then((response) => {
//         console.log(response); 

//         if(!response.ok)    throw new Error(`Country not found ${response.status}`);     // it this is true, then() immediately returns reject Promise which will get caught in catch()

//         return response.json();
//     })
//     .then((data) => {
//         renderCountry(data[0]);
//         // const neighbour = data[0].borders[0];
//         const neighbour = 'efgh';

//         if(!neighbour)  return;
        
//         // fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then((response) =>  response.json())   // WRONG CALLBACK HELL AGAIN

//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);   // Country 2
//     })
//     .then((response) => { 
//         console.log(response); 

//         if(!response.ok)    throw new Error(`Country not found ${response.status}`);     // it this is true, then() immediately returns reject Promise which will get caught in catch()
        
//         return response.json();
//     })
//     .then((data) => renderCountry(data, 'neighbour'))
//     .catch((err) => {                                    // handling err globally using one catch()
//         console.error(`${err} 💥💥💥`);
//         renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!!`);
//     })
//     .finally(() => {                                     // finally() is always called
//         countriesContainer.style.opacity = 1;
//     })
// }; 

// getCountryData('germany');

// const getCountryData = function(country) {   
//     getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')       // Country 1
//     .then((data) => {
//         renderCountry(data[0]);
        
//         if(!data[0].borders)   throw new Error('No neighbour country found!!');
        
//         const neighbour = data[0].borders[0];
//         // if(!neighbour)   throw new Error('No neighbour country found!!');      // was not able to get desired result as for no neighbour country NO border property exists so no border[0]
        
//         // fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then((response) =>  response.json())   // WRONG CALLBACK HELL AGAIN
//         return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found');   // Country 2
//     })
//     .then((data) => renderCountry(data, 'neighbour'))
//     .catch((err) => {                                    // handling err globally using one catch()
//         console.error(`${err} 💥💥💥`);
//         renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!!`);
//     })
//     .finally(() => {                                     // finally() is always called
//         countriesContainer.style.opacity = 1;
//     })
// }; 


// btn.addEventListener('click', function() {
//     getCountryData('portugal');
// });

// getCountryData('australia');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function(lat, lng) {
//     // fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
//     .then((res) => {
//         if(!res)  throw new Error(`Error with geocoding ${res.status}`);
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.countryName}`);

//         return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then((res) => {
//         console.log(res);
//         if(!res.ok) throw new Error(`Country not found (${res.status})`);
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data[0]);
//         renderCountry(data[0]);
//     })
//     .catch((err) => {
//         console.log(`${err.message} 💥💥`);
//     })
//     .finally(() => countriesContainer.style.opacity = 1); 
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Event Loop in practice
// console.log('Test start');                                               // 1st  1st
// setTimeout(() => console.log('0 sec timer'), 0);                         // 4th  5th callbacks functions are put in normal callback queue
// Promise.resolve('Resolved promise 1').then((res) => console.log(res));   // 3rd  3rd promises are put in MICROTASK queue which has more priority than normal callback queue
// // console.log('Test end');                                              // 2nd

// Promise.resolve('Resolved promise 2').then((res) => {                    //      4th promises are put in MICROTASK queue which has more priority than normal callback queue
//     for(let i = 0; i < 1000000000; i++) {}
//     console.log(res);
// });

// console.log('Test end');                                                 //      2nd

// Building new promise
// const lotteryPromise = new Promise(function(resolve, reject) {      // executor func
//     console.log('Lottery draw is happening 🔮');
//     setTimeout(function() {
//         if(Math.random() >= 0.5) {
//             resolve('You WIN 🤑💰');               // fullfilled/resolved promise state 
//         } else {
//             reject(new Error('You LOST your money 💩💩'));    // unfullfilled/rejected promise state
//         }
//     }, 2000);

// });

// lotteryPromise.then((res) => console.log(res)).catch((res) => console.error(res));    // consuming promise

// // Promisifying setTimeout
// const wait = function(seconds) {
//     return new Promise(function(resolve) {
//         setTimeout(resolve, seconds * 1000)
//     });
// };

// setTimeout(() => {      // callback hell example 
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 second passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 4000);
//         }, 3000);
//     }, 2000);
// }, 1000);

// wait(1).then(() => {       // same as above but without callback hell but using PROMISE
//     console.log('1 second passed');
//     return wait(2); 
// })
// .then(() => {
//     console.log('2 second passed');
//     return wait(2);
// })
// .then(() => {
//     console.log('3 second passed');
//     return wait(3);
// })
// .then(() => {
//     console.log('4 second passed');
// });

// Promise.resolve('abcd').then((x) => console.log(x));
// Promise.reject(new Error('Problem!!')).catch((x) => console.error(x));

// navigator.geolocation.getCurrentPosition((position) => console.log(position), (err) => console.error(err));
// console.log('Getting position');

// const getPosition = function() {
//     return new Promise(function(resolve, reject) {
//         // navigator.geolocation.getCurrentPosition((position) => resolve(position), (err) => reject(err));
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//      });
// };

// getPosition().then((pos) => console.log(pos));

// const whereAmI = function() {
//     getPosition().then((pos) => {
//         console.log(pos.coords);
//         const {latitude: lat, longitude: lng } = pos.coords;

//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
//     })
//     // fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     // fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
//     .then((res) => {
//         if(!res)  throw new Error(`Error with geocoding ${res.status}`);
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.countryName}`);

//         return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then((res) => {
//         console.log(res);
//         if(!res.ok) throw new Error(`Country not found (${res.status})`);
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data[0]);
//         renderCountry(data[0]);
//     })
//     .catch((err) => {
//         console.log(`${err.message} 💥💥`);
//     })
//     .finally(() => countriesContainer.style.opacity = 1); 
// };

// btn.addEventListener('click', whereAmI);


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own.
Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector('.images');

// const createImage = function(imgPath) {
//     return new Promise(function(resolve, reject) {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', function() {
//             imgContainer.append(img);
//             resolve(img);
//         });

//         img.addEventListener('error', function() {
//             reject(new Error('Image not found!!'));
//         });
//     })
// };

// const wait = function(seconds) {
//     return new Promise(function(resolve) {
//         setTimeout(resolve, seconds * 1000)
//     });
// };

// let currImg;

// createImage('img/img-1.jpg')
// .then((img) => {
//     currImg = img;
//     return wait(2);
// })
// .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
// })
// .then((img) => {
//     currImg = img;
//     return wait(2);
// })
// .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-3.jpg')
// })
// .then((img) => {
//     currImg = img;
//     return wait(2);
// })
// .then(() => {
//     currImg.style.display = 'none';
// })
// .catch((err) => console.error(err));

// const getPosition = function() {
//     return new Promise(function(resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//      });
// };

// const whereAmI = async function() {      // async function always returns a PROMISE
//     try {
//         // Geolocation
//         const pos = await getPosition();
//         const {latitude: lat, longitude: lng } = pos.coords;
        
//         // Reverse Geocoding
//         const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
//         if(!resGeo.ok)  throw new Error('Problem getting location data!!');
//         const dataGeo = await resGeo.json();
//         // console.log(dataGeo);

//         // fetch(`https://restcountries.com/v2/name/${country}`).then((res) => console.log(res));

//         const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`); 
//         if(!res.ok)  throw new Error('Problem getting location country!!');
        
//         const data = await res.json();
//         // console.log(data);                      // [{British Indian Ocean Territory}, {India}]
//         renderCountry(data[1]);

//         return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//     } catch(err) {
//         console.log(err);
//         renderError(`💥💥 ${err.message}`);

//         // Reject Promise returned from async fucntion
//         throw err;
//     };
// };

// console.log('1. Will get location');
// const cityCountry = whereAmI();      // returns Promise - Promise {<pending>}
// console.log(cityCountry);
// whereAmI()
//     .then((cityCountry) => console.log(`2: ${cityCountry}`))
//     .catch((err) => console.log(`2: ${err.message}`))         // returns the desired output 
//     .finally(() => console.log('3. Finished getting location'));
// console.log('3. Finished getting location');

// try {
//     let x = 1;
//     const y = 2;
//     y = 3;
// } catch(err) {
//     alert(err.message);
// };

// (async function() {
//     try {
//         const cityCountry = await whereAmI();
//         console.log(`2: ${cityCountry}`);
//     } catch(err) {
//         console.log(`2: ${err.message}`)
//     }
//     console.log('3. Finished getting location');
// })();

// Promise Parallel
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};

// const get3Countries = async function(c1, c2, c3) {
//     try {
//         // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//         // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//         // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//         // console.log(data1.capital, data2.capital, data3.capital);

//         const data = await Promise.all([                            // returns an array of Promises, but it short circuits if any promise gets rejected
//             getJSON(`https://restcountries.com/v2/name/${c1}`),
//             getJSON(`https://restcountries.com/v2/name/${c2}`),
//             getJSON(`https://restcountries.com/v2/name/${c3}`)
//         ]);
//         console.log(data);
//         console.log(data.map((d) => d[0].capital));
//     } catch(err) {
//         console.log(err);
//     }
// };
// get3Countries('portugal', 'canada', 'australia');

// Promise Combinators: Promise.race
// (async function() {
//     const res = await Promise.race([                           // returns the fastest promise
//         getJSON(`https://restcountries.com/v2/name/italy`),
//         getJSON(`https://restcountries.com/v2/name/mexico`),
//         getJSON(`https://restcountries.com/v2/name/egypt`)
//     ]);
//     console.log(res[0]);
// })();

const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error('Request took too long!!'));
        }, sec * 1000)
    })
};

Promise.race([
    getJSON(`https://restcountries.com/v2/name/tanzania`),
    timeout(5)
])
.then(res => console.log(res[0]))
.catch(err => console.error(err));

Promise.allSettled([                             // returns an array of Promises, but it DOES NOT short circuits if any promise gets rejected
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err));

Promise.all([                             // returns an array of Promises, but it short circuits if any promise gets rejected
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err));


Promise.any([                            // returns first fullfilled promise and ignores rejected promise
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err));





