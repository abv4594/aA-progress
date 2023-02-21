class LinkedListNode {
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    // Your code here
    this.head = null;
    this.length = 0;
  }

  addToHead(val) {
    // Your code here
    this.head = new LinkedListNode(val, this.head);
    if (!this.tail) this.tail = this.head;
    this.length ++;
    
  }

  addToTail(val) {
    // Your code here
    const newNode = new LinkedListNode(val, null);
    if (this.tail) { // tail ja criado 
      this.tail.next = newNode;
    } else { // first element in the list 
      this.head = newNode;
    } 
    this.tail = newNode; // no matter what, the new tail is the new node
    this.length ++;

  }

  // You can use this function to help debug
  print() {
    let current = this.head;

    while (current) {
      process.stdout.write(`${current.value} -> `);
      current = current.next;
    }

    console.log("NULL");
  }
}

module.exports = LinkedList;