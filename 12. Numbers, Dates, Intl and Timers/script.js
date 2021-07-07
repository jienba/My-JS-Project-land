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
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-06-30T17:01:17.194Z',
    '2021-07-01T23:36:17.929Z',
    '2021-07-04T10:51:36.790Z'
  ],
  currency: 'EUR',
  locale: 'pt-PT' // de-DE
};

const account2 = {
  owner: 'Jien BA',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
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
const formatMovementDate = function(date, local) {
  const calcDayPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const dayPassed = calcDayPassed(new Date(), date);
  // console.log(dayPassed);
  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} Days ago.`;

  /*const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;*/
  return new Intl.DateTimeFormat(local).format(date);


};

const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(
    locale,
    {
      style: 'currency',
      currency: currency
    }
  ).format(value);

};

const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  movs.forEach(function(mov, i) {
    const date = new Date(acc.movementsDates[i]);
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const displayDate = formatMovementDate(date, acc.locale);

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class='movements__row'>
                    <div class='movements__type movements__type--${type}'>${i + 1} ${type}</div>
                    <div class='movements__date'>${displayDate}</div>
                    <div class='movements__value'>${formattedMov}</div>
                </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((accumulate, mov) => accumulate + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = `${formatCurrency(acc.balance, acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  // labelSumIn.textContent = `${formatCurrency(incomes, acc.locale, acc.currency)}`;
  /*labelSumIn.textContent = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
*/
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumOut.textContent = `${formatCurrency(out, acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // bank rule to take only interest above 1%
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest}€`;
  labelSumInterest.textContent = `${formatCurrency(interest, acc.locale, acc.currency)}`;
};


const creatUserNames = function(accs) {
  /* Function for creating username base on accounts array*/
  accs.forEach(function(acc) {
    // Creating a new property called "username" and assign it the user owner and work with form username
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(chunk => chunk[0])
      .join('');
  });

};
creatUserNames(accounts);

const updateUI = function(acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
///////////////////////////////////////////////////
// 13. Implementing countdown
/*

const timeRemaind = new Date(0,0,0, 0,0 , 10);

setInterval(
   function() {
     let timer = +timeRemaind;
     timer --;
     console.log(new Intl.DateTimeFormat('fr-FR', { minute: 'numeric',second: 'numeric'}).format(timer));
   },
  1000,

)

*/

const startLogoutTimer = function() {
  const tick = function() {
    const minute = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${minute}:${seconds}`;

    // When 0 seconds, stop timer and logout  user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = '0';
    }
    // Decrease 1s
    time--;
  };
  // Set time to 5 min
  let time = 120;
  tick();
  // Caller the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};


//Implementing login
let currentAccount, timer;
//////////////////////////////////////////////////
// Event handlers

// Fake logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = '100';
// Experimenting API
/*

const now  = new Date();
const option = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}
const local = navigator.languages[1];
console.log(local);
labelDate.textContent = new Intl.DateTimeFormat(local, option).format(now);
*/

// Implementing login
btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === (inputLoginUsername.value.trim()));
  // console.log(currentAccount);

  if (currentAccount?.pin === +((inputLoginPin.value.trim()))) {

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = '100';
    // Create current Date and Time
    const now = new Date();
    const option = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    /*const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');*/
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, option).format(now);
    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }

});
// Transfer feature
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(receiverAcc, amount, currentAccount.balance);

  inputTransferTo.value = inputTransferAmount.value = '';
  //Transfer condition
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date());

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();

    //Update UI
    updateUI(currentAccount);

  }

});


// make a loan feature
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value).toFixed(2);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(
      () => {// Add movement
        currentAccount.movements.push(+amount);
        // Add loan date
        currentAccount.movementsDates.push(new Date().toISOString());
        // Reset timer
        clearInterval(timer);
        console.log('job done!');
        timer = startLogoutTimer();
        // Update UI
        updateUI(currentAccount);

      },
      2500
    );

  }
  inputLoanAmount.value = '';


});


// Deleting an account feature
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if (currentAccount.username === (inputCloseUsername.value).trim() && currentAccount.pin === +((inputClosePin.value).trim())) {
    const userIndex = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    inputCloseUsername.value = inputClosePin.value = '';
    //console.log(userIndex);
    // Delete account
    accounts.splice(userIndex, 1);
    // Hide UI
    containerApp.style.opacity = '0';
  }

});
// Sort movements features
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*

// 3. Converting and checking numbers
// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('23px', 10));
console.log(Number.parseInt('23px', 10));
console.log(Number.parseFloat('2.3px', 10));
console.log(Number.parseInt('2.3px', 10));

// Checking if value is a number

console.log(isFinite(20));
console.log(isFinite('20'));
console.log(isFinite(+'24'));
console.log(isFinite(23/0));
*/

///////////////////////////////////////
// 4. Math and rounding

/*

console.log(Math.sqrt(25));
console.log(25 ** 1/2);
console.log(8 ** 1/3);
console.log(Math.max(1,45,3231,545,65));
console.log(Math.min(1,45,3231,545,65));
console.log(Math.max(1,45,'3231px',545,65));
console.log(Math.PI * Number.parseFloat('24px') ** 2);
console.log(Math.ceil(Math.random() * 6));
// Let generalize random function

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randInt(1, 4 ));

//Rounding integers
const numberString = '24.9';
console.log(Math.trunc(2.9));
console.log(Math.round(2.9));
console.log(Math.ceil(2.9));
console.log(Math.floor(2.9));
console.log(Math.floor(numberString));

// Rounding decimal
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.7896).toFixed(2));

*/
/////////////////////////////////////////////////////////
// 5. The remainder operator
/*

labelBalance.addEventListener('click', function() {
  console.log('hay');
  [...document.querySelectorAll('.movements__row')]
    .forEach((row, i) => {
    if (i % 2 === 0)
      row.style.backgroundColor = 'blue';
  })

});
*/

// 7. Creating Date
/*

const now = new Date().getTime();
console.log('Now');
console.log(now);
// Working with day

const future =  new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

*/
////////////////////////////////////
// 9. Operation with dates
/*

const future =  new Date(2037, 10, 19, 15, 23);
console.log(+future);
const calcDayPassed = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 *  24)

console.log(calcDayPassed(new Date(2037, 3, 24), new Date(2037, 3, 4)));

*/

/////////////////////////////////////////////////////////
// 11.Internationalizing Number with Intl API
/*

const num = 2331.23;
const option = {
  style: 'percent',
  unit: 'celsius'
}
// console.log('Senegal:      ', new Intl.NumberFormat('fr-FR', option).format(num));
// console.log('US:      ', new Intl.NumberFormat('en-US', option).format(num));
console.log(`Germany:      ${ new Intl.NumberFormat('de-DE', option).format(num) }`);
// console.log(navigator.language, new Intl.NumberFormat(navigator.language, option).format(num));

console.log(navigator.languages);
*/

/////////////////////////////////////////
// 12.Timer setTimeout and setInterval

/*

// setTimeOut()
const ingredients = ['olives',  'epice']

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}.`),
  2500,
  ...ingredients);
console.log('Waiting...');
if (ingredients.includes('spinach')) clearInterval(pizzaTimer)

// setInterval

setInterval(
  ()=> {
    const now =  new Date();
    console.log(new Intl.DateTimeFormat(navigator.languages[1], { hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(now));
  },
  1000
)

*/






















