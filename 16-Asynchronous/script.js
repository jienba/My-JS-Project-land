'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = (countryCode) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/alpha/${countryCode}`);
    request.send();
    request.addEventListener('load', function () {
        const data = JSON.parse(this.responseText);
        console.log(data);

        const html = `
    <article class="country">
          <img class="country__img" src="${data.flags[0]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.continent}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]['nativeName']}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    })
}


getCountryData('sn');
getCountryData('rw');
getCountryData('et');
getCountryData('tur');

