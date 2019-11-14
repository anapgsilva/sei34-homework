// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function findMax(array){
  // This function returns the largest number in a given array.
  let max;
  let n = array.length;

  function compare(a,b) {
    if (a >= b) {
      max = a;
    } else {
      max = b;
    }
    return max;
  }

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      max = array[i];
    } else if (i < n) {
      compare(max, array[i]);
    }
  }

  return max;
}

function factorial(n){
  // This function returns the factorial of a given number.
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

function fibonacci(n){
  // This function returns the Nth number in the fibonacci sequence.
  // https://en.wikipedia.org/wiki/Fibonacci_number
  // For this function, the first two fibonacci numbers are 1 and 1
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function coinFlips(n){
  // This function returns an array of all possible outcomes from flipping a coin N times.
  // Input type: Integer
  // For example, coinFlips(2) would return the following:
  // ["HH", "HT", "TH", "TT"]
  // H stands for Heads and T stands for tails
  // Represent the two outcomes of each flip as "H" or "T"
  if (n === 1) {
    return ["H","T"];
  } else {
    let result = [];
    arr1 = ["H","T"];
    arr2 = coinFlips(n - 1);
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        result.push(arr1[i]+arr2[j]);
      }
    }
    return result;
  }
}

function letterCombinations(arr){
  // This function returns an array of all combinations of the given letters
  // Input type: Array of single characters
  // For example, letterCombinations(["a","b","c"]) would return the following:
  // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]
  if (arr.length === 1) {
    return arr;
  } else {
    let result = arr;

    for (let i = 0; i < arr.length; i++) {
      const adder = arr[i];
      const otherLetters = arr.filter( x => x !== adder);
      console.log( otherLetters );
      otherLetters.forEach(letter => { result.push( adder + letter ) });


    }

    return result;
  }
}

console.log( letterCombinations( ['a','b','c'] ));

module.exports = {
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations
}
