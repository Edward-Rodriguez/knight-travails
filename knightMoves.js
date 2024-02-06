function knightMoves() {}

function Node(row, col) {
  const children = getEligibleSquares();

  function getEligibleSquares() {
    const eligibleSquares = [];
    if (row - 2 >= 0 && col - 1 >= 0) eligibleSquares.push([row - 2, col - 1]);
    if (row - 2 >= 0 && col + 1 >= 0) eligibleSquares.push([row - 2, col + 1]);
    if (row - 1 >= 0 && col - 2 >= 0) eligibleSquares.push([row - 1, col - 2]);
    if (row - 1 >= 0 && col + 2 >= 0) eligibleSquares.push([row - 1, col + 2]);
    if (row + 1 >= 0 && col - 2 >= 0) eligibleSquares.push([row + 1, col - 2]);
    if (row + 1 >= 0 && col + 2 >= 0) eligibleSquares.push([row + 1, col + 2]);
    if (row + 2 >= 0 && col - 1 >= 0) eligibleSquares.push([row + 2, col - 1]);
    if (row + 2 >= 0 && col + 1 >= 0) eligibleSquares.push([row + 2, col + 1]);
    return eligibleSquares;
  }

  return {
    get children() {
      return children;
    },
    get row() {
      return row;
    },
    get col() {
      return col;
    },
  };
}

const node = Node(3, 3);
console.log(node.children);
