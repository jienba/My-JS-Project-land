'use strict';

const Person = function (firstName, birthYear) {
    console.log(this)
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Don't use do this
    // this.calcAge = function () {
    //     console.log(2021 - this.birthYear)
    // }
}

//Step behind the scene using constructor function
// 1. A new empty object created {}
// 2. function is called and 'this' refer to the new object created
// 3. the object is linked to a prototype
// 4. The function is returned

const jienba = new Person('Adama', 1997);
const ndeye = new Person('Ndiouck', 2002);

// Prototype
Person.prototype.calcAge = function () {
        console.log(2021 - this.birthYear)
    }
console.log(jienba instanceof Person);
console.log(Person.prototype);
console.log(jienba.__proto__ ===Person.prototype );

jienba.calcAge();
ndeye.calcAge();
Person.prototype.species = 'Homo Sapiens';

console.log(jienba.species);

console.log(jienba.__proto__);

// Object.prototype (top of prototype chain)
console.log(jienba.__proto__.__proto__);
console.log(jienba.__proto__.__proto__.__proto__);

// Coding Challenge #1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h.`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Ferrari', 95);
const car3 = new Car('Lamborghini', 230);

car1.accelerate();
car2.brake();
car3.accelerate();










