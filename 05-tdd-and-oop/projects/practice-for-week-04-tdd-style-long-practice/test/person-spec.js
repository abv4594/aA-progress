const chai = require('chai');
const expect = chai.expect;
const Person = require('../problems/person');

describe('Person class', function(){
    let person;
    let person2;
    let obj;
    let badObj;
    beforeEach(function() {
        person = new Person('John', 18);
        person2 = new Person('Mary', 30);
        obj = { name: 'Lulu', age: 37 };
        badObj = { notName: 'Mary', notAge: 37 };

    });
    it('Should create successfully', function() {
        expect(person).to.exist;
    });
    it('Should have name and age properties', function() {
        expect(person).to.have.all.keys('name', 'age');
    });
    it('Should set name and age properly', function(){
        expect(person.name).to.deep.equal('John');
        expect(person.age).to.deep.equal(18);
    });
    it('sayHello() should return name + greeting', function() {
        expect(person.sayHello()).to.deep.equal('John, hello!')
    });
    it('visit(otherPerson) should return person1 visited otherPerson', function() {
        expect(person.visit(person2)).to.deep.equal('John visited Mary');
    });
    it('switchVisit(otherPerson) should invoke visit passing in the current instance', function() {
        expect(person.switchVisit(person2)).to.deep.equal('Mary visited John');
    });
    context('update(Obj) incoming argument not an Object', function () {
        const noObj = 123;
        it('throw a new TypeError', function () {
            expect(()=>person.update(noObj)).to.throw(TypeError, 'Need a valid object as input');
        });
    })
    context('update(Obj receives an Object', function() {
        
        it('update instance with object correctly', function() {
        
            person.update(obj);
            expect(person.name).to.deep.equal(obj.name);
            expect(person.age).to.deep.equal(obj.age); 
        });
        it('Throw an error with message if object does not contain name and age', function() {
            expect(()=>person.update(badObj).to.throw(TypeError, 'Object needs a name (string) and age (number)'));
        });
    });
    context('Case A: update is successfully invoked', function () {
        it('tryUpdate updates instance successfully and returns true', function () {
            const result = person.tryUpdate(obj);
            expect(result).to.be.true;
            expect(person.name).to.deep.equal(obj.name);
            expect(person.age).to.deep.equal(obj.age);

        });
    });
    context('Case B: not successfully invoked', function () {
        it('Should return false', function () {
        const result = person.tryUpdate(badObj);
        expect(result).to.be.false;
    });
    });

    it('greetAll(obj) return array of string of sayHello in each Person in obj', function () {
        const obj = [person, person2];
        expect(Person.greetAll(obj)).to.deep.equal(['John, hello!', 'Mary, hello!']);
    })

});