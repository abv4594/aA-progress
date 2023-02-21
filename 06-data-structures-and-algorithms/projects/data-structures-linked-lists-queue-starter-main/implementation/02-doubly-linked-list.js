// Node class is implemented for you, no need to look for bugs here!
class DoublyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addToHead(val) {
        // There are bugs in this method! Fix them!!!
        // Write your hypothesis on the time complexity of this method here

        // Add node of val to head of linked list
        let newNode = new DoublyLinkedNode(val);

        if (this.length > 0) {
            this.head.previous = newNode;
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }

        this.length++;

        // time complexity O(1);
    }

    addToTail(val) {
        // Add node of val to tail of linked list
        const newNode = new DoublyLinkedNode(val);
        this.length ++;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return
        }

        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        // Write your hypothesis on the time complexity of this method here
        // time complexity is O(1);
    }

    removeFromHead() {
        // Remove node at head
        if (!this.head) return undefined;
        this.length--;

        const removedHead = this.head;

        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return removedHead.value;
        // Write your hypothesis on the time complexity of this method here
    }

    removeFromTail() {
        // Remove node at tail
        
        if (!this.tail) return undefined;
        
        if (!this.head.next) return this.removeFromHead();

        this.length --;

        const tailToRemove = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return tailToRemove.value;
        // Write your hypothesis on the time complexity of this method here
    }

    peekAtHead() {
        // Return value of head node
        if (!this.head) return undefined;
        return this.head.value;
        // time complexity is O(1)


        // Write your hypothesis on the time complexity of this method here
    }

    peekAtTail() {
        // Return value of tail node
        if (!this.tail) return undefined
        return this.tail.value;


        // Write your hypothesis on the time complexity of this method here
    }
}

module.exports = {
    DoublyLinkedList,
    DoublyLinkedNode
}
