function binarySearch(arr, element){
    //  search through the array non-recursively for the element
    //  if the element is not found, return -1
    //  if the element is found, return the index at which it was found
    if (arr.length === 0) return -1
    let midPoint = ~~(arr.length/2);
    let offset = midPoint;

    while (true) {
        if (arr[midPoint] === element) {
            return offset;
        } else if (arr.length === 1) {
            return -1
        }

        let factor = 1;
        if (arr[midPoint] < element) {
            arr = arr.slice(midPoint);
        } else {
            arr = arr.slice(0,midPoint);
            factor = -1
        }

        midPoint = ~~(arr.length/2);
        arr.length === 1 ? offset += 1*factor : offset += midPoint*factor;
    }
}


function recursiveBinarySearch(arr, element){
    //  search through the array recursively for the element
    //  you may need to add more parameters to this function!
    //  if the element is not found, return -1
    //  if the element is found, return the index at which it was found

    if (arr.length === 0) return -1
    let midPoint = ~~(arr.length/2);

    if (arr[midPoint] < element) {
        result = recursiveBinarySearch(arr.slice(midPoint+1), element)
        if (result === -1 ) return -1
        return  result + midPoint + 1
    } else if (arr[midPoint] > element) {
        result = recursiveBinarySearch(arr.slice(0, midPoint), element)
        if (result === -1 ) return -1
        return midPoint - (midPoint- result)
    } else {
        return midPoint
    }
}

module.exports = {
    binarySearch,
    recursiveBinarySearch
}
