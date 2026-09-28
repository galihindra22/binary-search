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

    get root() {
        return this.#root;
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
        const newNode = new Node(value);

        if (this.#root === null) {
            this.#root = newNode;
            return;
        }

        let current = this.#root;

        while (current !== null) {
            if (value === current.data) return;

            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
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
            while(successor.left !== null) successor = successor.left;

            root.data = successor.data;

            root.right = this.#deleteNode(root.right, successor.data);
        }
    }
}