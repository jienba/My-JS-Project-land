'use strict';
/*

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

*/
////////////////////////////////////////////
// 10. ES6 Classes
/*


class PersonCl {
    constructor(fullname, birthYear) {
        this.fullname = fullname;
        this.birthYear = birthYear;
    }

    calcAge(){
        console.log(2021 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullname}`);
    }

    get age() {
        return 2021 - this.birthYear
    }

    set fullname(name){
        name.includes(' ') ? this._fullname = name : alert(`${name} is not a full name!`);
    }

    get fullname(){
        return this._fullname;
    }

}

const jienba = new PersonCl('Adama Dieng', 1997)

PersonCl.prototype.cry = function () {
    console.log('😭 😭 😭 😭');
}

jienba.calcAge();
console.log(jienba.age);
jienba.fullname = 'Adama BA';
console.log(jienba.fullname);

jienba.cry();
jienba.greet();
console.log(jienba.__proto__ === PersonCl.prototype);


*/

////////////////////////////////////////////
// 11. Getters and Setters
/*

const account = {
    owner: 'Jienba',
    movements: [200, 530, 120, 300],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        this.movements.push(mov);
    }
}

*/

/////////////////////////////////////////////
// 12. Static method

class PersonCl {
    constructor(fullname, birthYear) {
        this.fullname = fullname;
        this.birthYear = birthYear;
    }

    // Instance method
    calcAge(){
        console.log(2021 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullname}`);
    }

    get age() {
        return 2021 - this.birthYear
    }

    set fullname(name){
        name.includes(' ') ? this._fullname = name : alert(`${name} is not a full name!`);
    }

    get fullname(){
        return this._fullname;
    }
    // Static method
    static hey(){
        console.log('Hey there');
    }

}


const Person = function (firstName, birthYear) {
    console.log(this)
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Don't use do this
    // this.calcAge = function () {
    //     console.log(2021 - this.birthYear)
    // }
}

Person.hey = function () {
    console.log('Hey there ✋')
}

const jienba = new Person('Adama', 2045);
const jienbazumaki = new PersonCl('Adama BA', 2045);
console.log(jienba)
PersonCl.hey()

Person.hey();















