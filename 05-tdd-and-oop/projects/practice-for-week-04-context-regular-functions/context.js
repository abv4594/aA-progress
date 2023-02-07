function eat() {
  console.log(`${this.name} eats fish food`);
}

class Fish {
  constructor(name) {
    this.name = name;
  }

  swim() {
    console.log(this);
    console.log(`${this.name} swimming in the water`);
  }
}

const nemo = new Fish('Nemo');

/********************************* Scenario 1 *********************************/
//eat(); // undefined eats fish food


/********************************* Scenario 2 *********************************/
// nemo.eat = eat; // nemo.eat has the function now
// nemo.eat(); // Nemo eats fish food


/********************************* Scenario 3 *********************************/
//nemo.eat = eat;
//eat(); // Undefined eats fish food


/********************************* Scenario 4 *********************************/
//nemo.swim(); // Nemo swimming in the water


/********************************* Scenario 5 *********************************/
const swim = nemo.swim;
console.log(swim);
swim(); // Undefined swimming in the water 