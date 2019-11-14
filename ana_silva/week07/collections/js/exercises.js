var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

var people = [
  { id: 1, username: "A", active: true,  age: 20, uid: 1412 },
  { id: 2, username: "B", active: false, age: 35, uid: 1352 },
  { id: 3, username: "C", active: false, age: 50, uid: 5418 },
  { id: 4, username: "D", active: true,  age: 65, uid: 216  },
  { id: 5, username: "E", active: true,  age: 80, uid: 18   },
  { id: 6, username: "E", active: true,  age: 95, uid: 1000 },
];

var words = [
  "attoparsec", "batch", "Cinderalla Book", "Dr. Fred Mbogo", "eat flaming death", "fandango on core", "Foonly", "goat file", "Halloween Documents", "I see no X here", "Imminent Death Of The Net Predicted!", "jibble", "kilogoogle", "larval stage", "maximum Maytag mode", "nybble", "octal forty", "pico-", "quantum bogodynamics", "rubber-hose cryptanalysis", "sigmonster", "tail recursion", "unswizzle", "VAXen", "webmaster", "XEROX PARC", "yak shaving", "Zero-One-Infinity Rule"
]; // Random words from here... http://www.catb.org/jargon/html/go01.html


// Exercises
// Sort the people by 'uid'
const sortPeople = _(people).sortBy('uid');
console.log(sortPeople);


// Group the random words by the lower case version of their first letter
const group = _(words).groupBy(function(string) {
  return string[0].toLowerCase();
});
console.log(group);

// Check to see if all the words have more than 3 characters
const checkShortWords = _(words).select(function(word){
  if (word.length < 3) { return word };
});
console.log(checkShortWords);

// Check if some words are over twenty characters long
const checkLongWords = _(words).select(function(word){
  if (word.length > 20) { return word };
});
console.log(checkLongWords);

// Get an array of all of the uids in people
const uids = _(people).map("uid");
console.log(uids);

// Find the person with the highest uid
const max_uid = _(people).max("uid");
console.log(max_uid);

// Return an object that says how many even numbers and how many odd numbers there are in numbers
const object = _(numbers).groupBy(function(n){
  if (n % 2 !== 0){
    return 'odd';
  } else {
    return 'even';
  }
});
console.log(object);

// Get three random numbers out of numbers
const random = _(numbers).sample(3);
console.log(random);


// Arrays!
// Log out the answers to all of the following questions!
//
// Here is some data that you can work with.

var numbers2 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var bumpyArr = ["hello", "maytag", [[[["sigmonster"]], "swizzle"]]];
var uncompactedArr = [ "hello", false, NaN, undefined, "quantom bogo-sort" ];

var arrToTransform = [[ "age", "location" ], [ NaN, undefined ]];


// Create an array of every five numbers between 30 and 101
const arrEveryFive = _.range(30, 101, 5);
console.log(arrEveryFive);

// Turn bumpyArr into one flat array (no nested arrays)
const flatArr = _(bumpyArr).flatten();
console.log(flatArr);

// Remove all of the falsey elements in the uncompactedArr
const truthy = _(uncompactedArr).compact();
console.log(truthy);

// Find all of the unique elements in the following arrays -
const unique = _.union([ 1, 25, 100 ], [ 1, 14, 25 ], [24, Infinity, -0]); 
console.log(unique);


// Find the index of the first element in numbers that is over 7 and is even
const num = _(numbers).find(function(n){
  return n > 7 && n % 2 === 0;
})
console.log(num);

// Turn arrToTransform into an object that looks like this - { age: NaN, location: undefined }
const obj = _.object(arrToTransform[0], arrToTransform[1]);
console.log(obj);
