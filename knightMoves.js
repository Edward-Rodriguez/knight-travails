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

let buildGraph = () => {
  const boardSize = 3;
  const board = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(null),
  );
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
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
        iRow <= boardSize - 1 &&
        jCol >= 0 &&
        jCol <= boardSize - 1
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

function knightMoves() {}
console.log(buildGraph());
