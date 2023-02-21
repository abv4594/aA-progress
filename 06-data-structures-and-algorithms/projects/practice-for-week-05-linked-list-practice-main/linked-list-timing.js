const LinkedList = require('./linked-list.js');
const DoublyLinkedList = require('./doubly-linked-list.js');

/*
Construct a timing test to verify the time complexities of `addToHead` and
`addToTail` for both singly and doubly linked lists.
*/

console.log('Linked List');
console.log('-----------');
const n = 10000000;
console.log(`Will create a linked list and add ${n} elements to head and ${n} to tail`);
const start = Date.now();
const ll = new LinkedList();
for (let i = 0; i < n; i++) {
    ll.addToHead(i+1);
}
for (let i = 0; i < n; i++) {
    ll.addToTail(i+1);
}
const end = Date.now();
console.log(`Time elapsed ${end - start}`);

console.log ('==============================');

console.log('Doubly Linked List');
console.log('-----------');
console.log(`Will create a doubly linked list and add ${n} elements to head and ${n} to tail`);
const start2 = Date.now();
const dl = new LinkedList();
for (let i = 0; i < n; i++) {
    dl.addToHead(i + 1);
}
for (let i = 0; i < n; i++) {
    dl.addToTail(i + 1);
}
const end2 = Date.now();
console.log(`Time elapsed ${end2 - start2}`);