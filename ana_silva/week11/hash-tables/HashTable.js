class Node {
  constructor(key, value) {
    // should have a property called "data" that stores key and value in an array: [key, value]
    // should have a reference to the next node called "next", initialized to null
    this.data = [key, value];
    this.next = null;
  }

  get key() {
    // return the actual key from the data property
    return this.data[0];
  }

  get value() {
    // return the actual value from the data property
    return this.data[1];
  }
}

// note: this is a simpler LinkedList class than in the Linked List lesson
class LinkedList {
  constructor(){
    // initialize a "head" property to null
    this.head = null;
  }

  add(key, value){
    // create a new Node with the given data as its data property
    // if this list's head is null make that node the head,
    // otherwise add it to end of the list
    const node = new Node (key, value);
    let currentNode = this.head;

    if (this.head === null) {
      this.head = node;
      return this.head;
    }

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    if (currentNode.next === null) {
      currentNode.next = node;
    }
    return node;
  }

  delete(key){
    // search the list for a node whose data has a key that matches the key parameter
    // remove it from the list and return it
    // if no such node exists, return false
    let currentNode = this.head;

    if (this.head.key === key) {
      let nodeToRemove = this.head;
      this.head = this.head.next;
      return nodeToRemove;
    }

    while (currentNode.next !== null && currentNode.next.key !== key){
      currentNode = currentNode.next;
    }
    console.log('currentNode', currentNode);
    console.log('key', key);
    // console.log('currentNode.next.data[0]', currentNode.next.data[0]);
    if (currentNode.next !== null && currentNode.next.key === key) {
      let nodeToRemove = currentNode.next;
      currentNode.next = currentNode.next.next;
      console.log('nodeToRemove', nodeToRemove);
      return nodeToRemove;
    } else {
      console.log('this is false');
      return false;
    }
  }

  search(key){
    // searches the list for a given key
    // if it is found, return it
    // if not, return false
    let currentNode = this.head;

    while (currentNode !== null && currentNode.key !== key){
      currentNode = currentNode.next;
    }
    if (currentNode !== null && currentNode.key === key) {
      return currentNode;
    } else {
      return false;
    }
  }
}





class HashTable {
  constructor(size) {
    // initialize table size - prime number size is recommended to avoid clustering
    let tableSize = size;

    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

    if (!primes.includes(size)) {
      for (let i = 0; i < primes.length; i++) {
        if (primes[i] > size) {
          tableSize = primes[ i-1 ];
          break;
        }
      }
      tableSize = primes[ primes.length - 1 ];
    }

    // intialize the table to have "size" number of elements, set to null
    // the table will be an array named "table"
    this.table = new Array(tableSize);
    this.table.fill(null);
  }

  hash(key) {
    // calculate and return an integer value based key, like in the lesson
    // remember, if you are using modulus, it is recommended to use a prime number to avoid clustering
    let keyStrings = key.toLowerCase().replace(/\s/g, "").split('');
    //get the length of the table - shoudl be prime number
    let prime = this.table.length;

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const keyNumbers = [];
    for (let string in keyStrings) {
      keyNumbers.push(letters.indexOf(keyStrings[string])+1)
    }

    let index = keyNumbers.reduce( (acc, cur) => {
      return acc + cur;
    }, 0);

    index = index % prime;
    while (index !== 0 && index > prime) {
      index = index % prime;
    }

    return index;
  }




  insert(key, value) {
    // hash the key to get an integer index
    const index = this.hash(key)
    // if there's no linked list at that index in the table
      // create one and add it
      // and insert this key value pair into the new Linked list
    let list = new LinkedList();
    let node = list.add(key, value);

    if (this.table[index] === null) {
      this.table[index] = list;
    }

  // if there's a linked list at that index
    // if a node already exists with the key, update it the data in that node to store the new value
    else if (this.table[index] !== null) {
      list = this.table[index];

      if (list.search(key)) {
        node = list.search(key);
        node.value = value;
      }
      // otherwise
        // add a new node with the given value to the end of the linked list
      else {
        list.add(key, value);
      }
    }
    // for the convenience of the user, you might wish to return the node, or you can just return true
    return node;
  }

  delete(key) {
    // lookup the key (i.e. hash it to get an index)
    const index = this.hash(key);
    // if the key is, in fact, in the linked list, delete that Node and return it
    // if the key wasn't found return -1

    if (this.search(key) === -1) {
      return -1;
    }
    else {
      const list = this.table[index];
      const result = list.delete(key);
      if (result !== false){
        return result;
      }
      else {
        return -1;
      }
    }
  }

  search(key) {
    // hash key to get index
    const index = this.hash(key);
    // search the linked list at the index
    const list = this.table[index];
    //initialize result
    let result;

    if (list !== null) {
      result = list.search(key);
    } else {
      return -1;
    }

    if (result !== false) {
      return result;
    } else {
      return -1;
    }
  }

}


module.exports = {
  Node,
  LinkedList,
  HashTable
}
