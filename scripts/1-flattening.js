/* 

Use the reduce method in combination with the concat method to “flatten” 
an array of arrays into a single array that has all the elements of the original 
arrays.

No.

*/

let arrays = [[1, 2, 3], [4, 5], [6]]; // → [1, 2, 3, 4, 5, 6]

function flatten(arr) {
    let new_arr = [];
    for (let i in arrays) {
        //console.log(typeof arrays[i])
        let item = arrays[i];
        if (typeof item == 'object') {
            for (let ii in item) {
                new_arr.push(item[ii]);
            }
        }
    }
    return new_arr
}

console.log(flatten(arrays))