//get game board
let board = null;
let row = null;

let snake = {
    body:[], //array of arrays
    nextDirection:[0,-1], //determins the direction of the snake (x,y)
    speed: 1
}

let gameState ={
    food:[],
    foodPresent:false,
    snake: snake
    
}
//function for start of the page

//function to start game
function startGame(ev)
{
    //remove the button
    ev.target.remove();

    //make the board
    makeBoard();
    
    //create the snake
    createSnake();
    

    //update the game every 30 frames
    setInterval(tick, 1000/30);
}

function makeBoard()
{
    board = document.createElement("table");
    board.setAttribute("id","gameBoard");

    let gamePlace = document.querySelector("#gamePlace");
    gamePlace.appendChild(board);


    let colorNum = 1;
    
    //add td and tr
    for(let r =0;r<30;r++)
    {
        

        let newRow = document.createElement("tr");
        newRow.style.height ="4px";
        board.appendChild(newRow);
        

        for(let c =0; c<30; c++)
        {
            let newCol = document.createElement("td");
            newCol.style.width ="4px";
            

            //alternate colors for background
            if(colorNum %2 ===1)
            {
                newCol.style.backgroundColor = "darkgray";
                newCol.setAttribute("class","dg");
            }
            else{
                newCol.style.backgroundColor = "lightgray";
                newCol.setAttribute("class","lg");
            }
             
            colorNum++;
            
            newRow.appendChild(newCol);
        }

            colorNum ++;
    }

    row = document.getElementsByTagName("tr");
}

//create the snake
function createSnake()
{
    //change the color of the 14 col and 14 row item
    
    let headRow = row[14];
       
    let col = headRow.cells[14];
        
    col.style.backgroundColor ="green";

    //add head location to body array
    snake.body.push([14,14]);

}



//have the game update
function tick()
{
    

    //go and render the movement of the snake
    moveHead();
    
    //move body
    //render(snakeArr);

    //create the apple
    if(gameState.foodPresent ===false)
    {
        spawnApple();
    }
    
}

function moveHead()
{
    let head = snake.body[0];
    let headX =head[0];
    let headY = head[1];

    let headR = board.children;
    let headC = headR[head[0]].children[head[1]];
    

    if(snake.nextDirection[1]===-1)
    {
        //move up
        colorDefault(headC);

        head[0] -=snake.speed;

        headC = headR[head[0]].children[head[1]];
        headC.style.backgroundColor = "green";


        
    }
    else if(snake.nextDirection[1] === 1)
    {
        //move down
        colorDefault(headC);

        head[0] +=snake.speed;

        headC = headR[head[0]].children[head[1]];
        headC.style.backgroundColor = "green";


        
    }
    else if(snake.nextDirection[0]===1)
    {
        //move left
        colorDefault(headC);

        head[1]-=snake.speed;

        headC = headR[head[0]].children[head[1]];
        headC.style.backgroundColor = "green";
    }
    else 
    {
        //move right
        colorDefault(headC);

        head[1] +=snake.speed;

        headC = headR[head[0]].children[head[1]];
        headC.style.backgroundColor = "green";
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

function spawnApple()
{
    gameState.foodPresent =true;

    //select a random cell to put the apple in
    let appleR =Math.floor(Math.random()*30);

    gameState.food[0] = appleR;

    let appleC = Math.floor(Math.floor(Math.random()*30))

    gameState.food[1] =appleC;

    //check to see if the snake is alredy there
    


}

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
            break;
        case 38:
            //up arrow
            snake.nextDirection[0]=0;
            snake.nextDirection[1]=-1;
            break;
        case 39:
            //right arrow
            snake.nextDirection[0]=-1;
            snake.nextDirection[1]=0;
            break;
        case 40:
            //down arrow
            snake.nextDirection[0]=0;
            snake.nextDirection[1]=1;
            break;
    }
}

function colorDefault(square)
{
    if(square.classList.contains("lg"))
        {
            square.style.backgroundColor = "lightgray";
        }
        else
        {
            square.style.backgroundColor = "darkgray";
        }
}