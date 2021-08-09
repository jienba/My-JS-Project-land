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
