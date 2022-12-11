var board;
var playerO = "O";
var playerX = "X";

//sounds
var click1 = new Audio();
var click2 = new Audio();
var draw = new Audio();
var win = new Audio();

click1.src = "click1.mp3";
click2.src = "click2.mp3";
draw.src = "draw.mp3";
win.src = "win.mp3";

//player draw
var currentPlayer;
var rand = Math.floor(Math.random() * 2) + 1;
if(rand == 1) {
    currentPlayer = playerO;
}
else {
    currentPlayer = playerX;
}
var gameOver = false;

window.onload = function() {
    document.getElementById("but1").addEventListener("click", validateForm);
    document.getElementById("back").addEventListener("click", back);
    setGame();
}

function reload() {
    location.reload();
}

function back() {
    location.href = '../index.html';
}

function validateForm() {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    if (player1 == "" || player2 == "") {
      alert("Enter the player's name!");
    }
    else {
        play();
    }
  }


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


function play() {
    let player2 = document.getElementById("player2").value;
    let player1 = document.getElementById("player1").value;
    document.getElementById("form").style.display = "none";
    document.getElementById("main").style.display = "none";
    document.getElementById("tytul").style.display = "block";
    document.getElementById("board").style.display = "flex";
    if(rand == 1) {
        document.getElementById("txt").innerHTML = "Begins: <font color='orange'>" + player2 + " (O) </font>";
    }
    else {
        document.getElementById("txt").innerHTML = "Begins: <font color='lightpink'>" + player1 + " (X) </font>";
    }
}


function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}


function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    // "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currentPlayer; //mark the board
    //this.innerHTML = currentPlayer; //mark the board on html

    if(currentPlayer == playerO) {
        this.innerHTML = "<font color='orange'>" + currentPlayer + "</font>";
        click1.play();
    }
    else if(currentPlayer == playerX) {
        this.innerHTML = "<font color='lightpink'>" + currentPlayer + "</font>";
        click2.play();
    }

    //change players
    if (currentPlayer == playerO) {
        currentPlayer = playerX;
        let  player1 = document.getElementById("player1").value;
        document.getElementById("txt").innerHTML = "Now: <font color='lightpink'>" + player1 + " (X) </font>";

    }
    else {
        currentPlayer = playerO;
        let player2 = document.getElementById("player2").value;
        document.getElementById("txt").innerHTML = "Now: <font color='orange'>" + player2 + " (O) </font>";
    }

    //check winner
    checkWinner();

    //check tie
    if(!gameOver){
    checkTie();
    }

}


function checkWinner() {
    var player2 = document.getElementById("player2").value; // O
    var player1 = document.getElementById("player1").value; // X

    //horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
                if(currentPlayer == playerX){ 
                    document.getElementById("txt").innerHTML = "Won: <font color='orange'>" + player2 + " (O) </font> ";

                }
                else {
                    document.getElementById("txt").innerHTML = "Won: <font color='lightpink'>" + player1 + " (X) </font>";

                }
            }
            let but2 = document.getElementById("but2");
            let but3 = document.getElementById("but3");
            but2.style.display = "inline-block";
            but3.style.display = "inline-block";
            win.play();
            but2.addEventListener("click", reload);
            gameOver = true;
            return;
        }
    }

    //vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
                if(currentPlayer == playerX){ 
                    document.getElementById("txt").innerHTML = "Won: <font color='orange'>" + player2 + " (O) </font> ";
                }
                else {
                    document.getElementById("txt").innerHTML = "Won: <font color='lightpink'>" + player1 + " (X) </font>";

                }
            }
            let but2 = document.getElementById("but2");
            let but3 = document.getElementById("but3");
            but2.style.display = "inline-block";
            but3.style.display = "inline-block";
            win.play();
            but2.addEventListener("click", reload);
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
            if(currentPlayer == playerX){ 
                document.getElementById("txt").innerHTML = "Won: <font color='orange'>" + player2 + " (O) </font> ";

            }
            else {
                document.getElementById("txt").innerHTML = "Won: <font color='lightpink'>" + player1 + " (X) </font>";

            }
        }
        let but2 = document.getElementById("but2");
        let but3 = document.getElementById("but3");
        but2.style.display = "inline-block";
        but3.style.display = "inline-block";
        win.play();
        but2.addEventListener("click", reload);
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");
        if(currentPlayer == playerX){ 
            document.getElementById("txt").innerHTML = "Won: <font color='orange'>" + player2 + " (O) </font> ";
        }
        else {
            ocument.getElementById("txt").innerHTML = "Won: <font color='lightpink'>" + player1 + " (X) </font>";
        }
        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        let but2 = document.getElementById("but2");
        let but3 = document.getElementById("but3");
        but2.style.display = "inline-block";
        but3.style.display = "inline-block";
        win.play();
        but2.addEventListener("click", reload);
        gameOver = true;
        return;
        
    }
}


function checkTie()
{
    let count = 0;
    for(let r=0;r<3;r++)
    {
        for(c=0;c<3;c++)
        {
            if(board[r][c] != ' ')
            {
                count++; 
            }
        }
    }

    if(count == 9)
    {
        for(let r=0;r<3;r++)
        {
            for(c=0;c<3;c++)
            {
                let t = document.getElementById(r.toString() + "-" + c.toString());
                t.classList.add('tie');
                document.getElementById("txt").innerHTML = "Draw";
            }
        }
        let but2 = document.getElementById("but2");
        let but3 = document.getElementById("but3");
        but2.style.display = "inline-block";
        but3.style.display = "inline-block";
        draw.play();
        but2.addEventListener("click", reload);
        gameOver = true;
        return;
    }
}
