function Node(position) {
  const [row, col] = position;
  let children = [];

  return {
    get children() {
      return children;
    },
    set children(arr) {
      children = [...arr];
    },
    get row() {
      return row;
    },
    get col() {
      return col;
    },
  };
}

const gameBoard = (() => {
  const boardSize = 8;
  const board = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(null),
  );
  return {
    get board() {
      return board;
    },
    get size() {
      return boardSize;
    },
  };
})();

let buildGraph = () => {
  const board = gameBoard.board;
  for (let row = 0; row < gameBoard.size; row += 1) {
    for (let col = 0; col < gameBoard.size; col += 1) {
      if (!board[row][col]) {
        board[row][col] = Node([row, col]);
      }
      let node = board[row][col];
      const possibleMoves = getPossibleMoves(row, col);
      let childNodes = [];
      possibleMoves.forEach((square) => {
        const [squareRow, squareCol] = [...square];
        if (!board[squareRow][squareCol]) {
          board[squareRow][squareCol] = Node([squareRow, squareCol]);
        }
        childNodes.push(board[squareRow][squareCol]);
      });
      node.children = childNodes;
    }
  }

  function getPossibleMoves(row, col) {
    function withinRange(iRow, jCol) {
      if (
        iRow >= 0 &&
        iRow <= gameBoard.size - 1 &&
        jCol >= 0 &&
        jCol <= gameBoard.size - 1
      )
        return true;
      else return false;
    }
    const eligibleSquares = [];
    if (withinRange(row - 2, col - 1)) eligibleSquares.push([row - 2, col - 1]);
    if (withinRange(row - 2, col + 1)) eligibleSquares.push([row - 2, col + 1]);
    if (withinRange(row - 1, col - 2)) eligibleSquares.push([row - 1, col - 2]);
    if (withinRange(row - 1, col + 2)) eligibleSquares.push([row - 1, col + 2]);
    if (withinRange(row + 1, col - 2)) eligibleSquares.push([row + 1, col - 2]);
    if (withinRange(row + 1, col + 2)) eligibleSquares.push([row + 1, col + 2]);
    if (withinRange(row + 2, col - 1)) eligibleSquares.push([row + 2, col - 1]);
    if (withinRange(row + 2, col + 1)) eligibleSquares.push([row + 2, col + 1]);
    return eligibleSquares;
  }
  return board[0][0]; //setting root node as bottom left square
};

/**
 * BFS search graph implementation
 */
function knightMoves(start, dest) {
  const board = gameBoard.board;
  let discoveredNodesQueue = [];
  const pathList = [];
  const parentsMap = new Map();
  const visited = new Set();
  const [sourceRow, sourceCol] = start;
  const [destRow, destCol] = dest;
  const startNode = board[sourceRow][sourceCol];
  const destNode = board[destRow][destCol];
  discoveredNodesQueue.push(startNode);
  // set parent node of source node to null in parents map
  parentsMap.set(concat(sourceRow, sourceCol), null);
  visited.add(startNode);

  while (discoveredNodesQueue.length > 0) {
    let currentNode = discoveredNodesQueue.shift();
    visited.add(currentNode);
    currentNode.children.some((childNode) => {
      if (!visited.has(childNode)) {
        // add parent node to parent map, key is 'row'+'col' concatanated
        parentsMap.set(concat(childNode.row, childNode.col), currentNode);
        if (childNode === destNode) {
          pathList.unshift([childNode.row, childNode.col]);
          let parentNode = currentNode;
          while (parentNode) {
            pathList.unshift([parentNode.row, parentNode.col]);
            parentNode = parentsMap.get(concat(parentNode.row, parentNode.col));
          }
          discoveredNodesQueue = []; // too exit outer while loop
          return true;
        } else {
          discoveredNodesQueue.push(childNode);
          return false;
        }
      }
    });
  }
  return pathList;
}

function concat(a, b) {
  const param1 = a.toString();
  const param2 = b.toString();
  return param1 + param2;
}

buildGraph();

console.log('knightMoves([3,3],[0,0]) ==');
knightMoves([3, 3], [0, 0]).forEach((node) => {
  console.log(node);
});

console.log('\nknightMoves([0,0],[7,7]) ==');
knightMoves([0, 0], [7, 7]).forEach((node) => {
  console.log(node);
});
