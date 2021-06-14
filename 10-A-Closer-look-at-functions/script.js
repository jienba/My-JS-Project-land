'use strict';
///////////////////////////////////////////////////
// Default Parameters
/*
const bookings = [];
const createBooking = function (flightNum, numPassengers = 1, price = 199) {
    //ES5
    //numPassengers = numPassengers || 1;
    //price = price || 1;
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking)
    bookings.push(booking);
}
createBooking('LH123');
*/

///////////////////////////////////////////////////////
// Primitives vs Refs Type
/*
const flight = 'LH123';
const  jienba = {
    name: 'Adama',
    sex: 'M',
    passport: 2323812739128
}
const checkIn = function (flightNum, passenger, sex) {
    flightNum = 'LH999';
    passenger.name = (sex.toUpperCase() === 'M' ? 'Mr. ' : 'Mrs. ')  + passenger.name;
    if (passenger.passport === 2323812739128){
        alert('Check in');
    }else
        alert('Passport wrong');
}

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000)
}

newPassport(jienba);
checkIn(flight, jienba, 'm');
console.log(flight);
console.log(jienba)

 */
/////////////////////////////////////////
//6. Function accepting callback function

/*
const oneWord =  (str) => str.replace(/ /g, '').toLowerCase();
const upperCaseFirstWorld = function (str) {
    const [first, ...other] = str.split(' ');
    return [first.toUpperCase(), ...other].join(' ')
}

// High-order function

const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
}

console.log(transformer('Javascript is the best', upperCaseFirstWorld));
console.log(transformer('Javascript is the best', oneWord));

// Callback all the time
const high5 =  () => console.log('👋')
document.body.addEventListener('click', high5);

['jienba', 'omar', 'penda'].forEach(high5)

 */
//////////////////////////////////////////////////////
// 7. Function returning another function

/*
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
    
}
*/
/*
const greet = (greeting) => {
    return (name) => console.log(`${greeting} ${name}`)
}
*/
// From john
/*
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greetingHey = greet('Hey');
greetingHey('jienba');
greetingHey('jonas');
greetingHey('naruto');

greet('Hello')('Mr. Jienba');

 */

//////////////////////////////////////////////////
// 8. The call and apply methods

/*

const lufthansa = {
    airLine: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    //book: function(){}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`);
        this.bookings.push(
            {
                flight: `${this.iataCode}${flightNum}`,
                name
            }
        )
    }
}

lufthansa.book(254, 'Jienba');
lufthansa.book(879, 'Uzumaki Naruto');


const euroWings = {
    airLine: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book

book.call(euroWings, 345, 'Sasuke Uchiwa');
book.call(euroWings, 123, 'Tsunade');
console.log(euroWings)
book.call(lufthansa, 213, 'Penda Fall');
console.log(lufthansa)


const senAir = {
    airLine: 'Senegal Airline',
    iataCode: 'SL',
    bookings: []
}

book.call(senAir, 645, 'Hatake Kakashi');

// Apply method
const flightData = [646, 'Uzumaki Minato']
book.apply(lufthansa, flightData )
book.call(senAir, ...flightData )



//My example for call and apply

const jienba = {
    name: 'Adama',
    codeName: 'kenway',
    skill: 'JSer',
    hack(){
        console.log(`My name is ${this.name} I am a ${this.skill}`)
    }
}
const omar = {
    name: 'Oumar',
    codeName: 'nianFils',
    skill: 'JSer'
}
const penda = {
    name: 'Penda',
    codeName: 'hakim',
    skill: 'IOerse'
}

jienba.hack();

const hackingMethod = jienba.hack;

hackingMethod.call(omar)



///////////////////////////////////////////////////
// 10. Bind

const bookEW = book.bind(euroWings);

bookEW(123, 'Jiraya')
bookEW(456, 'Jigen')
bookEW(789, 'Shikamaru')
console.log(euroWings)
const bookSenAir123 = book.bind(senAir, 123);
bookSenAir123('Sadio Mane');
bookSenAir123('Ousmane Sonkho');
bookSenAir123('Coumba Diop');

lufthansa.plane = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.plane ++;
    console.log(this.plane)
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

// Partial application

const addTaxe = (tax, value) => value + value * tax
const addVTA  = addTaxe.bind(null, 0.23);

console.log(addVTA(200));
console.log(addVTA(15000));

const calcVTA = (tax) => (value) =>  value + value * tax

const calTVASen = calcVTA(0.23);
console.log(calTVASen(200));
console.log(calTVASen(15000));

 */

// Coding Challenge #1

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
// This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    registerNewAnswer: function () {
        const validReplies = [0,1,2,3];
        console.log(this.question);
        for (const option of this.options) {
            console.log(option);
        }
        let reply;

        reply = Number(prompt(this.question));
        /*
        if (reply in validReplies){
            for (let i = 0; i < this.answers.length; i++) {
                reply === i && this.answers[i]++;
            }
        }else alert('Please enter a valid reply! ;)')

         */
        reply in validReplies &&  this.answers[reply]++ && alert('Please enter a valid reply! ;)')


        this.displayResults();
        this.displayResults('string');

    },
    displayResults(type = 'array'){
        if (type === 'array'){
            console.log(this.answers)
        }else if (type === 'string'){
            console.log(`Poll results are ${this.answers.join(', ')}`)
        }
    }
};


document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

const displayMethod = poll.displayResults;

displayMethod.call({answers:[5, 2, 3]});
displayMethod.call({answers:[5, 2, 3]}, 'string');
displayMethod.call({answers:[1, 5, 3, 9, 6, 1]});
displayMethod.call({answers:[1, 5, 3, 9, 6, 1]}, 'string');









