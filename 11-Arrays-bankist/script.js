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
  owner: 'Jien BA',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Penda Fall',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Oumar Niang',
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

const displayMovements = function(movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                    <div class="movements__value">${mov}€</div>
                </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((accumulate, mov) => accumulate + mov, 0);
  labelBalance.textContent = `${balance}€`;
}
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  /*labelSumIn.textContent = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
*/
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    // bank rule to take only interest above 1%
    .filter((int, i, arr) =>{
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest}€`;
}

calcDisplaySummary(account1.movements)

const creatUserNames = function (accs) {
  /* Function for creating username base on accounts array*/
  accs.forEach(function (acc) {
    // Creating a new property called "username" and assign it the user owner and work with form username
    acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(chunk => chunk[0])
        .join('')
  })

}
creatUserNames(accounts);

// console.log(accounts);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// 3. Simply array method
/*
let arr = ['a', 'b', 'c', 'd', 'e']

// slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));

// splice
//console.log(arr.splice(2));
//console.log(arr.splice(-1));
console.log(arr);
console.log(arr.splice(1,4));
console.log(arr);
// reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
// Concat
const letters = arr.concat(arr2);
console.log(letters);
//////////////////////////////////
// 4. Foreach method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [index, movement] of movements.entries()) {
  movement > 0 ? console.log(`${index + 1}: You deposit ${movement}`) : console.log(`${index + 1}: You withdrew ${Math.abs(movement)}`)
}
console.log('--------ForEach--------');
movements.forEach(function(movement, index) {
  movement > 0 ? console.log(`${index + 1}: You deposit ${movement}`) : console.log(`${index + 1}: You withdrew ${Math.abs(movement)}`)
})
 */ 
/////////////////////////////////
// 5. forEach on set and map
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
// Map
currencies.forEach(function(currency,key,map) {
  console.log(`${key}: ${currency}`);
});

// set
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD', 'GBP', 'EUR']);

currenciesUnique.forEach(function(value, _, set) {
  console.log(`${value}: ${value}`);
})

 */


//////////////////////////////////////////////////////////////
// Coding Challenge #1
/*
const checkDogs = function (dogJulia, dogsKate) {
  //1. Cleaning julia array
  const juliaArrWithNoCats = dogJulia.slice();
  juliaArrWithNoCats.splice(-2);
  juliaArrWithNoCats.splice(0, 1);
  // 2. Joining correct julia array with cat array
  const allDogs = juliaArrWithNoCats.concat(dogsKate);
  //3. Looping allDogs array to distinguish  adult and puppy dogs
  allDogs.forEach(function (dogAge, i) {
    if (dogAge < 3) console.log(`Dog number 🐕 ${i + 1} is still a puppy.`)
    else console.log(`Dog number 🐶 ${i + 1} is an adult and is ${dogAge} years old.`)

  })

}
// 4. Running test
//Test data:
    //Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
    //Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const dogJulia = [3, 5, 2, 12, 7];
const kateDog = [4, 1, 15, 8, 3];

checkDogs(dogJulia, kateDog);

 */

////////////////////////////////////////////////
// 10. The map method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToFcfa = 650;
const eurToUsd = 1.1;

const movementsFcfa = movements.map(function (mov) {
  return mov * eurToFcfa
});
const movementsUsd = movements.map(mov => mov * eurToUsd )
console.log(movements);
console.log(movementsUsd);
console.log(movementsFcfa);

const movementsDescriptions = movements.map((mov, i) =>{
  return `Movement ${i + 1} : You ${mov > 0 ? 'deposited' : 'withdrew '} ${Math.abs(mov)}`
})
console.log(movementsDescriptions);
for (const movementsDescription of movementsDescriptions) {
  console.log(movementsDescription)
}

 */
//////////////////////////////////////////
//12. Filter in practice
/*
const deposits = movements.filter(mov => mov > 0)
console.log('Deposits:');
console.log(deposits);
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov)
console.log('Deposits for of loop');
console.log(depositsFor);
const withdrawals = movements.filter(mov => mov < 0)
console.log('Withdraws:');
console.log(withdrawals);

 */
////////////////////////////////////////////
//13. reduce in practice
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((accumulate, mov) => accumulate + mov, 0 );
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov

console.log(balance2)

// Max value

const max = movements.reduce((accumulate, mov) => {
  if (accumulate > mov)
    return accumulate
  else
    return mov
}, movements[0])

// Mor shorter for max
const max2 = movements.reduce((accumulate, mov) => accumulate > mov ? accumulate : mov, movements[0]);
console.log(max2);

console.log(max);

 */

//////////////////////////////////////////////////////////////
// Coding Challenge #1
/*

/*Test data:
  Data 1: [5, 2, 4, 1, 15, 8, 3]
  Data 2: [16, 6, 10, 5, 6, 1, 4]
*!/
const calcAverageHumanAge = function(ages) {
  const humanAge = ages.map(dogAge => dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge);
  console.log('Human age');
  console.log(humanAge);
  const adultDogs = humanAge.filter(dogHumaneAge => dogHumaneAge >= 18);
  console.log('Adult dogs');
  console.log(adultDogs);
  const average = adultDogs.reduce((accumulator,adultAgeDog) => accumulator + adultAgeDog, 0 ) / adultDogs.length
  return `The average human age of all adult dogs ${Math.ceil(average)}`
}

console.log([5, 2, 4, 1, 15, 8, 3]);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

//////////////////////////////////////////////////////////////
// 15. Magic of chaining methods

const eurToUsd = 1.1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsUSD = movements
  .filter(mov => mov < 0)
  .map((mov , index, array)=>{
    console.log(array);
    return mov * eurToUsd
  } )
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);















