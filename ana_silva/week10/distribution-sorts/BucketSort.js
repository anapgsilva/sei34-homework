function bucketSort(items) {
  const total = items.length;
  const max = Math.max(...items);
  const numBuckets = Math.ceil(Math.sqrt(total));
  let buckets = [];


  for (let i = 0; i < total; i++) {
    let index;
    if (items[i] < 0) {
      index = 0;
    } else {
      index = Math.floor(items[i] * numBuckets / max);
    }
    if (buckets[index] !== undefined) {
      buckets[index].push(items[i]);
    } else {
      buckets[index] = [items[i]];
    }
  }

  buckets = buckets.filter( n => Boolean); //cleans empty elements if any

  for (let i = 0; i < buckets.length; i++) {
    //make each bucket in order
    buckets[i].sort( (a,b) => a-b );
  }
  console.log(buckets.flat());
  return buckets.flat();
}

bucketSort([10, 4, 6, 7, 2, 3])
bucketSort([-10, -4, -6, 7, -2, 3])

module.exports = bucketSort;
