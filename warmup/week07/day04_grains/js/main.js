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
