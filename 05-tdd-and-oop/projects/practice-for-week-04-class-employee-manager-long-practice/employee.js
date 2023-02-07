
class Employee { 
    constructor(name, salary, title, manager) {
        this.name = name;
        this.salary = salary;
        this.title = title;
        if (manager) {
            this.manager = manager;
            manager.addEmployee(this)
        } else {
            this.manager = null
        }
    }

    calculateBonus(multiplier) {
        return (multiplier * this.salary);
    }



}

module.exports = Employee;

//const raph = new Employee('Raphael', 90000, 'Ninja');
//const donny = new Employee('Donatello', 85000, 'Grasshopper');
//
//console.log(raph.calculateBonus(0.25));
//console.log(donny.calculateBonus(0.15));

