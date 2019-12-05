//Brute search
// function binarySearch(arr, element){
//     let index = -1;
//     //  search through the array non-recursively for the element
//     for (var i = 0; i < arr.length; i++) {
//       if (arr[i] === element) {
//         index = i;
//         break;
//       }
//     }
//     //  if the element is not found, return -1
//     return index;
//     //  if the element is found, return the index at which it was found
// }


//Brute search
// function recursiveBinarySearch(arr, element){
//     //  search through the array recursively for the element
//     //  you may need to add more parameters to this function!
//     //  if the element is not found, return -1
//     //  if the element is found, return the index at which it was found
//     let searchIndex = 0;
//
//     const search = () => {
//       if ( arr.length === searchIndex ) {
//         searchIndex = -1;
//         return searchIndex;
//       }
//       else {
//         if (arr[searchIndex] === element) {
//           return searchIndex;
//         }
//         else {
//           searchIndex++;
//           search(searchIndex);
//         }
//       }
//     }
//     search();
//     return searchIndex;
// }



function binarySearch(haystack, needle){
    let start = 0;
    let end = haystack.length - 1;
    let midpoint = Math.floor( (start + end) /2);

    while (haystack[midpoint] !== needle && start < end) {
      if (needle < haystack[midpoint]) {
        end = midpoint - 1;
      } else {
        start = midpoint + 1;
      }
      midpoint = Math.floor( (start + end) /2);
    }
    return (haystack[midpoint] === needle) ? midpoint : -1;
}


function recursiveBinarySearch(arr,
                              element,
                              start=0,
                              end=arr.length-1,
                              midpoint = Math.floor((start + end)/2),){

  if (arr[midpoint] === element) {
    return midpoint;  //base case
  }
  if (start >= end) {
    return -1; //base case
  }
  if (element > arr[midpoint]) {
    start = midpoint + 1;
  } else {
    end = midpoint -1;
  }

  return recursiveBinarySearch(arr, element, start, end);
}


module.exports = {
    binarySearch,
    recursiveBinarySearch
}
