// Node class is implemented for you, no need to look for bugs here!
class SinglyLinkedNode {
    constructor(val, next = null) {
        this.value = val;
        this.next = next;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addToHead(val) { 
        this.head = new SinglyLinkedNode(val, this.head);
        this.length ++;
        return this;

        // Write your hypothesis on the time complexity of this method here
        // time complexity O(1) - no matter length, time is constant
    
    }

    addToTail(val) {
        // There are bugs in this method! Fix them!!!
        // Write your hypothesis on the time complexity of this method here
        // Time complexity is O(n)

        // Add node of val to tail of linked list
        let newNode = new SinglyLinkedNode(val);
        this.length ++;
        if (!this.head) {
            this.head = newNode;
            return this;
        }

        
        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = newNode;
        return this;
    }

    removeFromHead() {
        if (!this.head) return undefined;
        const headToRemove = this.head;
        this.head = this.head.next;
        this.length --;
        return headToRemove;

        // Time complexity is O(1)

        // Write your hypothesis on the time complexity of this method here
    }

    removeFromTail() {
        // Remove node at tail
        if (!this.head) return undefined;

        if (this.head.next === null) { // single element;
            return this.removeFromHead();
        }

        this.length --;
        
        let curr = this.head;

        while (curr.next.next) { // time complexity O(n);
            curr = curr.next;
        }

        const tailToReturn = curr.next;
        curr.next = null;
        return tailToReturn;





        // Write your hypothesis on the time complexity of this method here
    }

    peekAtHead() {
        // Return value of head node

        if (!this.head) return undefined;

        return this.head.value;

        // Write your hypothesis on the time complexity of this method here
    }

    print() {
        // Print out the linked list

        if (!this.head) return 

        let curr = this.head;

        while (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
        
        // Write your hypothesis on the time complexity of this method here
    }
}

module.exports = {
    SinglyLinkedList,
    SinglyLinkedNode
}
