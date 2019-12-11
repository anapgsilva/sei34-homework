// STACK IMPLEMENTATION
class Stack {
    constructor() {
      this.items = []
    }
    push(item){
      this.items.push(item)
    }
    pop(){
      return this.items.pop()
    }
    peek(){
      return this.items[this.items.length - 1]
    }
    isEmpty(){
      return this.items.length === 0
    }
}

// this function will take in a string as input
// it will return true or false based on whether the brackets are properly matched
// the valid brackets it will scan for are {}, [], and ()
// you must use a Stack in your implementation of this function
// refer to the bracket matching readMe.md for more details
function bracketMatching(input){
  let characters = input.split('');

  const isOpening = (character) => '{(['.indexOf(character) !== -1
  const isClosing = (character) => '})]'.indexOf(character) !== -1

  const openBracketIndex = (character) => '{(['.indexOf(character)
  const closeBracketIndex = (character) => '})]'.indexOf(character)

  let matches = [];

  for (let i = 0; i < characters.length; i++) {
    // Inside this loop characters[i] is the particular character inside the string you're iterating over.
    if (isOpening(characters[i])) {
      matches.push(openBracketIndex(characters[i]));
    }
    else if (isClosing(characters[i])) {

      if (closeBracketIndex(characters[i]) !== matches[matches.length-1]) {
        // matches.push(closeBracketIndex(characters[i]));
        return false;
      }
      else {
        matches.pop();
      }
    }
  }
  return true;
}


class Node{
    constructor(data, priority){
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

// This priority queue is implemented as a Linked List
// Your challenge is to implement the insert method of the priority queue
class priorityQueue{
    constructor(){
        this.head = null;
    }

    enqueue(data, priority){
        let newNode = new Node(data, priority)
        // Insert the new data into the proper place in the queue
        let currentNode = this.head;
        //if list empty
        if (this.head === null) {
          this.head = newNode;
          return this.head;
        }
        //if newNode is highest priority
        if (newNode.priority < this.head.priority) {
          newNode.next = this.head;
          this.head = newNode;
          return this.head;
        }
        //looks for the position in the queue
        while (currentNode.next !== null) {
          if (newNode.priority < currentNode.next.priority) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
            return this.head;
          }
          else {
            currentNode = currentNode.next;
          }
        }
        //if it reached the end of the queue
        if (currentNode.next === null) {
          currentNode.next = newNode;
          return this.head;
        }
        // the lowest priority number should be the head node
        // the priorities should remain in order
        // if two nodes have the same priority, put the new one first
    }
    peek(){
      return this.head;
        // return the highest priority node in the queue
    }
    dequeue(){
      // remove and return the highest priority node in the queue
      const newQueue = this.head.next;
      const topNode = this.head;
      this.head = newQueue;

      return topNode;
    }
}

module.exports = {
    bracketMatching,
    priorityQueue
}
