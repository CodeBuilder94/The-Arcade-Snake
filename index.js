//get game board
let board = document.querySelector("#gameBoard");

let snake = {
    body:[],
    nextDirection:[1,0] //determins the direction of the snake (x,y)
}

let gameState ={
    food:[],
    snake: snake
}
//function for start of the page

//function to start game
function startGame(ev)
{
    //remove the button
    ev.target.remove();

    //create the snake
    createSnake();
}

//create the snake
function createSnake()
{
    let head = document.createElement("div");
    head.style.height = "30px";
    head.style.width = "30px";
    head.style.backgroundColor ="green";
    board.appendChild(head);

    //add head location to snake obj
    headStart();
}

function headStart()
{
    snake.body.push();
}

//start button pressed
let startButton = document.querySelector("#start");
startButton.addEventListener("click",startGame);