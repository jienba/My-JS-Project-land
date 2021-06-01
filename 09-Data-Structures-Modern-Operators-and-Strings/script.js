'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    // Third enhancement with computing the name of property
    [weekdays[3 + 1]]: {
        open: 11,
        close: 23,
    },
    [weekdays[5]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
}

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours,

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },
    orderDelevery ({starterIndex = 1, mainIndex, time = '20:00', address}) {
        console.log(`Ordered received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`)
    },
    orderPasta (ing1, ing2, ing3) {
        console.log(`Here is delicious pasta with ${ing1}, ${ing2} and ${ing3}`)
    },
    orderPizza (mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
        let message = `You've ordered pizza with ${mainIngredient}`;
        for (let i = 0; i < otherIngredients.length; i++) {
            if (i === otherIngredients.length - 1) {
                message += ` and ${otherIngredients.length - 1}`;
            } else {
                message += `, ${otherIngredients[i]}`;
            }

            console.log(message);
        }

        if (otherIngredients.length !== 0) {
        }
    }
};

//////////////////////////////////////////////////
// 12. Optional chaining

if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);
//With optional chaining
console.log(restaurant.openingHours.mon?.open)
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days ){
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    if (open !== 'closed' ){
        console.log(`On ${day} we open at ${open}`)
    }else{
        console.log(`Today is ${day} We are closed. See you next time`);
    }
}

// On Method
console.log(restaurant.order?.(0,2) || 'Method does not exists');
console.log(restaurant.orderRissoto?.(0,1) || 'Method does not exists');
// Arrays
const users = [{name: 'jienba', email:'adamjienba@techon.sn'}];
console.log(users[0]?.name ?? 'User array empty');
// Traditional way
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

//////////////////////////////////////////////////
// Rest pattern

// 1-Destructuring
/*
// Spread because on Right side of =
const arr = [1, 2, 3, ...[4,5]]

// Rest because on left side of =
const [a, b, ...other] = [1,2,3,4,5]
console.log(a);
console.log(b);
console.log(other);
console.log('////////////////////////////////////');
const [pizza, risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu ];
console.log(pizza);

console.log(risotto);
console.log(otherFood);
console.log('////////////////////////////////////');
// With objects

const { sat, ...weekdays} = restaurant.openingHours;
console.log(sat);
console.log(weekdays);

// 2- Function

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++)  sum += numbers[i]
  console.log(sum)
}

add(1,2);
add(1,2,3,4);
add(1,2,3,4,5);
add(1,2,3,4,5,6);

const x = [1,2];
add(...x);
restaurant.orderPizza('mushrooms', 'perroni', 'Algerian');
restaurant.orderPizza('mushrooms');

 */
/////////////////////////////////////////////////////
// Short circuiting
//----------------OR----------------
/*
console.log('----------------OR----------------');
console.log(3 || 'jienba');
console.log('' || 'jienba');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23)
restaurant.numGuest = 0

const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
console.log(guest1)
const guest2 = restaurant.numGuest || 10

console.log(guest2)
//---------------AND---------------
console.log('----------------AND----------------');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('hello' && 23 && null && 'jonas')

//Pratical example
console.log('Pratical example');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mashroom','onion')
}

restaurant.orderPizza && restaurant.orderPizza('mashroom','spinach')

 */
// Nullish coalescing
/*
restaurant.numGuest = 0
const guest = restaurant.numGuest || 10
console.log(guest)

// nullish: null and undefined (NOT 0 OR '')
const guestCorrect = restaurant.numGuest ?? 10;
console.log(guestCorrect);



 */


///////////////////////////////////////////////
// Spread operator
/*
const arr = [7,8,9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]

console.log(badNewArr)

// With spread operator

const goodNewArr = [1, 2, ...arr]
console.log(goodNewArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu)
// Shallow copy
const newArray = [...restaurant.mainMenu];
console.log(newArray);
// Merging array
const mergeArray = [...restaurant.starterMenu, ...restaurant.mainMenu ];
console.log(mergeArray);

const str = 'Jonas';
//const letters = [...str, 's', 'j']
const letters = [...str]

console.log(letters)

/*
const ingrediengts = [prompt("Let's make pasta! Ingreduent 1?"),
  prompt("Ingredient 2"),
  prompt("Ingredient 3")];

restaurant.orderPasta(ingrediengts[0], ingrediengts[1], ingrediengts[2]);

restaurant.orderPasta(...ingrediengts);




const newRestaurant = { ...restaurant, foundedIn: 1997, founder: 'Guiseppe'}
console.log(newRestaurant);
const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Chez Didi';
console.log(restaurant.name);
console.log(restaurantCopy.name);

 */
/*
restaurant.orderDelevery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2
});
restaurant.orderDelevery({
  mainIndex: 0,
  address: 'Yoff, APECSY II'
})

 */

/////////////////////////////////////////////
// Destructuring Object
/*

const  {name, openingHours, categories} = restaurant;
console.log(name);
console.log(openingHours);
console.log(categories);
const {name: nameRestaurant, openingHours: hours, categories: tags} = restaurant
console.log('///////////////////////////////');
console.log(nameRestaurant);
console.log(hours);
console.log(tags);
console.log('///////////////////////////////');

 */
/*
// Default value
const { menu = [], starterMenu: starters = []} = restaurant;

console.log(menu, starters)
// Mutating
let a = 123;
let b = 456;
const obj = {a: 23, b: 7};
({ a, b} = obj);

console.log(a, b)
console.log('//////////////////////////////////////');
console.log('Nesting Object destructuring');

// Nested Object
console.log(openingHours)
const {sat: {open, close} } = openingHours;
console.log(`Sathurday opening: ${open}  closing: ${close}`);



 */

/*
/////////////////////////////////////////////
// Destructuring Array
const array = [2,3,4]
const [x,,z] = array

console.log(x)
//console.log(y)
console.log(z)

let [first, ,second] = restaurant.categories;

console.log(first, second);
[first, second] = [second, first]

console.log(first, second);

const [starterOrder, mainOrder ] = restaurant.order(1, 0);

console.log(restaurant.order(1, 0));
console.log(`Your order is : ${starterOrder} and ${mainOrder}`)

const nested = [2, 4, [5,6]];

const [i, , [j,k]] = nested;
console.log(i, j, k)

// Default values
const [p = 'default', q = 'default', r = 'default'] = [3,4]

console.log(p,q,r)

 */

//Coding Challenge #1
/*
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// 1
const [players1, players2] = game.players;

console.log(players1, players2);

// 2

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers)
// 4
const player1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(player1Final);
// 5
const {team1, x:draw, team2 }  = game.odds;
console.log(team1, draw, team2);
// or
//const {odds: {team1, x: draw, team2}} = game;
//6
const printGoals = function (...scoredPlayer) {

  // Own
  const scored = game.scored;
  for (let i = 0; i < scoredPlayer.length; i++) {
    let numberOfGoals = 0
    for (let j = 0; j < scored.length; j++) {
      if (scoredPlayer[i] === scored[j]){
        numberOfGoals++;
      }
    }
    numberOfGoals > 0 ? console.log(`${scoredPlayer[i]} scored ${numberOfGoals} goal(s) `) : console.log(`${scoredPlayer[i]} have not scored`)

  }
  // Own
   // Correct chanlllenge
  console.log(`${scoredPlayer.length} were scored`);

}
printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels', 'jienba' ,'Kimmich');
team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');

 */
///////////////////////////////////////
//10. Looping array with for of
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for (const item of menu) console.log(item)
for (const [i, element] of menu.entries()){
    console.log(`${i + 1} : ${element}`)
}

 */













