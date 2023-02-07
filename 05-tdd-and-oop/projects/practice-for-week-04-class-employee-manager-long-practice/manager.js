const Employee = require ('./employee');

class Manager extends Employee {
    constructor (name, salary, title, manager, employees) {
        super(name, salary, title, manager);
        if (employees) {
            this.employees = employees;
        } else {
            this.employees = [];
        }

    }


    addEmployee (employee) {
        this.employees.push(employee);
    }

    calculateBonus(multiplier) {
        
        const sumOfSubSalaries = this._totalSubSalary();

        console.log(`total subordinate salaries for ${this.name} is ${sumOfSubSalaries}`);
    
        return (sumOfSubSalaries + this.salary) * multiplier;

        
    }

    _totalSubSalary() {
        let sumSalaries = 0;

        if (this instanceof Manager) {
        
            this.employees.forEach(emp => 
                {
                if (emp instanceof Manager) {
                    sumSalaries += emp.salary + emp._totalSubSalary()}
                else {
                    sumSalaries += emp.salary }})
            
            

        } else {
            sumSalaries += this.salary;
          
        }
        return sumSalaries;
        
    }




}

module.exports = Manager;


//const splinter = new Manager('Splinter', 100000, 'Sensei');
//console.log('Before: ', splinter);
//
//const Leo = new Employee('Leonardo', 90000, 'Ninja', splinter);
//const mikey = new Employee('Michelangelo', 90000, 'Ninja', splinter);
//const donnie = new Employee('Donatello', 90000, 'Ninja', splinter);
//const raph = new Employee('Raphael', 90000, 'Ninja', splinter);
//
//console.log('After: ', splinter);