function bucketSort(items) {
    if (items.length <= 1) return items;

    let i;
    let min = Infinity;
    let max = -Infinity;
    for (i = 1; i < items.length; i++) {
        if (items[i] < min) {
            min = items[i];
        } else if (items[i] > max) {
            max = items[i];
        }
    }

    const bucketCount = ~~(items.length**0.5);
    let buckets = new Array(bucketCount).fill([]);

    const bucketSize = ~~(max-min/bucketCount) + 1

    for (i = 0; i < items.length; i++) {
        buckets[~~((items[i] - min) / bucketSize)].push(items[i]);
    }

    let result = [];
    for (i = 0; i <  buckets.length -1; i++) {
        result.push(quickSort(buckets[i]));
        }

    return result.flat();
}

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
module.exports = bucketSort;
