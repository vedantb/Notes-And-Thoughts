/**
 * Since arrays are objects, we can destructure their indexes to easily grab the first and last items.
 */

const bikes = ['bianchi', 'miele', 'miyata', 'benotto', 'panasonic'];

// grab the first and last element of array using object destructuring
// const { length, 0: first, [length - 1]: last } = bikes;
// console.log(first, last);

// wtf? how?! Arrays are objects!

//1. You can use Object destructuring on an array, using the index as a property
const { 2: middle } = bikes;
console.log(middle, 'middle');

// 2. Arrays have a length property, which can be destructured along with indexes
const { 0: first, length } = bikes;
console.log(first, length);

// 3. Destructuring allows us to use it's variable right inside
// Computed property names allow us to reference the length and calculate the index of the last item
const { length, 0: first, [length - 1]: last } = bikes;
// We can go fucking bananas with this
const { length, [Math.floor(length / 2)]: middle } = bikes;
console.log(middle); // miyata

// 4. NEAT!
