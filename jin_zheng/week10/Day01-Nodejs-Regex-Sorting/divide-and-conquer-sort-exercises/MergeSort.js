function mergeSort(arr) {
  // YOUR CODE HERE
  if (arr.length <= 1) return arr;

  const midPoint = ~~(arr.length/2);

  const arrLeft = arr.slice(0, midPoint);
  const arrRight = arr.slice(midPoint);

  return merge(mergeSort(arrLeft), mergeSort(arrRight))


}


// HELPER FUNCTION: merge two sorted arrays
function merge(arr1, arr2) {
  var result = [];

  while (arr1.length && arr2.length) {
    if(arr1[0] <= arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift());
    }
  }

  return result.concat(arr1, arr2);
}

module.exports = mergeSort;
