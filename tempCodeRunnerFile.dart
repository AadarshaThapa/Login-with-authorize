class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildBinaryTree(inOrderTraversal, preOrderTraversal, inStart, inEnd) {
    if (inStart > inEnd) {
        return null;
    }

    const tNode = new Node(preOrderTraversal[buildBinaryTree.preIndex]);
    buildBinaryTree.preIndex++;

    if (inStart === inEnd) {
        return tNode;
    }

    const inIndex = search(inOrderTraversal, inStart, inEnd, tNode.data);

    tNode.left = buildBinaryTree(inOrderTraversal, preOrderTraversal, inStart, inIndex - 1);
    tNode.right = buildBinaryTree(inOrderTraversal, preOrderTraversal, inIndex + 1, inEnd);

    return tNode;
}

function search(arr, start, end, value) {
    for (let i = start; i <= end; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
}

function printInOrderTraversal(node) {
    if (node === null) {
        return;
    }

    printInOrderTraversal(node.left);
    console.log(node.data, ' ');
    printInOrderTraversal(node.right);
}

function printPostorder(node) {
    if (node === null) {
        return;
    }

    printPostorder(node.left);
    printPostorder(node.right);
    console.log(node.data, ' ');
}

const inOrderTraversal = [4, 2, 5, 1, 6, 3, 7];
const preOrderTraversal = [1, 2, 4, 5, 3, 6, 7];

buildBinaryTree.preIndex = 0;
const root = buildBinaryTree(inOrderTraversal, preOrderTraversal, 0, inOrderTraversal.length - 1);

console.log("Inorder traversal of the constructed tree is");
printInOrderTraversal(root);
console.log();
console.log("Postorder traversal of the constructed tree is");
printPostorder(root);
