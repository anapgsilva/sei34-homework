// function bubbleSort(array) {
//
//     let swapHappened = true;
//
//     // Make some sort of loop that keeps happening if there were any swaps
//     // that happened this turn
//     while (swapHappened) {
//       // reset swapHappened to false each time so we can detect if a swap
//       // happened in this specific iteration.
//       swapHappened = false;
//       let lastIndexToCheck = array.length -1;
//       // Make another loop (inside the first one) to go through one
//       // round of swapping from the start of the list to the end
//       for (let i=0; i < lastIndexToCheck; i++) {
//         // Inside inner loop:
//         // compare each pair of elements near each other
//         // swap them if the bigger one was at a lower index.
//         if (array[i] > array[i+1]) {
//           let higherValue = array[i];
//           array[i] = array[i+1]; //copies loweer value to i
//           array[i+1] = higherValue; //copies higher value to i+1
//
//           // Make sure to keep track of whether a swap happened!
//           swapHappened = true;
//         }
//       }
//       lastIndexToCheck --;
//     }
//
//     // After both loops have exited, remember to return the array
//     return array;
// }


//JOEL SOLUTION ////////////////////////////


function bubbleSort(array) {

  let swapped = true;
  let end = array.length;

  while (swapped) {
    swapped = false;

    for (let i=0; i < end; i++) {

      if (array[i] > array[i+1]) {
        //ES6 parallel/destructuring

        [array[i], array[i+1]] = [array[i+1], array[i]];

        swapped = true;
      }
    }
    end--;
  }

  return array;
}







module.exports = bubbleSort;
