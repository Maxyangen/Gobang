var wins = [];
var playerWin = [];
var computerWin = [];
var count = 0;

function initAIData() {
    initWinsData();
    countWins();
    initPlayerWinData();
}
function countWins() {

    var i, j, k;
    for (i = 1; i < 16; i++) {
        for (j = 1; j < 12; j++) {
            for (k = 0; k < 5; k++) {
                wins[i][j + k][count] = true;
            }
            count++;
        }
    }

    for (i = 1; i < 16; i++) {
        for (j = 1; j < 12; j++) {
            for (k = 0; k < 5; k++) {
                wins[j + k][i][count] = true;
            }
            count++;
        }
    }
    for (i = 1; i < 12; i++) {
        for (j = 1; j < 12; j++) {
            for (k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }
    for (i = 1; i < 12; i++) {
        for (j = 15; j > 4; j--) {
            for (k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }
    console.log(count);
}

function initWinsData() {
    for (var i = 0; i < 17; i++) {
        wins[i] = [];
        for (var j = 0; j < 17; j++) {
            wins[i][j] = [];
        }
    }
}

function initPlayerWinData() {
    for (var i = 0; i < count; i++) {
        playerWin[i] = 0;
        computerWin[i] = 0;
    }
}

function gobangAI() {
    var playerPoint = [];
    var computerPoint = [];
    var max = 0;
    var indexX = 1, indexY = 1;
    var i, j, k;
    for (i = 0; i < 17; i++) {
        playerPoint[i] = [];
        computerPoint[i] = [];
        for (j = 0; j < 17; j++) {
            playerPoint[i][j] = 0;
            computerPoint[i][j] = 0;
        }
    }

    for (i = 1; i < 17; i++) {
        for (j = 1; j < 17; j++) {
            if (chessBoard[i][j] === 0) {
                for (k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (playerWin[k] == 1) {
                            playerPoint[i][j] += 200;
                        } else if (playerWin[k] == 2) {
                            playerPoint[i][j] += 400;
                        } else if (playerWin[k] == 3) {
                            playerPoint[i][j] += 2000;
                        } else if (playerWin[k] == 4) {
                            playerPoint[i][j] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            computerPoint[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerPoint[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerPoint[i][j] += 2200;
                        } else if (computerWin[k] == 4) {
                            computerPoint[i][j] += 20000;
                        }
                    }
                }

                if (playerPoint[i][j] > max) {
                    max = playerPoint[i][j];
                    indexX = i;
                    indexY = j;
                } else if (playerPoint[i][j] == max) {
                    if (computerPoint[i][j] > computerPoint[indexX][indexY]) {
                        indexX = i;
                        indexY = j;
                    }
                }
                if (computerPoint[i][j] > max) {
                    max = computerPoint[i][j];
                    indexX = i;
                    indexY = j;
                } else if (computerPoint[i][j] == max) {
                    if (playerPoint[i][j] > playerPoint[indexX][indexY]) {
                        indexX = i;
                        indexY = j;
                    }
                }

            }
        }
    }
    console.log("ai index x and y");
    console.log(indexX + " " + indexY);
    drawChess(WHITECHESS.color,  indexY * 40, indexX * 40);
    chessBoard[indexX][indexY] = WHITECHESS;

    for (k = 0; k < count; k++) {
        if (wins[indexX][indexY][k]) {
            computerWin[k]++;
            playerWin[k] = 6;
            if (computerWin[k] == 5) {
                window.alert("AI is Winner");
                over = true;
            }
        }
    }

    if (!over) {
        console.log("now turn");
        console.log(currentTeam);
        currentTeam = currentTeam === BLACKCHESS ? WHITECHESS : BLACKCHESS;
    }


}