function bucketSort(items) {
  const n = items.length
  //new array of all buckets
  const allBuckets = new Array(n)
  const sortedArray=[]
  //return the array if length is 1 or less
  if(n<=1){
    return items
  }
  //for every bucket initilize a empty bucket
  for (let i = 0; i < n; i++) {
    allBuckets[i] =[]
    
  }
  //for every element calculate to wich bucket they should be pushed
  for (let i = 0; i < n; i++) {
    const index  = Math.floor(n * items[index]/10)
    allBuckets[index].push(items[i])
  }


  return sortedArray;
}

module.exports = bucketSort;
