'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Jien BA',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Penda Fall',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: 'Oumar Niang',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
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

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class='movements__row'>
                    <div class='movements__type movements__type--${type}'>${i + 1} ${type}</div>
                    <div class='movements__value'>${mov}€</div>
                </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplayBalance = function(acc) {

  acc.balance = acc.movements.reduce((accumulate, mov) => accumulate + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  /*labelSumIn.textContent = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
*/
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // bank rule to take only interest above 1%
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

//Implementing login
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === (inputLoginUsername.value.trim()));
  // console.log(currentAccount);

  if (currentAccount?.pin === Number((inputLoginPin.value.trim()))) {

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    // Display movements
    displayMovements(currentAccount.movements);
    // Display balance
    calcDisplayBalance(currentAccount);
    // Display summary
    calcDisplaySummary(currentAccount);
  }

});
// Transfer feature
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(receiverAcc, amount, currentAccount.balance);

  inputTransferTo.value = inputTransferAmount.value = '';
  //Transfer condition
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //
    updateUI(currentAccount);
  }

});


// make a loan feature
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

});


// Deleting an account feature
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if (currentAccount.username === (inputCloseUsername.value).trim() && currentAccount.pin === Number((inputClosePin.value).trim())) {
    const userIndex = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    inputCloseUsername.value = inputClosePin.value = '';
    //console.log(userIndex);
    // Delete account
    accounts.splice(userIndex, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }

});
// Sort movements features
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


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

/*const eurToUsd = 1.1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsUSD = movements
  .filter(mov => mov < 0)
  .map((mov , index, array)=>{
    console.log(array);
    return mov * eurToUsd
  } )
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);*/

//////////////////////////////////////////////////////////////
// 16. Coding Challenge #3

/*Test data:
  Data 1: [5, 2, 4, 1, 15, 8, 3]
  Data 2: [16, 6, 10, 5, 6, 1, 4]*/
/*
const calcAverageHumanAge = ages => {
  return  ages
    .map(dogAge => dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge)
    .filter(dogHumaneAge => dogHumaneAge >= 18)
    .reduce((accumulator, adultAgeDog, i, arr) => accumulator + adultAgeDog / arr.length, 0 )
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

 */

//////////////////////////////////////////////////////////////////
// 17. Find method
/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdraw = movements.find(mov => mov < 0 );
console.log(firstWithdraw);

const account  = accounts.find(acc => acc.owner === 'Jien BA')

const account22 = accounts.filter(acc => acc.owner === 'Jien BA')
console.log(account);
console.log(account22);

*/
///////////////////////////////////////////////////////////
// 21. Some and every method

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const doesHaveDeposit = movements.some(mov => mov > 0);
console.log(doesHaveDeposit);*/

/////////////////////////////////////////////////////////////
// 22. flat and flatMap
/*

const arr = [1,2,3,[4,5], [6,7,8], 9]

console.log(arr.flat());

const arrDeep = [1,[2,3,[4,5,6,], [7,8,9]]]
console.log(arrDeep.flat(2));

// flat
const overAllBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0)

console.log(overAllBalance);
const overAllBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)
console.log(overAllBalance2);

*/

/////////////////////////////////////////////////////////////
//23. Shorting
//
// // Strings
// const owners = ['Jienba', 'Penda', 'Oumar', 'Jonas']
// console.log(owners.sort());
//
// // Numbers
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const numbers = [1,3,50,6000,2,900,8]
// // return > 0 b,a (switch the order)
// // return < 0 a,b (keep the order)
//
// // Ascending order
// console.log(numbers.sort((a,b) => {
//   if (a > b)
//     return 1
//   if (a < b)
//     return -1
// }));
//
// // Let improve this
// console.log('------------Improve------------');
// console.log(numbers.sort((a,b) => a - b));
// console.log(numbers.sort((a,b) => a - b));
// console.log('------------Improve------------');
//
//
// // Descending order
// console.log(movements.sort((a,b) => {
//   if (a > b) return -1
//   if (a < b) return 1
// }));
//
// console.log(movements.sort((a,b) => b - a))
//

/////////////////////////////////////////////////////
// 24. fill method
/*

const arr = [1,2,3,4,5,6,7,8,9]

//Empty array + fill method

const x = new Array(7);
x.fill(5,1);
console.log(x);


// Array.from()

const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length :7}, (_, i) => i + 1);
console.log(z);

const diceRandomArrays = Array.from({length: 100}, () => Math.ceil(Math.random() * 6))
console.log(diceRandomArrays);

labelBalance.addEventListener('click', () =>{
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);
})
*/

/////////////////////////////////////////////////////////////////
// Coding Challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// TODO 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));
console.log(dogs);
//TODO 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose)
dogs.forEach(dog => {
  if (dog.owners.includes('Sarah')){
    if (dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10) ){
      console.log("Sarah's dog eat recommended portion of foods");
    }else  if (dog.curFood > dog.recommendedFood )
      console.log("Sarah's dog over eat");
    else
      console.log("Sarah's dog under eat");

  }

})

// Correction
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`Sarah's god is eating too ${sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'} `);

//TODO 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
const ownerEatTooMuch = dogs.filter(dog => dog.recommendedFood > dog.curFood).flatMap(dog => dog.owners);
console.log(ownerEatTooMuch);
const ownersEatTooLittle = dogs.filter(dog => dog.recommendedFood < dog.curFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// TODO 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
console.log(`${ownerEatTooMuch.join(' and ')} 's dog eat too much!'`)  ;
console.log(`${ownersEatTooLittle.join(' and ')} 's dog eat too little!'`)  ;

// TODO 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
console.log(dogs.some(dog => dog.recommendedFood === dog.curFood));

//TODO 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
const checkOkEating = dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)
console.log(dogs.some(checkOkEating));
// TODO 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
const dogOKFood = dogs.filter(checkOkEating);
console.log(dogOKFood);
//TODO 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
const arrAscPortion = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood );
console.log(arrAscPortion);



