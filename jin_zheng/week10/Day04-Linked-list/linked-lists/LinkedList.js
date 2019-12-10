class Node{
    constructor(value){
        // a Node starts with a given data property
        // a Node also has a .next property initialized as null
        this.data= value,
        this.next= null
    }
}

class LinkedList{
    constructor(){
        // a Linked List starts with a "head" property intialized as null
        this.head= null
    }

    getTail(){
        let temp = this.head
        while (temp.next) {
            temp = temp.next
        }
        return temp
    }

    length() {
        let temp = this.head
        if (temp == null) return 0;

        let i = 0
        for (; temp.next != null; i++) {
            temp = temp.next
        }
        return i;
    }

    get(X) {
        let temp = this.head;
        for (let i = 0; (i != X); i ++ ) {
            temp = temp.next
        }
        return temp;
    }

    appendNode(data){
        // creates a new node with the given data and adds it to back of the list
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        } else {
            const temp = this.getTail();
            temp.next = node;
        }
    }

    prependNode(data){
        // creates a new node with the given data and adds it to the front of the list
        const node = new Node(data);
        node.next = this.head
        this.head = node;
    }

    pop(){
        // removes the last node from the list and returns it
        if (!this.head.next) {
            const node = this.head;
            this.head = null
            return node
        }

        let secondLast = this.head
        while (secondLast.next.next) {
            secondLast = secondLast.next
        }
        const node = secondLast.next;
        secondLast.next = null
        return node
    }

    removeFromFront(){
        // remove the head node from the list and return it
        // the next node in the list is the new head node
        const node = this.head
        this.head = this.head.next
        return node

    }
    insertAt(X, data){
        // insert a new node into the list with the given data
        // place it after X nodes in the list
        // if X exceeds the bounds of the list, put the node at the end
        // insertAt(0, 7) would add the new node as the head
        let node = new Node(data)
        if (X === 0) {
            node.next = this.head
            this.head = node
            return
        }

        let temp = this.head
        for (let i = 0; (i != X - 1) && temp.next != null; i ++ ) {

            temp = temp.next
        }

        node.next= temp.next
        temp.next = node

    }
    removeAt(X){
        // remove the Xth node from the list, considering 0 to be the first node
        // return the node that has been removed
        let node;
        if (X === 0) {
            node = this.head
            this.head = this.head.next
            return node
        }

        let temp = this.head
        for (let i = 0; (i != X - 1); i ++ ) {
            temp = temp.next
        }

        node = temp.next
        temp.next = temp.next.next
        return node
    }

    search(data){
        // searches the list for a node with the given data
        // if it is found, return the "index" of the node, considering 0 to be the first node
        // if not, return false
        if (!this.head) return false
        let i = 0
        let temp = this.head
        while (temp.data !== data) {
            temp = temp.next
            i ++
            if (!temp) return false
        }
        return i
    }

    sort(){
        // sort the Linked List in ascending order of data values
        const length = this.length();
        for (let i = 1; i <= length; i++) {
            let value = this.get(i).data
            let j = i-1
            for (j; j >= 0 && this.get(j).data > value; j--) {
                this.insertAt(j, this.removeAt(j+1).data)
            }
            this.get(j+1).data = value
        }
        return;
    }



}






module.exports = {
    Node,
    LinkedList
}
