import { Tree } from "./tree.js";

const tree = new Tree([1, 2, 3, 4, 5]);
console.log(tree.isBalanced());
tree.insert(6);
tree.insert(7);
tree.insert(8);
console.log(tree.isBalanced());

tree.rebalance();
console.log(tree.isBalanced());