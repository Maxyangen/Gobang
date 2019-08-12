var canvas;
var canvasContext;
var chess = new Array(17);
var isBlack;
var WHITECHESS = 'white';
var BLACKVHESS = 'black';
var isWin;
var dialog


function startGame(){
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener("click",playerPutChess);
    dialog = document.getElementById("dialog");
    initData();
    drawChessBoard();
}

function initData(){
    for(var i = 0 ; i < 17; i++)
        chess[i] = new Array(17);

    for(var i = 0 ; i < 17; i++)
        for(var j = 0 ; j < 17; j++)
            chess[i][j] = 0;

    isBlack = true;
    isWin = false;

}

function drawChessBoard(){
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

function playerPutChess(e){
    console.log("mouse click x coor" + e.clientX);
    console.log("mouse click y coor" + e.clientY);


    var x = parseInt(e.clientX / 40);
    var y = parseInt(e.clientY / 40);

    console.log(x + " " + y);
    if( x <= 0 || x > 15|| y <= 0 || y > 15 || chess[y][x] != 0){
        alert("replay");
        return;
    }
        
    if(isBlack){
        drawChess(BLACKVHESS,x*40,y*40);
        chess[y][x] = 2;
    }
        
    else{
        drawChess(WHITECHESS,x*40,y*40);
        chess[y][x] = 1;
    }
        
    checkWinner(isBlack+1 , y,x);

    isBlack = !isBlack;
        
    

}

var drawChess = function (chessColor,x,y){
    canvasContext.beginPath();
    canvasContext.arc(x,y,15,0,360,false);
    canvasContext.fillStyle = chessColor;
    canvasContext.fill();
    canvasContext.closePath();
}


function checkWinner(chessColor,x,y){

    var checkUpDown = 0;
    var checkLeftRight = 0;
    var checkLeftDiagonal = 0;
    var checkRightDiagonal = 0;


    for(var i = y; i > 0; i--){
        if(chess[x][i] != chessColor)
            break;
        checkLeftRight++;
    }
    for(var i = y+1; i < 15; i++){
        if(chess[x][i] != chessColor)
            break;
        checkLeftRight++;
    }


    for(var i = x; i > 0; i--){
        if(chess[i][y] != chessColor)
            break;
        checkUpDown++;
    }
    for(var i = x+1; i < 15; i++){
        if(chess[i][y] != chessColor)
            break;
        checkLeftRight++;
    }

    for(var i = x,j = y; i > 0,j > 0; i--,j--){
        if(chess[i][j] != chessColor)
            break;
        checkLeftDiagonal++;
    }
    for(var i = x+1,j = y+1; i < 15,j < 15; i++,j++){
        if(chess[i][j] != chessColor)
            break;
        checkLeftDiagonal++;
    }

    for(var i = x,j = y; i > 0,j < 15; i--,j++){
        if(chess[i][j] != chessColor)
            break;
        checkRightDiagonal++;
    }
    for(var i = x+1,j = y-1; i < 15,j > 0; i++,j--){
        if(chess[i][j] != chessColor)
            break;
        checkRightDiagonal++;
    }

    console.log("checkWinner : "   + checkLeftRight);
    console.log("checkColor : " + chessColor);

    var winner;
    if(checkUpDown >= 5 || checkLeftRight >= 5 || checkLeftDiagonal >= 5 || checkRightDiagonal >= 5){
        if(chessColor == 1)
            winner = "White Player is Winner!!";
        else
            winner = "Black Player is Winner!!";
        
        isWin = true;
        dialog.style.display = "block";
        dialog.innerHTML=winner;
        canvasContext.clearRect(0,0,640,640);
        startGame();
    }


}



