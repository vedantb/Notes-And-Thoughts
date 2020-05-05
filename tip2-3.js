/** TIP 2 */

/** Use Intl.Collator() to easily sort or group things regardless of their case or accent */

console.log(['A', 'B', 'C', 'a', 'b', 'c', 'ä', 'ç'].sort());
// [ 'A', 'B', 'C', 'a', 'b', 'c', 'ä', 'ç' ]

const coco = new Intl.Collator();
console.log(['A', 'B', 'C', 'a', 'b', 'c', 'ä', 'ç'].sort(coco.compare));
// [ 'a', 'A', 'ä', 'b', 'B', 'c', 'C', 'ç' ]

/** TIP 3 */
// In ES 2019, we have flat() to flatten chunked arrays

let a = [[1, 2], 3, [4, 5], [6, 7, 8, 9]];
// a.flat();
// try this out in lastest version of chrome (will not work in node yet)
