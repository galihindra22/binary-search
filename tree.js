import { Node } from "./node.js";

class Tree {
    #root;
    constructor(arr) {
        this.#root = Tree.buildTree(arr);
    }

    static buildTree(arr) {
        const sortedArr = [...new Set(arr)].sort((a, b) => a - b);

        const buildSubtree = (arr, start = 0, end = arr.length - 1) => {
            if (start > end) return null;

            const mid = start + Math.floor((end - start) / 2);
            const node = new Node(arr[mid]);

            node.left = buildSubtree(arr, start, mid - 1);
            node.right = buildSubtree(arr, mid + 1, end);

            return node;
        }
        return buildSubtree(sortedArr);
    }
    includes(value) {
        let current = this.#root;

        while (current !== null) {
            if (value === current.data) return true;
            if (value < current.data) current = current.left;
            else current = current.right;
        }
        return false;
    }

    insert(value) {
        if (this.#root === null) {
            this.#root = new Node(value);
            return;
        }

        let current = this.#root;

        while (current !== null) {
            if (value === current.data) return;

            if (value < current.data) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            }
        }
    }

    deleteItem(value) {
        this.#root = this.#deleteNode(this.#root, value);
    }

    #deleteNode(root, value) {
        if (root === null) return null;

        if (value < root.data) {
            root.left = this.#deleteNode(root.left, value);
        } else if (value > root.data) {
            root.right = this.#deleteNode(root.right, value);
        } else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            let successor = root.right;
            while (successor.left !== null) successor = successor.left;

            root.data = successor.data;

            root.right = this.#deleteNode(root.right, successor.data);
        }
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is needed');
        }

        if (this.#root === null) return;

        const queue = [this.#root];

        while (queue.length > 0) {
            const node = queue.shift();

            callback(node.data);


            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }
    inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is needed');
        }
        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        };
        traverse(this.#root);
    }
    preOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is needed');
        }
        const traverse = (node) => {
            if (node === null) return;

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.#root);
    }
    postOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is needed');
        }
        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        };
        traverse(this.#root);
    }
    find(value, node = this.#root) {
        if (node === null || node.data === value) return node;

        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }
    height(value) {
        const targetNode = this.find(value);
        if (!targetNode) return undefined;

        const getHeight = (node) => {
            if (node === null) return -1;

            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return getHeight(targetNode);
    }
    depth(value) {
        let current = this.#root;
        let edges = 0;

        while (current !== null) {
            if (value === current.data) {
                return edges;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            edges++;
        }
        return undefined;
    }
    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return 0;

            const leftHeight = checkBalance(node.left);
            if (leftHeight === -1) return -1;

            const rightHeight = checkBalance(node.right);
            if (rightHeight === -1) return -1;

            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkBalance(this.#root) !== -1;
    }
    rebalance(){
        const nodes = [];

        this.inOrderForEach((data) => nodes.push(data));
        this.#root = Tree.buildTree(nodes);
    }
}

export {Tree};