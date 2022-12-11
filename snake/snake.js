//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

//sounds
var eat = new Audio();
var dead = new Audio();
eat.src = "eat.mp3";
dead.src = "dead.mp3";


window.onload = function() {
    document.getElementById("but1").addEventListener("click", play1);
    document.getElementById("game-mode").addEventListener("click", mods);
    document.getElementById("hid").addEventListener("click", play2);
    document.getElementById("speed").addEventListener("click", play3);
    document.getElementById("back").addEventListener("click", back);

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;

     //drawing on the board
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
}

function back() {
    location.href = '../index.html';
}

function play1() {
    document.getElementById("form").style.display = "none";
    document.getElementById("board").style.display = "flex";
    document.getElementById("title").style.display = "block";
    setInterval(update, 100); 
}

function play2() {
    document.getElementById("mode").style.display = "none";
    document.getElementById("board").style.display = "flex";
    document.getElementById("title").style.display = "block";
    document.getElementById("board").style.animation = "znik 2s linear infinite";
    setInterval(update, 100); 
}

function play3() {
    let range = document.getElementById("range").value;
    document.getElementById("mode").style.display = "none";
    document.getElementById("board").style.display = "flex";
    document.getElementById("title").style.display = "block";
    update();
    setInterval(update, range); 
}

function mods() {
    document.getElementById("form").style.display = "none";
    document.getElementById("mode").style.display = "flex";
    document.getElementById("mode-back").addEventListener("click", reload);
}


function reload() {
    location.reload();
}


function update() {
    if (gameOver) {
        return;
    }
    
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.strokeStyle="red";
    context.strokeRect(0,0,board.width,board.height); 

    context.fillStyle="lime";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        eat.play();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="aqua";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over 
    if (snakeX < 0 || snakeX > (cols*blockSize)-1 || snakeY < 0 || snakeY > (rows*blockSize)-1) {
        gameOver = true;
        dead.play();
        alert("You lose");
        but2.style.display = "inline-block";
        but3.style.display = "inline-block";
        but2.addEventListener("click", reload);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            dead.play()
            alert("You lose");
            but2.style.display = "inline-block";
            but3.style.display = "inline-block";
            but2.addEventListener("click", reload);
        }
    }

    document.getElementById("points").innerHTML = "Score: " + snakeBody.length;
}

//controls
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//placing food
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}