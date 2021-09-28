'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
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
};

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

const getJSON = function (url, errMsg = 'Cannot found country '){
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} ${response.status}`)
            return response.json();
        })
};

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
