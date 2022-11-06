//get game board
let board = document.querySelector("#gameBoard");
let head =null;

let snake = {
    body:[[]], //array of arrays
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
   let head = createSnake();
    
    //add head location to snake obj
    headStart();

    //update the game every 30 frames
    setInterval(tick, 1000/30);
}

//create the snake
function createSnake()
{
    head = document.createElement("div");
    head.style.height = "30px";
    head.style.width = "30px";
    head.style.backgroundColor ="green";
    board.appendChild(head); 
    return head;
}

function headStart()
{
    //get the location data of the head
    let headLocation =head.getBoundingClientRect();

    let snakeBodyArr = snake.body;
    snakeBodyArr[0].push(headLocation.x); //the x
    snakeBodyArr[0].push(headLocation.y); //the y
    console.log(snake.body);

}

//have the game update
function tick()
{
    
    //the first array will need to be affected by a loop
    //change the x
    //snake.body[0][0]= snake.body[0][0];
    
    //change the y
    let snakeArr = snake.body[0];
    snakeArr[1] =snakeArr[1] + 10

    //go and render the movement of the snake
    render(snakeArr);
}
    
function render(snakeArr)
{
    let headLocation = head.getBoundingClientRect();
    //headLocation.x 
    head.style.top = parseInt(head.style.top) + 50 + "px";
    console.log(head.style.top);
    //headLocation.y = snakeArr[1];
    //console.log(headLocation.y);
}



//start button pressed
let startButton = document.querySelector("#start");
startButton.addEventListener("click",startGame);