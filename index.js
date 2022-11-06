//get game board
let board = document.querySelector("#gameBoard");
let head =null;

let snake = {
    body:[[]], //array of arrays
    nextDirection:[0,-1] //determins the direction of the snake (x,y)
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
    head.style.position ="absolute";
    head.style.top ="300px";
    head.style.left ="300px";
    head.style.right = "300px";
    head.style.bottom = "300px";
   
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
}

//have the game update
function tick()
{
    
    
    let snakeArr = snake.body[0];
    //change the x
    //snakeArr[0]= snakeArr[0]+10;
    
    //change the y
    
    snakeArr[1] =snakeArr[1] + 10

    //go and render the movement of the snake
    moveHead();
    //render(snakeArr);


}

function moveHead()
{
    if(snake.nextDirection[1]===-1)
    {
        //move up
        head.style.transition = "top 10s linear";
        head.style.top = "-10px";
        
        
    }
    else if(snake.nextDirection[1] === 1)
    {
        //move down
        head.style.transition = "bottom 10s linear";
        head.style.bottom = "10px";
        
    }
    else if(snake.nextDirection[0]===1)
    {
        //move left
        head.style.transition = "left 10s linear";
        head.style.left = "10px";
    }
    else
    {
        head.style.transition = "right 10s linear";
        head.style.right = "10px";
    }
}
    
//function render(snakeArr)
//{
    //let headLocation = head.getBoundingClientRect();
    //headLocation.x 
    
    //move the head up
    //head.style.transform = "translateY(-10px)";
    
    
    //headLocation.y = snakeArr[1];
    //console.log(headLocation.y);
//}



//start button pressed
let startButton = document.querySelector("#start");
startButton.addEventListener("click",startGame);

//arrow keys
document.onkeyup = function(ev)
{
    switch (ev.keyCode)
    {
        case 37:
            //left arrow
            snake.nextDirection[0]=1;
            snake.nextDirection[1]=0;
            head.style.transition ="notransition";
            break;
        case 38:
            //up arrow
            snake.nextDirection[0]=0;
            snake.nextDirection[1]=-1;
            head.style.transition ="notransition";
            break;
        case 39:
            //right arrow
            snake.nextDirection[0]=-1;
            snake.nextDirection[1]=0;
            head.style.transition ="notransition";
            break;
        case 40:
            //down arrow
            snake.nextDirection[0]=0;
            snake.nextDirection[1]=1;
            head.style.transition ="notransition";
    }
}