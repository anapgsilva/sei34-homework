console.log("hi");

const sieve = {
  list: [],
  primes: [],
  calcPrime: function(max){

    // begin with all numbers as being unmarked
    this.list = new Array(max).fill(true);

    // Initially, we use i < max but if we use j = Math.pow(currentNum, 2)
    // in the inner loop then there's no need to iterate until max
    // For example, if your max was 100, there's no need to interate past 10,
    // becuase the 10^2 is 100 and your inner loop won't run because j(100) is NOT < max(100)
    for (let i = 2; i < Math.sqrt(max); i++) {
      let currentNum = i;

      // Initially, we started with j = currentNUm + 1
      // BUT we can actually start at the square of currentNum
      // For example, when we look at 3, 6 is ready FALSE because
      // it is a multiple of 2, therefore we can start from 9 (which is the square of 3)
      for (let j = Math.pow(currentNum, 2); j < max; j++) {
        if (this.list[j] === true && j % currentNum === 0) {
          this.list[j] = false;
        }
      } // inner loop
    } // outer loop

    // console.log(this.list);

    // for (let i = 2; i < max; i++) {
    //   if(this.list[i] === true){
    //     this.primes.push(i);
    //   }
    // }

    this.primes = this.list.reduce(function(array, elem, index){
      if(index > 1 && elem === true){
        array.push(index);
      }
      return array;
    }, []); // set initial value as empty array


    return this.primes;
  }
};

console.log(sieve.calcPrime(25)); // 2, 3, 5, 7, 11, 13, 17, 23


//Solution - Jez
// SIEVE ///////////////////////////////////////////////////////////////////////

const sieve2 = function(limit) {
  let nums = [...Array(limit + 1 ).keys()].slice(2);
  let primes = [];

  while (nums.length) {
    let n = nums.shift(); //take out first element
    primes.push(n) //push to list of primes
    nums = nums.filter(m => m % n); //remove multiples from remaining nums
  }
  return primes;
};

console.log(sieve2(20));
console.log(sieve2(200));

//solution - Chris
const sieve1 = function ( rangeLimit ) {
    let range = [];
    for (let i = 2; i <= rangeLimit; i++) {
        range.push(i);
    }

    for (let i = 0; i <= range.length; i++) {
        for (let j = i + 1; j <= range.length; j++) {
            if (range[j] % range[i] === 0 ) {
                range.splice(j, 1);
                j --;
            }
        }
    }
    console.log(range);
};

sieve1(20);
