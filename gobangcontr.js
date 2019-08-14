var canvas;
var canvasContext;
var chess = new Array(17);
var WHITECHESS = { color: 'white', name: "White"};
var BLACKCHESS = { color: 'black', name: "Black"};
var currentTeam = BLACKCHESS;
var isWin;
var dialog;


function startGame() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener("click", playerPutChess);
    dialog = document.getElementById("dialog");
    initData();
    drawChessBoard();
}

function initData() {
    for (var i = 0; i < 17; i++)
        chess[i] = new Array(17);

    for (var i = 0; i < 17; i++)
        for (var j = 0; j < 17; j++)
            chess[i][j] = 0;

    currentTeam = BLACKCHESS;
    isWin = false;
}

function drawChessBoard() {
    canvas = document.getElementById('canvas_id');
    canvasContext = canvas.getContext('2d');


    for (var i = 0; i <= 640; i += 40) {
        canvasContext.beginPath();
        canvasContext.moveTo(0, i);
        canvasContext.lineTo(640, i);
        canvasContext.closePath();
        canvasContext.stroke();

        canvasContext.beginPath();
        canvasContext.moveTo(i, 0);
        canvasContext.lineTo(i, 640);
        canvasContext.closePath();
        canvasContext.stroke();
    }


}

function playerPutChess(e) {
    console.log("mouse click x coor" + e.clientX);
    console.log("mouse click y coor" + e.clientY);


    var x = parseInt(e.clientX / 40);
    var y = parseInt(e.clientY / 40);

    console.log(x + " " + y);
    if (x <= 0 || x > 15 || y <= 0 || y > 15 || chess[y][x] !== 0) {
        alert("replay");
        return;
    }

    drawChess(currentTeam.color, x * 40, y * 40);
    chess[y][x] = currentTeam;
    checkWinner(currentTeam, y, x);

    currentTeam = currentTeam === BLACKCHESS ? WHITECHESS : BLACKCHESS;

}

var drawChess = function (chessColor, x, y) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, 15, 0, 360, false);
    canvasContext.fillStyle = chessColor;
    canvasContext.fill();
    canvasContext.closePath();
};


function checkWinner(chessTeam, x, y) {

    var checkUpDown = 0;
    var checkLeftRight = 0;
    var checkLeftDiagonal = 0;
    var checkRightDiagonal = 0;


    for (var i = y; i > 0; i--) {
        if (chess[x][i] !== chessTeam)
            break;
        checkLeftRight++;
    }

    for (var i = y + 1; i < 15; i++) {
        if (chess[x][i] !== chessTeam)
            break;
        checkLeftRight++;
    }


    for (var i = x; i > 0; i--) {
        if (chess[i][y] !== chessTeam)
            break;
        checkUpDown++;
    }
    for (var i = x + 1; i < 15; i++) {
        if (chess[i][y] !== chessTeam)
            break;
        checkLeftRight++;
    }

    for (var i = x, j = y; i > 0, j > 0; i-- , j--) {
        if (chess[i][j] !== chessTeam)
            break;
        checkLeftDiagonal++;
    }
    for (var i = x + 1, j = y + 1; i < 15, j < 15; i++ , j++) {
        if (chess[i][j] !== chessTeam)
            break;
        checkLeftDiagonal++;
    }

    for (var i = x, j = y; i > 0, j < 15; i-- , j++) {
        if (chess[i][j] !== chessTeam)
            break;
        checkRightDiagonal++;
    }
    for (var i = x + 1, j = y - 1; i < 15, j > 0; i++ , j--) {
        if (chess[i][j] !== chessTeam)
            break;
        checkRightDiagonal++;
    }

    console.log("checkWinner : " + checkLeftRight);
    console.log("checkColor : " + chessTeam);

    if (checkUpDown >= 5 || checkLeftRight >= 5 || checkLeftDiagonal >= 5 || checkRightDiagonal >= 5) {
        isWin = true;
        dialog.style.display = "block";
        dialog.innerHTML = chessTeam.name + " Player is Winner!!";
        canvasContext.clearRect(0, 0, 640, 640);
        startGame();
    }


}



