// Basic implementation of Nodes and Linked List for you to use

class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(head = null) {
        this.head = head;
    }

    addToTail(val) {
        let newNode = new SinglyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            return this.head;
        }

        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }

        curr.next = newNode;
        return this.head;
    }

    listLength() {
        // Returns the length of the list
        if (!this.head) return 0;
        let len = 0;
        let curr = this.head;
        while (curr) {
            len ++;
            curr = curr.next;
        }
        return len
        // Implement in O(n) and in O(1) time complexity
        // above is O(n)
        // for O(1) we would have to create a length property in 
        // the class and update it as we add/remove nodes.
    
    }

    sumOfNodes() {
        if (!this.head) return 0;
        let sum = 0;
        let curr = this.head;
        while (curr) {
            sum += curr.value;
            curr = curr.next;
        }
        return sum;


        // Write your hypothesis on the time complexity of this method here
        // time complexity is O(n)
    }

    averageValue() {

        if (!this.head) return 0;

        return this.sumOfNodes()/this.listLength();

        // Write your hypothesis on the time complexity of this method here
        // time complexity is O(n). Sum of nodes has O(n), listLength also O(n).
        // this makes 2n but we disregard coeficients, so O(n)
    }

    findNthNode(n) {
        if (!this.head) return null;
        let curr = this.head;
        for (let i = 0; i < n; i ++) {
            if (!curr.next) return null
            curr = curr.next;
        }
        return curr

        // Write your hypothesis on the time complexity of this method here
        // time complexity O(n)
    }

    findMid() {

        const mid = Math.floor((this.listLength() -1) / 2);
        return this.findNthNode(mid);


        // Implement this as a singly linked list then as a doubly linked list
            // How do the implementation for singly and doubly vary if at all?

        // Write your hypothesis on the time complexity of this method here
        // time complexity is O(n)
        // A reverse linked list would help in terms of complexity
    
    }

    reverse() {
        if (!this.head) return null;
        if (!this.head.next) return this;
        let curr = this.head;
        let newCurr = new SinglyLinkedNode(curr.value); // will hold copy of current
        let newNextCurr; // will hold copy of next to current
        
        while (curr.next) {  
            newNextCurr = new SinglyLinkedNode(curr.next.value); // copy of next
            newNextCurr.next = newCurr; // reverse linking
            newCurr = newNextCurr; // points newCurr to next
            curr = curr.next; // points curr to next in the original list
        }
        
        
        const reversed = new SinglyLinkedList(newNextCurr);
        return reversed;
        // Write your hypothesis on the time complexity of this method here
        // time complexity is O(n)
    }

    print() {
       let curr = this.head;
        while (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
     
    }


    reverseInPlace() {
   
        let prev = this.head;
        let curr = this.head.next;
        let nextCurr = curr.next;
        this.head.next = null;
        while (curr) {
            // reverses
            curr.next = prev;
            
            // move the pointers:
            prev = curr;
            curr = nextCurr;
            if (nextCurr) nextCurr = nextCurr.next;
        }
        this.head = prev;
        return this;

        // Write your hypothesis on the time complexity of this method here
        // time complexity O(n)
    }
}

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
    }

    addToTail(val) {
        let newNode = new DoublyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this.head;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        return this.head;
    }

    findMid() {
        

        let right = this.tail; // rounded down so we start 
        let left = this.head;

        while (right !== left) {
            right = right.prev; // tail goes first, reflecting rounding down
            if (right === left) break; // we need to check before moving left part
            left = left.next;
        }

        return right;

        // Write your hypothesis on the time complexity of this method here

        // slight improvement since we do half the repetition: O(n/2). But still O(n).
    }

    reverse() {
        // Returns a new reversed version of the linked list

        const newDl = new DoublyLinkedList();

        let curr = this.tail;

        while (curr) {
            newDl.addToTail(curr.value);
            curr = curr.prev;
        }
        return newDl;

        // Write your hypothesis on the time complexity of this method here
        // time O(n)
    }

    reverseInPlace() {
        let edge = this.tail;
        while (edge !== this.head) {
            [edge.next, edge.prev] = [edge.prev, edge.next];  
            edge = edge.next; // next now is the old prev   
        }
        [this.head, this.tail] = [this.tail, this.head];
        this.tail.next = null;

        return this;

        // Write your hypothesis on the time complexity of this method here
    }


    print() {
        let curr = this.head;
        while (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
    }
}

module.exports = {
    SinglyLinkedNode,
    SinglyLinkedList,
    DoublyLinkedNode,
    DoublyLinkedList
}
