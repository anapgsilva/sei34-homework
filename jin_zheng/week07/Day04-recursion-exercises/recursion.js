// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function findMax(arr) {
    if (arr.length === 1) return arr[0];
    let value1 = arr.pop();
    let value2 = findMax(arr);
    return value1 > value2 ? value1 : value2
}

function findMax2(array, largest=-Infinity) {
    if (array.length === 0) return largest
    if (array[0] > largest) largest = array[0];
    return findMax2(array.slice(1), largest)
}


function factorial(n){
    if (n > 1) n *= factorial(n-1)
    return n;
}

function fibonacci(n){
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}


/* Ruby
** memorisation

    def fib_meomo(n)
        @fib ||= {}

        if @fib[n]
            @fib[n]
        elsif n == 1 || n == 2
            1
        else
            result = fib_memo(n-1) + fib_meno[n-2]
            @fib[n] = result
            result
        end
    end

** iterative recursion
    def fib(n, a=1, b=1)
        if n == 1|| n == 2
            b
        else
            fib(n-1, b, a+b)
        end
    end

*/
function coinFlips(n, index = 1, outcome = Array(2**n).fill("") ){
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]

    const innerLoop = (n, index, j=0) => {
        if (j === outcome.length) return outcome;
        (~~(j/2** (n-index)) % 2 === 0) ? outcome[j] += "H" : outcome[j] += "T";
        innerLoop(n, index, j + 1);
    }

    if (index > n) return outcome
    innerLoop(n, index);
    return coinFlips(n, index+1, outcome)
}

// Reversion is converted from loop below ////////////////////////////////////////////////////////
// for (let i = 1; i <= n; i++ )
//     for (let j in outcome) {
//         if (~~(j/2** (n-i)) % 2 === 0){
//             outcome[j] += "H"
//         } else {
//             outcome[j] += "T"
//         }
//     }
//     console.log(outcome);
//     return outcome
//}
// for (let i = 1; i <= n; i++ ) {
//     innerLoop(0, n, i )
// }

function coinFlips2(tosses){
    const combinations = [];
    const flip = (soFar="") => {
        if (soFar.length === tosses) {
            combinations.push(soFar);
        } else {
            flip(soFar+"H");
            flip(soFar+"F");
        }
    }
    flip()
    return combinations
}

function letterCombinations(array, result = []) {
    // For example, letterCombinations(["a","b","c"]) would return the following:
    // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]
    // debugger
    const allPermutations = (str, results = []) => {

        if (str.length < 2) return str;

        const formPermutation = (arr, firstChar, i=0)=>{
            if (i === arr.length) return
            results.push(firstChar + arr[i])
            formPermutation(arr, firstChar, i+1)
        }

        const getAllPermutations = (str, i= 0) => {
            if (i === str.length) return
            let firstChar = str[i];
            let remainingStr = str.slice(0,i) + str.slice(i+1);
            formPermutation(allPermutations(remainingStr), firstChar)
            getAllPermutations(str, i+1)
        }

        // for (let i=0; i<str.length; i++) {
        //     let firstChar = str[i];
        //     let remainingStr = str.slice(0,i) + str.slice(i+1);
        //     formPermutation(allPermutations(remainingStr), firstChar)
        // }

        getAllPermutations(str)
        return results;
    }

    // debugger
    const getPermutationsFromPowerSet = (i = 0, elementArray = []) => {
        if (i === array.length) {
            const permutation = allPermutations(elementArray.join(""))//permutation of one element of powerset
            result.push(permutation);//push the permutation from last step tp result
            return;
        }
        // get Power Set ////////
        getPermutationsFromPowerSet(i + 1, elementArray.concat([array[i]]));
        getPermutationsFromPowerSet(i + 1, elementArray);
    }

    getPermutationsFromPowerSet();
    return result.flat().filter(Boolean);
}

console.log(letterCombinations(['a', 'b', 'c']));



function generateSubsets(array, result = [], i=1) {

    const findASubset = (i, subset = [], j = 0) => {
        if (j === array.length) {
            result.push(subset);
            return
        }
        if (i & (1 << j)) subset.push(array[j])
        findASubset(i, subset, j+1)
    }

    // for (let j = 0; j < array.length; j++) {
    //   if (i & (1 << j)) subset.push(array[j]);
    //    **** 1<<j is a mask.=> j = [001, 010, 100], i = [001, 010, 011, 100, 101, 110, 111]
    // }
    // result.push(subset);

    if (i === 2**array.length ) return result;
    findASubset(i)
    return generateSubsets(array, result, i+1)

    // for (let i = 1; i < (2**array.length); i++) {  // **** (1 << array.length;) => (2**(array.length)*1),  Number of k-combinations for all k is 2**k, including empty element
    //     findASubset(i)
    // }
}

console.log(generateSubsets([1,2,3]))


module.exports = {
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations
}
