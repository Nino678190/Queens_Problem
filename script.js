let queenCount = 0;

function generatePattern(count){
    const board = new Array(count).fill(Array(count).fill(0)).map(row => row.slice());
    return board;
}

function isSafe(board, row, col, count){
    console.log(`ROW: ${row}, COL: ${col}`);
    if (board[row][col] == 1){
        return false;
    }
    if (!checkRow(board, row)){
        return false;
    }
    // Check column
    for (let i = 0; i < count; i++){
        if (board[i][col] == 1){
            return false;
        }
    }
    if (!isSafe_TopLeft(board, row, col)){
        return false;
    }
    if (!isSafe_TopRight(board, row, col)){
        return false;
    }
    if (!isSafe_BottomLeft(board, row, col)){
        return false;
    }
    if (!isSafe_BottomRight(board, row, col)){
        return false;
    }
    return true;
}

function printBoard(board){
    for (let i = 0; i < board.length; i++){
        console.log(board[i].join(' '));
    }
}

function checkRow(board, row){
    for (let col = 0; col < board.length; col++){
        if (board[row][col] === 1){
            return false;
        }
    }
    return true;
}

function isSafe_TopLeft(board, row, col){
    if (row === 0 || col === 0){
        return true;
    }
    let r = row - 1;
    let c = col - 1;
    while (r >= 0 && c >= 0){
        if (board[r][c] === 1){
            return false;
        }
        r--;
        c--;
    }
    return true;
}

function isSafe_TopRight(board, row, col){
    if (row === 0 || col === board.length - 1){
        return true;
    }
    let r = row - 1;
    let c = col + 1;
    while (r >= 0 && c < board.length){
        if (board[r][c] === 1){
            return false;
        }
        r--;
        c++;
    }
    return true;
}

function isSafe_BottomLeft(board, row, col){
    if (row === board.length - 1 || col === 0){
        return true;
    }
    let r = row + 1;
    let c = col - 1;
    while (r < board.length && c >= 0){
        if (board[r][c] === 1){
            return false;
        }

        r++;
        c--;
    }
    return true;
}

function isSafe_BottomRight(board, row, col){
    if (row === board.length - 1 || col === board.length - 1){
        return true;
    }
    let r = row + 1;
    let c = col + 1;
    while (r < board.length && c < board.length){
        if (board[r][c] === 1){
            return false;
        }
        r++;
        c++;
    }   
    return true;
}

function insertQueen(board, row, col){
    board[row][col] = 1;
    queenCount++;
    console.log(`Inserted queen at row ${row}, col ${col}. Total queens: ${queenCount}`);
    return board;
}

function removeLastQueen(board, row, col){
    row = row--;
    board[row][col] = 0;
    queenCount--;
    console.log(`Removed queen from row ${row}, col ${col}. Total queens: ${queenCount}`);
    return board;
}

function moveQueen(board, row){
    console.log(`Moving queen in row ${row}`);
    const aktuelleCol = board[row].indexOf(1);
    if (aktuelleCol +1 <= board.length && isSafe(board, row, aktuelleCol + 1, board.length) && (aktuelleCol>=0) ){
        removeLastQueen(board, row, aktuelleCol);
        insertQueen(board, row, aktuelleCol + 1);
        return true;
    }
    removeLastQueen(board, row, aktuelleCol);
    if (row - 1 < 0){
        return false;
    }
    moveQueen(board, row - 1);
    return false;
}

function printQueenPositions(board){
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            if (board[i][j] === 1){
                console.log(`Queen at row ${i}, col ${j}`);
            }
        }
    }
}

function solveNQueens(count){
    const board = generatePattern(count);
    let row = 0;
    let col = 0;    
    while (queenCount < count){
        let placed = false;
        printQueenPositions(board);
        while (col < count){
            if (col >= count){
                break;
            }
            if (isSafe(board, row, col, count)){
                if (row === count || col === count){
                    break;
                }
                console.log(`Placing queen at row ${row}, col ${col}`);
                insertQueen(board, row, col);
                placed = true;
                console.log(row, row+1);
                if (queenCount === count || row +1 === count){
                    break;
                }
                row++;
                col = 0;
                break;
            } else {
                if (row === count || col +1  === count){
                    break;
                }
                col++;
            }
        } 
        if (!placed){
            console.log(`Backtracking from row ${row}, col ${col}`);

            const moved = moveQueen(board, row - 1);
            if (moved){
                row++;
                col = 0;
                continue;
            } else {
                row--;
            }
            col = board[row].indexOf(1) + 1;
        }
    }
    console.log("Final board:");
    console.log("----------------");
    printBoard(board);
    console.log("----------------")
}

solveNQueens(4);