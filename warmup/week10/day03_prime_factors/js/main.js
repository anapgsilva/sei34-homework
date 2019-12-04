console.log("prime factors");

// Version 1

// const prime = {
//
//   //range of all the numbers between 2 and num
//   range: [],
//
//   //all the prime numbers within the range
//   primeRange: [],
//
//   // all the prime numbers that are also factors of the input
//   primeFactorRange: [],
//
//   getRange: function(num){
//     for (let i = 2; i <= num; i++) {
//       this.range.push(i);
//     }
//     return this.range;
//   },
//
//   getPrimeRange: function(array){
//
//     for (let i = 0; i < array.length; i++) {
//       let isPrime = true;
//
//       let potentialPrime = array[i];
//
//       for (let j = 2; j < potentialPrime; j++) {
//         if (potentialPrime % j === 0) {
//           isPrime = false;
//         }
//       }
//
//       if( isPrime === true){
//         this.primeRange.push(array[i]);
//       }
//     }
//     return this.primeRange;
//   },
//
//   getPrimeFactors: function( num ){
//     let primes = this.getPrimeRange(this.getRange(num));
//     console.log("primes", primes);
//
//     for (let i = 0; i < primes.length; i++) {
//       while (num % primes[i] === 0) {
//         this.primeFactorRange.push(primes[i]);
//         num /= primes[i];
//       }
//     }
//     return this.primeFactorRange;
//   }
// }

//console.log(prime.getPrimeFactors(60));


//Version 2

const primeFactors = num => {
  let factors = [];

  for (let i = 2; i <= num; i++) {
    console.log("i = ", i )
    while( num % i === 0){
      factors.push(i);
      console.log("   found factor", i, "prime numbers array", factors);
      num = num/i
      console.log(`   new number after div by ${i}:`, num);
    }
    console.log("out of while loop, now testing i <= num", i, num);
  }
  return factors;
};

console.log(primeFactors(60));


// Solutions with RECURSION :)

//////////////////// Aleks
const primeFactors = (n) => {
    const factors = [];
    const helper = (high = n) => {
        if (high === 1) return;
        let divider = 2;
        while (!(high % divider === 0 && isPrime(divider))) divider++;
        factors.push(divider);
        helper(high/divider);
    };
    helper();
    return factors;
};
const isPrime = (n) => {
    for (let i = 2; i < n; i++) if (n%i === 0) return false;
    return n > 1;
};


/////////////////////// Jez
const primeFactors = (n, f=2, factors=[]) => {
  if (n === 1) {
    return factors
  }
  if (n % f === 0) {
    factors.push(f)
    return primeFactors(n/f, f, factors)
  } else {
    return primeFactors(n, f + 1, factors)
  }
};
