class Node{
    constructor(data){
      // a Node starts with a given data property
      // a Node also has a .next property initialized as null
      this.data = data;
      this.next = null;
    }
}

class LinkedList{
    constructor(){
        // a Linked List starts with a "head" property intialized as null
        this.head = null;
    }

    //additional helper method to find the last Node and the Node before last
    findLast(last, previous) {
      if (last.next === null) {
        return [last, previous];
      }
      else {
        if (last.next !== null) {
          return this.findLast(last.next, last); //recursion
        }
      }
    }

    appendNode(data){
        // creates a new node with the given data and adds it to back of the list
        const node = new Node( data );
        //if list empty, adds at the head
        if (this.head === null) {
          this.head = node;
          return this.head;
        }
        else { //otherwise finds the last Node
          let lastNodes = this.findLast(this.head);//array [last Node, Node before last]
          lastNodes[0].next = node;
          return this.head;
        }

    }

    prependNode(data){
        // creates a new node with the given data and adds it to the front of the list
        const node = new Node( data );
        node.next = this.head; //saves all the list to next
        this.head = node; //makes new node the head
    }

    pop(){
        // removes the last node from the list and returns it
        const lastNodes = this.findLast(this.head);//array of Nodes [last, previous]
        const nodeToRemove = lastNodes[0];
        if (lastNodes[1]) {
          lastNodes[1].next = null;
        } else {
          this.head = null; //in case there is only 1 node, there is no previous Node (undefined)
        }
        return nodeToRemove;
    }

    removeFromFront(){
        // remove the head node from the list and return it
        let head = this.head;
        // the next node in the list is the new head node
        this.head = this.head.next;
        return head;
    }

    insertAt(X, data){
        // insert a new node into the list with the given data
        let newNode = new Node( data );
        let cycle = 1;
        let node = this.head;
        // insertAt(0, 7) would add the new node as the head
        if (X === 0) {
          this.prependNode(data);//reusing function
          return;
        }
        else {
          // place it after X nodes in the list
          //we stop at the parent node where we want to insert new node
          while (cycle < X) {
            // if X exceeds the bounds of the list, put the node at the end
            if (node.next === null) {
              node.next = newNode;
              return;
            }
            else {
              node = node.next;
              cycle++;
            }
          }
        }
        //when we reach the X node
        let nextNode = node.next; //temporary variable
        node.next = newNode; //insert new node
        newNode.next = nextNode; //getting variable back
        return this.head;
    }

    removeAt(X){
        let nodeToBeRemoved;
        // remove the Xth node from the list, considering 0 to be the first node
        if (X === 0) {
          return this.removeFromFront();
        }
        else {
          let cycle = 1;
          let node = this.head;
          //stop at the parent node of the one to be removed
          while (cycle < X) {
            node = node.next;
            cycle++;
          }

          nodeToBeRemoved = node.next; //child of the node where we are is the one that needs to be removed
          let nextNode = nodeToBeRemoved.next;
          node.next = nextNode;
        }
        // return the node that has been removed
        return nodeToBeRemoved;
    }

    search(data){
      //initialize index and node
      let cycle = 0;
      let node = this.head;

      const findNode = (data) => {
        // searches the list for a node with the given data
        if (node.data === data) {
          return cycle; //if it is found, return the "index" of the node, considering 0 to be the first node
        }
        else if (node.next === null) {
          return false;   // if not found, return false
        }
        else {
          node = node.next;
          cycle += 1;
          return findNode(data); //recursion
        }
      }
      return findNode(data);
    }

    sort(){
      // sort the Linked List in ascending order of data values
      let unsortedList = this.head.next; //make copy of this.head
      let startingNode = this.removeAt(0);
      startingNode.next = null;
      this.head = startingNode;
      let cycle = 0;

      const findNodeToInsert = (sorted, data) => {
        // searches the list for a node with the given data
        if (sorted === null || data < sorted.data) {
          return cycle; //if it is found, return the "index" of the node, considering 0 to be the first node
        }
        else {
          sorted = sorted.next;
          cycle += 1;
          return findNodeToInsert(sorted, data); //recursion
        }
      }

      while (unsortedList !== null) {
        cycle = 0;
        let currentNode = unsortedList;
        //find index in newList to insert a node
        const index = findNodeToInsert(this.head, currentNode.data);
        //insert node at node X
        this.insertAt(index, currentNode.data);
        unsortedList = unsortedList.next;
      }
      return this.head;
    }
}

module.exports = {
    Node,
    LinkedList
}
