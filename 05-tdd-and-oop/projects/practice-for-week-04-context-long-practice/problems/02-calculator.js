// Your code here

class Calculator {
	constructor() {
		this.total = 0
	}
	add(num) {
		this.total += num;
		return this.total
	}

	subtract(num) {
		this.total -= num;
		return this.total;
	}

	divide(num) {
		this.total /= num;
		return this.total
	}

	multiply(num) {
		this.total *= num;
		return this.total
	}
}

const calc = new Calculator();

//console.log(calc.add(50));
//console.log(calc.substract(35));
//console.log(calc.multiply(10));
//console.log(calc.divide(5));
//console.log(calc.total);

/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

try {
	module.exports = Calculator;
} catch {
	module.exports = null;
}