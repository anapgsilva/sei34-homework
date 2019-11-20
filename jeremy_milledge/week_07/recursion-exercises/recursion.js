// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function findMax(arr, max=arr[0]) {
    if (arr.length === 0) return max;
    return findMax(arr.slice(1),  arr[0] > max ? arr[0] : max)
}


function factorial(num, i=1, total=1) {
    if (i === num + 1) return total;
    return factorial(num, i + 1, total * i)
}

function fibonacci(n, i=1, current=0, old=1){
    if (i - 1 === n) return current;
    return fibonacci(n, i + 1, current + old, current)
}

function coinFlips(n){
    // This function returns an array of all possible outcomes from flipping a coin N times.
    // Input type: Integer
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]
    // H stands for Heads and T stands for tails
    // Represent the two outcomes of each flip as "H" or "T"

    // const c = ['H','T']
    // function flip(depth, side=true, running=[], total=[]) {
    //   if (depth == 0) return arr;
    //   side == true ? arr.
    //   return side
    // }
    // let seq = []
    // for (let i = 0; i < n.length; i++) {
    //   for (let j = 0; i < c.length; i++) {
    //     array[i]
    //   }
    // }

    //one flip - possbilities
    // let flip = function(side=true, res=[]) {
    //   res.push(side)
    //   side = !side
    //   if (res.length == 2) {
    //     return res;
    //   } else {
    //     return flip(side, res)
    //   }
    // }
    // let all = []
    // let count = n
    // while(count > 0) {
    //   all.push(flip(n).map(x => x ? 'H' : 'T'))
    //   count --
    // }

    //2 flips


    // return flip()

    const combos = [];

    const flip = (soFar='') => {
      if (soFar.length === n) {
        combos.push(soFar); //base case
      } else {
        flip(soFar + 'H');
        flip(soFar + 'T');
      }
    }
    flip(n)
    return combos

}
console.log(coinFlips(5));

function letterCombinations(arr){
    // This function returns an array of all combinations of the given letters
    // Input type: Array of single characters
    // For example, letterCombinations(["a","b","c"]) would return the following:
    // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]

}

module.exports = {
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations
}
