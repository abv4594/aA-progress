class DynamicArray {

  constructor(defaultSize = 4) {

    this.data = new Array (defaultSize);
    this.capacity = defaultSize;
    this.length = 0;
  
  }

  read(index) {

    return this.data[index];

  }

  push(val) {

    if (this.length === this.capacity) this.resize();

    this.data[this.length] = val;
    this.length ++;

  }


  pop() {

    if (this.length === 0) return undefined;
    const el = this.data[this.length - 1];
    this.length --;
    return el;

  }

  shift() {

    if (this.length === 0) return undefined;

    const el = this.data[0];

    for (let i = 0; i < this.length - 1; i ++) {
      this.data[i] = this.data[i + 1];
    }

    this.length --;

    return el;

  }

  unshift(val) {

    if (this.length === this.capacity) this.resize();

    for (let i = this.length; i > 0; i --) {
      this.data[i] = this.data[i - 1];
    }

    this.data[0] = val;
    this.length ++;


  }

  indexOf(val) {

    for (let i = 0; i < this.length; i ++) {
      if (this.data[i] === val) return i;
    }

    return -1;

  }

  resize() {

    const newData = new Array (this.capacity * 2);
    this.capacity *= 2;

    //copy:
    for (let i = 0; i < this.length; i ++) {
      newData [i] = this.data[i];
    }

    this.data = newData;
    
  }

}


module.exports = DynamicArray;