const Person = require('./person');

class Student extends Person {
  constructor(firstName, lastName, major, GPA) {
    super(firstName, lastName);
    this.major = major;
    this.GPA = GPA;
  }

  static compareGPA(std1, std2) {
    if (std1.GPA > std2.GPA) {
      return (`${std1.firstName} ${std1.lastName} has the higher GPA.`)
    } else if (std1.GPA < std2.GPA) {
      return (`${std2.firstName} ${std2.lastName} has the higher GPA.`)
    } else {
      return (`Both students have the same GPA`)
    }
  }

}

let student1 = new Student("billy", "johnson", "software-development", 3.2);
let student2 = new Student("sarah", "smith", "basket-weaving", 3.7);

console.log(student1);
console.log(student2);

console.log(Student.compareGPA(student1, student2))
// Your code here

/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

try {
  module.exports = Student;
} catch {
  module.exports = null;
}