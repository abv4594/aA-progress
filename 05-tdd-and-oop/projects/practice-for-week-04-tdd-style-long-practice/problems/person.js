class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return this.name + ', hello!';
  }

  visit(person) {
    return this.name + ' visited ' + person.name;
  }

  switchVisit(person) {
    return person.visit(this);
  }

  update(obj) {
    if (typeof(obj) !== 'object') {
      throw new TypeError('Need a valid object as input');
    } 
    if (!('name' in obj) && !('age' in obj))
     {
      throw new TypeError('Object needs a name (string) and age (number)');
      } 
    this.name = obj.name;
    this.age = obj.age;
  }

  tryUpdate(obj) {

    try {
      this.update(obj);
      return true;
    } catch (e) {
      return false;
    }

  }

  static greetAll(obj) {
    const greetings = [];
    obj.forEach(element => {
      greetings.push(element.sayHello());
    });
    return greetings;
  }



}




module.exports = Person;