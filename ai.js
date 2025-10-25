let queenCount = 0;

function generatePattern(count) {
    // Diese Funktion ist in Ordnung.
    const board = new Array(count).fill(0).map(() => new Array(count).fill(0));
    return board;
}

function isSafe(board, row, col) {
    // Vereinfacht, um nur die bereits platzierten Damen (in den oberen Reihen) zu prüfen.
    // Das macht die separaten Diagonal- und Reihen-Check-Funktionen überflüssig.

    // Prüfe Spalte nach oben
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) {
            return false;
        }
    }
    // Prüfe Diagonale links oben
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }
    // Prüfe Diagonale rechts oben
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 1) {
            return false;
        }
    }
    return true;
}

function printBoard(board) {
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(" "));
    }
}

function insertQueen(board, row, col) {
    board[row][col] = 1;
    queenCount++;
}

function removeQueen(board, row, col) {
    board[row][col] = 0;
    queenCount--;
}

// Die solveNQueens-Funktion wird durch eine klassische rekursive Lösung ersetzt.
// Dies ist viel einfacher zu verstehen und zu warten als der komplexe iterative Ansatz.
function solve(board, row, count) {
    // Basisfall: Wenn alle Damen platziert sind, haben wir eine Lösung gefunden.
    if (row === count) {
        console.log("Lösung gefunden:");
        printBoard(board);
        console.log("----------------");
        return true; // Gibt an, dass eine Lösung gefunden wurde
    }

    // Versuche, eine Dame in jeder Spalte der aktuellen Reihe zu platzieren.
    for (let col = 0; col < count; col++) {
        // Prüfe, ob es sicher ist, die Dame hier zu platzieren.
        if (isSafe(board, row, col)) {
            // Platziere die Dame
            insertQueen(board, row, col);

            // Rufe die Funktion rekursiv für die nächste Reihe auf.
            // Wenn der rekursive Aufruf eine Lösung findet, gib true zurück.
            if (solve(board, row + 1, count)) {
                return true;
            }

            // Backtracking: Wenn das Platzieren der Dame zu keiner Lösung führt,
            // entferne sie wieder und versuche die nächste Spalte.
            removeQueen(board, row, col);
        }
    }

    // Wenn in dieser Reihe keine Dame platziert werden kann, gib false zurück.
    return false;
}

function solveNQueens(count) {
    const board = generatePattern(count);
    if (!solve(board, 0, count)) {
        console.log("Keine Lösung gefunden.");
    }
}

solveNQueens(4);
