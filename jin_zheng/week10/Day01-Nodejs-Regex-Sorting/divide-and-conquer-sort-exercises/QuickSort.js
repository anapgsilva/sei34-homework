function quickSort(arr){
  // YOUR CODE HERE
  if (arr.length <= 1) return arr;

  let left = [];
  let right = [];
  let result = [];
  const pivot = arr.pop();
  const length = arr.length;

  for (let i = 0; i < length; i++) {
      arr[i] <= pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  
  return result.concat(quickSort(left), pivot, quickSort(right));

}

module.exports = quickSort;
