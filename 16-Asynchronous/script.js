'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const container = document.querySelector('.container');

/*const renderCountry = function (data, className = '') {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.nativeName}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Millions</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]['nativeName']}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
};*/

const renderError = function (msgErr) {
    countriesContainer.insertAdjacentText('beforeend', msgErr);
    // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////


// #6. Welcome to the callback hell
/*
const renderCountry = function (data, className= '') {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags[0]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.continent}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Millions</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]['nativeName']}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = (countryCode) => {

    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/alpha/${countryCode}`);
    request.send();
    request.addEventListener('load', function () {
        const data = JSON.parse(this.responseText);
        console.log(data);

        // Render country 1
        renderCountry(data);

        // Get neighbour country
        const [neighbour] = data.borders;
        if (!neighbour) return;
        console.log(neighbour);
        
        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener('load', function () {
           /!* const {responseText} = this;
            const data2 = JSON.parse(responseText);
            console.log(responseText)*!/
            const data2 = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2, 'neighbour');
        })
    })
}


getCountryAndNeighbour('usa');

*/
/////////////////////////////////////////////
// #7. Promises and the fetch API

/*const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/alpha/${countryCode}`);
request.send();*/
/*const req = fetch('https://restcountries.com/v2/alpha/sn');
console.log(req)*/


//////////////////////////////////////////////////////////
// #8. Consuming promises
/*
const renderCountry = function (data, className= '') {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags[0]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.continent}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Millions</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]['nativeName']}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryData = (countryCode) => {
    fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data);
            const [neighbour] =data.borders;
            if (!neighbour) return;
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'))
}

btn.addEventListener('click', function () {
    getCountryData('sn');
})
*/
////////////////////////////////////////////////
// #10. Handling rejected promise
/*

const getCountryData = (countryCode) => {
    fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data);
            const [neighbour] = data.borders;
            if (!neighbour) return;
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.log(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥💥 ${err.message}. Try again! `);
        })
        .finally(() => countriesContainer.style.opacity = 1)
};


btn.addEventListener('click', function () {
    getCountryData('sn');
})

*/

////////////////////////////////////////////
// 11. Throwing Errors Manually


/*const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
};*/
/*
const getCountryData = (countryCode) => {
    getJSON(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then(data => {
            if (!data.name)
                throw new Error(`Country not found`);
            renderCountry(data);
            console.log(data);
            if (!data.borders)
                throw new Error('No neighbour found');

            const [neighbour] = data.borders;
            console.log(neighbour)
            console.log(data.borders);
            // console.log(data.borders);
            if (!neighbour)
            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`)
        })
        .then(data => {
            console.log(data);
            renderCountry(data, 'neighbour');
        })
        .catch(err => {
            console.log(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥💥 ${err.message}. Try again! `);
        })
        .finally(() => countriesContainer.style.opacity = 1)
};



btn.addEventListener('click', function () {
    getCountryData('aus');
})
*/

// Test
/*
fetch('https://restcountries.com/v2/alpha/sn')
    .then(response => {
        console.log(response)
        return response.json()}
    )
    .then(data => {
        if (!data.name){
            renderError(`Country not found`);
            throw new Error(`Country not found`);
        }

        const [neighbour] = data.borders;
        console.log(neighbour);
        console.log(data.currencies[0].name);

        renderCountry(data);
    })
    .finally(() => countriesContainer.style.opacity = 1)
*/
//////////////////////////////////////////////////////
// 12. Coding challenge #1
/*
const renderCountryByName = function (data, className= '') {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags[0]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.continent}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Millions</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]['nativeName']}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
};
let coords = [];

const whereAmI = function (lat, lng) {
    getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);

            container.insertAdjacentHTML('afterbegin',`<p style="font-size: 2rem; margin-bottom: 15px;">You are in ${data.city}, ${data.country}</p>`);
            return getJSON(`https://restcountries.com/v2/name/${data.country}`)
        })
        .then(data => {
            console.log(data[0]);
            renderCountry(data[0]);
        })
        .catch(err => {
            console.log(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥💥 ${err.message}. Try again! `);
        })
        .finally(() => countriesContainer.style.opacity = 1)
}


getPosition();
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

/////////////////////////////////////////////
// 14. The event loop in practice
/*
console.log('Test start');
setTimeout(()=>console.log('0 sec timer'),0 );
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res =>{
    setTimeout(()=> console.log(res), 2500)
})
console.log('Test end');
*/

/////////////////////////////////////////////
// 14. Building a simple promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening 🔮...');
    setTimeout(() =>{
        if (Math.random() > 0.5) {
            resolve('You win 🤑!');
        } else {
            reject(new Error('You lost your money 💩!'));
        }
    },2500)
});


// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

/!*
setTimeout(()=>{
    console.log('1 second passed');
    setTimeout(()=> {
        console.log('2 seconds passed');
        setTimeout(()=>{
            console.log('3 seconds passed');
            setTimeout(()=>{
                console.log('4 seconds passed')
            }, 1000)
        }, 100)
    },1000)
    }, 1000
);
*!/
// Promisifiying setTimeOut
const wait = (seconds) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}

wait(1)
    .then(()=>{
        console.log('1 second passed');
        return wait(1);
    })
    .then(()=>{
        console.log('2 seconds passed');
        return wait(1);
    })
    .then(()=>{
        console.log('3 seconds passed');
        return wait(1);
    })
    .then(()=>{
        console.log('4 seconds passed');
        return wait(1);
    })
    .then(()=>{
        console.log('5 seconds passed');
    })

// Resolve or rejected immediately a promise

Promise.resolve('ready').then(x => console.log(x));
Promise.reject('not ready').catch(err => console.log(err));
*/

////////////////////////////////////////////////////////
// 16. Promisifying the geolocation API
/*
console.log('Getting position');
const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
};

const getPosition = () => {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(position =>
        //     resolve(position),
        //     positionError => reject(positionError)
        //     )
        navigator.geolocation.getCurrentPosition(resolve,reject)
    })
}
const whereAmI = function () {
    getPosition()
        .then(
            position =>{
                const {latitude:lat, longitude:lng} = position.coords;
                console.log(lat);
                console.log(lng);
                return getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
            })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);

            container.insertAdjacentHTML('afterbegin',`<p style="font-size: 2rem; margin-bottom: 15px;">You are in ${data.city}, ${data.country}</p>`);
            return getJSON(`https://restcountries.com/v3/name/${data.country}`)
        })
        .then(data => {
            console.log(data[0]);
            renderCountry(data);
            console.log('tesst');
            console.log(data[0].region);
        })
        .catch(err => {
            console.log(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥💥 ${err.message}. Try again! `);
        })
        .finally(() => countriesContainer.style.opacity = 1)
}
*/
// API Rescountries V3
const renderCountry = function (data, className = '') {
    const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data[0].flags[0]}" />
          <div class="country__data">
            <h3 class="country__name">${data[0].name.nativeName['fra'].common}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>👫</span>${(data[0].population / 1000000).toFixed(1)} Millions</p>
            <p class="country__row"><span>🗣️</span>${data[0].languages[Object.keys(data[0].languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};
/*
btn.addEventListener('click', whereAmI)

/!*whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);*!/
*/

/////////////////////////////////////////////
// 17. Coding Challenge #2
/*

let image;
const imgContainer = document.querySelector('.images');

/!*const renderErrorMsg = function (msgErr) {
    imgContainer.insertAdjacentHTML('beforeend', `<p style="font-size: 4rem">${msgErr}</p>`);
};*!/

const wait = (seconds) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}
const createImage = (imgPath) => {
  return new Promise(function (resolve, reject) {
      image = document.createElement('img')
      image.setAttribute('src', imgPath)
      // image.src = imgPath
      image.addEventListener('load', ()=>{
          imgContainer.append(image);
          resolve(image)
      })

      image.addEventListener('error', () => {
          reject(new Error('No image found 🙁🙁🙁'));
      })
  })
}

createImage("img/img-1.jpg")
    .then(() => {
        console.log('image 1 loaded successfully');
        return wait(2);
    })
    .then(() =>{
        console.log('Waited for 2 seconds');
        image.style.display = 'none';
        return createImage("img/img-2.jpg")
    })
    .then(()=>{
        console.log('image 2 loaded successfully');
        return wait(2)
    })
    .then(() =>{
    console.log('Waited for 2 seconds');
    image.style.display = 'none';
    return createImage("img/img-3.jpg")
    })
    .then(() => console.log('image 3 loaded successfully'))
    .catch(err => {
        renderErrorMsg(`Something went wrong 💥💥💥 ${err.message}. Try again! `)
    })

*/

//////////////////////////////////////////////////////
// 18. Consuming Promises with AsyncAwait

const getPosition = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


/*const renderErrorMsg = function (msgErr) {
    container.insertAdjacentHTML('beforeend', `<p style="font-size: 2rem; margin-top: 50px; ">${msgErr}</p>`);
};*/
/*

const whereAmI = async () => {
        // Geolocation
        const position = await getPosition();
        const {latitude: lat, longitude: lng} = position.coords;

        // Reverse geocoding
        const responseGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        const dataGeo = await responseGeo.json();
        console.log('Response geocode', responseGeo);
        console.log('Data geocode', dataGeo);
        console.log(dataGeo.country);

        // Country data
        const resCountry = await fetch(`https://restcountries.com/v3/name/${dataGeo.country}`)
        const data = await resCountry.json();
        console.log(resCountry);
        console.log('data country ', data);
        console.log(data[0].flags);
        renderCountry(data);

}
*/

/*

<img className="country__img" src="${data[0].flags[0]}"/>
<div className="country__data">
    <h3 className="country__name">${data[0].name.nativeName['fra'].common}</h3>
    <h4 className="country__region">${data[0].region}</h4>
    <p className="country__row"><span>👫</span>${(data[0].population / 1000000).toFixed(1)} Millions</p>
    <p className="country__row"><span>🗣️</span>${data[0].languages[Object.keys(data[0].languages)[0]]}</p>
    <p className="country__row"><span>💰</span>${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</p>
</div>
*/

/*
whereAmI();
console.log('First');
*/

//////////////////////////////////////////////
// 19. Error handling with try...catch

/*const getJSONAsyncAwait = async function (url, errMsg = 'Failed to fetching data') {
    return await fetch(url)
    if (!response.ok)
        throw new Error(`${errMsg} ${response.status}`)
    return response.json();
};*/

/*
const whereAmI = async () => {
    try {
        // Geolocation
        const position = await getPosition();
        const {latitude: lat, longitude: lng} = position.coords;

        // Reverse geocoding
        const responseGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!responseGeo.ok)
            throw new Error('Problem getting location data.');
        const dataGeo = await responseGeo.json();
        console.log('Response geocode', responseGeo);
        console.log('Data geocode', dataGeo);
        console.log(dataGeo.country);

        // Country data
        const resCountry = await fetch(`https://restcountries.com/v3/name/${dataGeo.country}`)
        if (!responseGeo.ok)
            throw new Error('Problem getting country.')
        const data = await resCountry.json();
        console.log(resCountry);
        console.log('data country ', data);
        // console.log(data[0].flags);
        renderCountry(data);
    } catch (e) {
        console.error('💥', e)
        renderErrorMsg(`Something went wrong ${e.message}`);
    }

}

whereAmI()
*/

//////////////////////////////////////////
// 20.Returning Values from Async Functions
/*

const whereAmI = async () => {
    try {
        // Geolocation
        const position = await getPosition();
        const {latitude: lat, longitude: lng} = position.coords;

        // Reverse geocoding
        const responseGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!responseGeo.ok)
            throw new Error('Problem getting location data.');
        const dataGeo = await responseGeo.json();

        // Country data
        const resCountry = await fetch(`https://restcountries.com/v3/name/${dataGeo.country}`);
        if (!responseGeo.ok)
            throw new Error('Problem getting country.')
        const data = await resCountry.json();
        renderCountry(data);
        return `You are in ${dataGeo.city}, ${dataGeo.country}.`;
    } catch (e) {
        console.error('💥', e)
        renderErrorMsg(`Something went wrong ${e.message}`);

        // Reject promise returned from async function
        throw e;
    }

}

/!*const city = whereAmI();
console.log(city);*!/
console.log('1: Will get location ');
/!*
whereAmI()
    .then(city => console.log(`2: ${city}`))
    .catch(reason => console.error(`2: ${reason}`))
    .finally(() => console.log('3: Finished getting location'));
*!/

(async function () {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch (e) {
        console.error(`2: ${e}`);
    }
    console.log('3: Finished getting location');
})();
*/
//////////////////////////////////////////////////
// 22. Running Promises in Parallel

/*
const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
}
const get3Countries = async (country1, country2, country3) => {
    try {
        /!*const [data1] = await getJSON(`https://restcountries.com/v2/name/${country1}`);
        const [data2] = await getJSON(`https://restcountries.com/v2/name/${country2}`);
        const [data3] = await getJSON(`https://restcountries.com/v2/name/${country3}`);*!/
        // console.log([data1, data2]);
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${country1}`),
            getJSON(`https://restcountries.com/v2/name/${country2}`),
            getJSON(`https://restcountries.com/v2/name/${country3}`)
        ]);
        // console.log([data1.capital,data2.capital, data3.capital]);
        console.log(data.map(d => d[0].capital));
    } catch (e) {
        console.log(e);
    }
}

get3Countries('senegal', 'egypt', 'germany');
*/
///////////////////////////////////////////////////
// 22. Other Promise Combinators race, allSettled and any
/*

// Promise.race()
const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
};

(async function () {
    const res = await Promise.race([
        getJSON('https://restcountries.com/v2/name/senegal'),
        getJSON('https://restcountries.com/v2/name/egypt'),
        getJSON('https://restcountries.com/v2/name/rwanda')
    ]);
    console.log(res[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(() => reject(new Error('Request took too long')), sec * 1000);
    })
}

Promise.race([
    getJSON('https://restcountries.com/v2/name/tanzania'),
    timeout(0.15)
]).then(res => console.log(res)).catch(reason => console.error(reason))

// Promise.allSettled

Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Failed'),
    Promise.resolve('Another Success'),
])
    .then(value => console.log(value))
    .catch(reason => console.error(reason))

// Promise.any

Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Failed'),
    Promise.resolve('Another Success'),
])
    .then(value => console.log(value))
    .catch(reason => console.error(reason))
*/

////////////////////////////////////////////////////
// 23. Coding Challenge #3

let image;
const imgContainer = document.querySelector('.images');

const renderErrorMsg = function (msgErr) {
imgContainer.insertAdjacentHTML('beforeend', `<p style="font-size: 4rem">${msgErr}</p>`);
};

const wait = (seconds) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
};

const createImage = (imgPath) => {
    return new Promise(function (resolve, reject) {
        image = document.createElement('img')
        image.setAttribute('src', imgPath)
        // image.src = imgPath
        image.addEventListener('load', ()=>{
            imgContainer.append(image);
            resolve(image)
        })

        image.addEventListener('error', () => {
            reject(new Error('No image found 🙁🙁🙁'));
        })
    })
}


const loadNPause = async function(){
    try {
        // Loading image 1
        let image = await createImage('img/img-1.jpg');
        console.log('Image 1 loaded successfully');
        await wait(2)
        image.style.display = 'none';

        // Loading image 2
        image = await createImage('img/img-2.jpg');
        console.log('Image 2 loaded successfully');
        await wait(2)
        image.style.display = 'none';

        // Loading image 3
        image = await createImage('img/img-3.jpg');
        console.log('Image 3 loaded successfully');
        await wait(2)
        image.style.display = 'none';
    } catch (error) {
        console.error(error);
        renderErrorMsg(error)

    }

}

// loadNPause();

const loadAll = async function (imgArr) {
    try {
        // console.log(imgArr);
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs);
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
};
// loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
