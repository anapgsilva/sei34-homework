function binarySearch(arr, element) {
  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {

    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (arr[middleIndex] === element) {
      return middleIndex;
    } else if (arr[middleIndex] < element) {
      startIndex = middleIndex + 1;
    } else if (arr[middleIndex] > element) {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}

function recursiveBinarySearch(arr, element, start = 0, end = arr.length - 1) {
  let middle = Math.floor((start + end) / 2);
  if (start > end) {
    return -1;
  }

  if (arr[middle] === element) {
    return middle;
  } else if (arr[middle] > element) {
    return recursiveBinarySearch(arr, element, start, middle - 1);
  } else if (arr[middle] < element) {
    return recursiveBinarySearch(arr, element, middle + 1, end);
  }

}

module.exports = {
    binarySearch,
    recursiveBinarySearch
}
