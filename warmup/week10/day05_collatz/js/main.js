console.log('collatz');

// Take any positive integer n. If n is even, divide it by 2 to get n / 2.
// If n is odd, multiply it by 3 and add 1 to obtain 3n + 1.
// Repeat the process indefinitely.

// version 1
const collatz = number => {
  let count = 0;
  let arr = [number];

  while( number > 1){
    if( number % 2 === 0){
      number = number/2;
    } else {
      number = (3 * number) + 1;
    }
    count++;
    arr.push(number);
  }

  console.log({count});
  console.log({arr});
};

collatz(12);
collatz(19);
collatz(27);

//version 2 - recursion
const collatz = (num, count=0, arr=[num]) => {

  if( num === 1) { //base case
    console.log({count});
    console.log({arr});
    // could also omit count as a parameter and use arr.length - 1 insteadß
    return
  }

  if( num % 2 === 0){
    num = num/2
  } else {
    num = (3 * num) + 1;
  }

  count++;
  arr.push(num);
  collatz(num, count, arr);

};

 collatz(12);
