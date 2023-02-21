class DoublyLinkedListNode {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToHead(val) {
    const newHead = new DoublyLinkedListNode(val); 
    // if there is already a head... 
    if (this.head) {
      newHead.next = this.head; // ... the present head becomes previous of new
      this.head.prev = newHead; // ... and new head becomes next of previous
    }
    this.head = newHead;  // assign head
    if (!this.tail) this.tail = newHead; // if there is no tail, head = tail
    
    this.length ++;
  
  }

  addToTail(val) {

    const newTail = new DoublyLinkedListNode(val);

    if (this.tail) {
      this.tail.next = newTail;
      newTail.prev = this.tail;
    }

    this.tail = newTail;

    if (!this.head) this.head = newTail;

    this.length ++;

  }

  // You can use this function to help debug
  print() {
    let current = this.head;

    while (current) {
      process.stdout.write(`${current.value} <-> `);
      current = current.next;
    }

    console.log("NULL");
  }
}

module.exports = DoublyLinkedList;