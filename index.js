//get game board
let board = document.querySelector("#gameBoard");
let head =null;

let snake = {
    body:[], //array of arrays
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
    snake.body.push([]);
    snake.body[0].push(headLocation.x); //the x
    snake.body[0].push(headLocation.y); //the y
    console.log(snake.body);

}

//have the game update
function tick()
{
    
    //the first array will need to be affected by a loop
    //change the x
    snake.body[0][0]= snake.body[0][0]+ snake.nextDirection[0];
    
    //change the y
    snake.body[0][1] =snake.body[0][1] + snake.nextDirection[1];

    //go and render the movement of the snake
    render();
}

function render()
{
    head.getBoundingClientRect.x = snake.body[0][0];
    head.getBoundingClientRect.y = snake.body[1][0];
}

//update the game every 30 frames
setInterval(tick, 1000/30)

//start button pressed
let startButton = document.querySelector("#start");
startButton.addEventListener("click",startGame);