console.log('hello');

const pairwise = ( arr, sum ) => {

  let result = 0;

  // looping from the first element
  for (let i = 0; i < arr.length; i++) {

    // looping from the second element (this means j and i will never be the same)
    for (let j = i + 1; j < arr.length; j++) {

      if(arr[i] + arr[j] === sum){
        result += i + j; // add together indices

        arr[i] = ''; //set values to empty so they won't be re-used in the next iteration
        arr[j] = ''; //could also set to NaN instead of ''
      }
    } // inner loop
  } // outer loop
  return result;
};

console.log(pairwise([7, 9, 11, 13, 15], 20)); // 6
console.log(pairwise([7, 5, 11, 5, 15], 10)); // 4
console.log(pairwise([1, 4, 2, 3, 0, 5], 7)); //11


//version 2

const pairwise2 = (arr, sum) => {

  const result = arr.reduce((acc, cur, index) => {

    let theOtherElement = sum - cur;

    // check if theOtherElement value in the rest of the array, but also make sure theOtherElement doesn't match current index
    if((arr.indexOf(theOtherElement) !== -1 ) && arr.indexOf(theOtherElement) !== index ){

      let total = index + arr.indexOf(theOtherElement);

      // set values to NaN so that they won't be reused
      arr.splice(index, 1, NaN);
      arr.splice(arr.indexOf(theOtherElement), 1, NaN);

      return acc + total; //return the running total back to reduce for the next time

    }


    return acc; // simply return previous total if no operations needed

  }, 0); //initial value is 0

  return result;

};


console.log(pairwise2([7, 9, 11, 13, 15], 20)); // 6



////////////////////solution - Jez///////////////////////////////////////
const pairwise = function(arr, target) {
  //looking for complements, fill with null to maintain indices of input array
  let complements = Array(arr.length).fill(null);
  return arr.reduce((sum, n, i) => {
    const comp = target - n;
    if (complements.includes(n)) { //found match (this number and its complement)
      const compIndex = complements.indexOf(n)
      complements[compIndex] = null; //so that we don't reuse
      return sum + i + compIndex;
    } else if (!complements.includes(comp)) { //complement not yet added
      complements[i] = comp;
    }
    return sum;
  }, 0);
};

console.log(pairwise([7, 9, 11, 13, 15], 20)); // => 6
console.log(pairwise([7, 9, 11, 13, 15, 5], 20)); // => 15
console.log(pairwise([7, 9, 11, 15, 13, 5], 28)); // => 7
console.log(pairwise([7, 9, 11, 13, 15, 9, 13], 20)); // => 6
