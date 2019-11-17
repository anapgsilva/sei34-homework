console.log("hola");


const grains = {
  //no magic numbers
  squareMax: 64,
  grainsOnSquare: function( num ){
    return 2 ** (num - 1);
  },
  grainsOnAllSquares: function(){
    for (let i = 1; i <= this.squareMax; i++) {
      console.log(`Square ${i}: ${this.grainsOnSquare(i)}`); // some rounding occurs for big numbers
    }
  },
  totalGrainsOnBoard: function(){
    let runningTotal = 0;
    for (let i = 1; i <= this.squareMax; i++) {
      runningTotal += this.grainsOnSquare(i);
    }
    return runningTotal;
  }

};


console.log( 'Square 3:', grains.grainsOnSquare(3));

grains.grainsOnAllSquares();

console.log('Total grains on board:', grains.totalGrainsOnBoard() );


/// Jeffery's solution with underscore.js
const grains = {
  maxNoOfSquares: 64,
  calcGrainsOnASquare: function(n) {
    noOfGrains = 2 ** (n-1);
    return noOfGrains;
  },
  noOfGrainsOnEachSquare: function(n) {
    for (let i = 1; i <= n; i++) {
      console.log(`Square ${ i }: ${ 2 ** (i - 1) }`)
    }
  },
  totalGrains: function() {
    const array = [...Array(this.maxNoOfSquares).keys()].map(x => ++x)
    const grainsOnBoard = array.map(x => 2**(x-1));
    const sum = _(grainsOnBoard).reduce(function(runningTotal, n) {
      return runningTotal + n
    });
    return sum;
  }
}
console.log( grains.calcGrainsOnASquare(6) );
grains.noOfGrainsOnEachSquare(64);
console.log( grains.totalGrains() );
////
