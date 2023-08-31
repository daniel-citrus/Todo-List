import "../style/style.scss";

/* Database that contains all sets and todo items within each set. */
let brain = (()=> {
    const sets = new Map();
})();

import { ItemSet } from "./set";

let s = ItemSet('Daniel','Karl','Jeff');
console.log(s.search('Daniel'));