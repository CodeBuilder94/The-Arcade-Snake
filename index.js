//get game board
let board = null;
let row = null;

let snake = {
    body:[], //array of arrays
    nextDirection:[0,-1] //determins the direction of the snake (x,y)
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
            }
            else{
                newRow.style.backgroundColor = "lightgray";
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
    snake.body.push([headRow,col]);

}



//have the game update
function tick()
{
    

    //go and render the movement of the snake
    moveHead();
    //render(snakeArr);

    //create the apple
    spawnApple();
}

function moveHead()
{
    let head =row;
    console.log(head);

    if(snake.nextDirection[1]===-1)
    {
        //move up
        //let col = row.cells[head[0]];
        let headRow = row[head[1]];

        



        

        
        
        
    }
    else if(snake.nextDirection[1] === 1)
    {
        //move down
        
        
    }
    else if(snake.nextDirection[0]===1)
    {
        //move left
        
    }
    else 
    {
        //move right
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

function spawnApple(){

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