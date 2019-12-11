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
    // for char in input

    let brackets = input.replace(/[^\{\}\[\]\(\)]/gi, "").split('')
    const pair = { "(":")", "{":"}", "[":"]" }
    let test = new Stack()
    for (let i of brackets) {
        if (i in pair) {
            test.push(pair[i])
        } else if (test.peek() === i){
            test.pop()
        } else {
            return false
        }
    }
    return test.isEmpty ? true :  false
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
        const node = new Node(data, priority)
        if (!this.head) return this.head = node
        let temp = this.head
        if (this.head.priority >= priority){
            node.next = this.head
            this.head = node
            return
         }
        while (temp.next){
            if (temp.next.priority >= priority) {
                node.next = temp.next
                temp.next = node
                return
            }  else {
                temp = temp.next
            }
        }
        return temp.next = node

        // Insert the new data into the proper place in the queue
        // the lowest priority number should be the head node
        // the priorities should remain in order
        // if two nodes have the same priority, put the new one first
    }
    peek(){
        // return the highest priority node in the queue
        return this.head
    }

    dequeue(){
        // remove and return the highest priority node in the queue
        const node = this.head
        this.head = node.next
        return node
    }
}

module.exports = {
    bracketMatching,
    priorityQueue
}
