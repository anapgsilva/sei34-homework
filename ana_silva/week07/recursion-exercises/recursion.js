// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion


function findMax(array, largest=-Infinity){
  if (array.length === 0) {
    return largest;
  }
  if (array[0] > largest) {
    largest = array[0];
  }
  return findMax(array.slice(1), largest);
}


function factorial(n){

  return (n<=1) ? 1 : n * factorial(n-1);

  // if (n === 0) {
  //   return 1;
  // }
  // return n * factorial (n-1);
    // This function returns the factorial of a given number.
}


function fibonacci(n){
  if (n === 1 || n ===2){
    return 1;
  }
  else {
    return fibonacci(n-1) + fibonacci(n-2);
  }
    // This function returns the Nth number in the fibonacci sequence.
    // https://en.wikipedia.org/wiki/Fibonacci_number
    // For this function, the first two fibonacci numbers are 1 and 1
}

function coinFlips2(n){
  let combos = [];

  const flip = function(n, currentString) {
    if (n === 0) {
      combos.push(currentString);
      // return combos;
    }
    else {
      n--;
      flip(n, currentString+"H");
      flip(n, currentString+"T");
    }
  }

  flip(n, "");
  return combos;
    // This function returns an array of all possible outcomes from flipping a coin N times.
    // Input type: Integer
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]
    // H stands for Heads and T stands for tails
    // Represent the two outcomes of each flip as "H" or "T"
}
// console.log(coinFlips2(2));

//Joel solution

function coinFlips(tosses) {

  // const combinations = [];
  const flip = (soFar="") => {
    if (soFar.length === tosses) {
      // combinations.push(soFar); // base case
      return [soFar];
    }
    else {
      const heads = flip(soFar + "H"); //recursive
      const tails = flip(soFar + "T"); //recursive
      return heads.concat(tails);
    }
  }
  return flip();
  // return combinations;
}


function letterCombinations(array){

  const add = (string, array) => {

    if (array.length === 0) {
      return [string];
    }
    else {
      const results = array.map( letter => {
        const combination = add(string + letter, array.filter( i => i !== letter));
        return combination;
        }).flat();
      return results.concat([string]);
    }
  };
  return add("", array);

    // This function returns an array of all combinations of the given letters
    // Input type: Array of single characters
    // For example, letterCombinations(["a","b","c"]) would return the following:
    // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]
}

// console.log(letterCombinations(['a','b','c']));

module.exports = {
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations
}
