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
    snake: snake,
    score:0,
    highScore:0,
    start:false
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
    
    gameState.start=true;

    //update the game every 30 frames
    setInterval(tick, 500); //1000/30
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
    if(gameState.start===true)
    {
        //go and render the movement of the snake
        moveHead();
        
        //move body
        render();

        //create the apple
        if(gameState.foodPresent ===false)
        {
            spawnApple();
        }

        //check to see if the apple was eaten
        eatApple();
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
        head[0] -=snake.speed;
        
    }
    else if(snake.nextDirection[1] === 1)
    {
        //move down
        head[0] +=snake.speed;
       
    }
    else if(snake.nextDirection[0]===1)
    {
        //move left
        head[1]-=snake.speed;
    }
    else 
    {
        //move right
        head[1] +=snake.speed;
    }

    if(snake.body.length===1)
    {
        colorDefault(headC);
    }

    snakeWarp(head);

    headC = headR[head[0]].children[head[1]];
    headC.style.backgroundColor = "green";
}
 

function render()
{
    /*if(snake.body.length >1)
    {
        let lastPart = snake.body[snake.body.length-1];
        
        //move down the array to move the snake
        for(let i =snake.body.length-1; i>0 ; i--)
        {
            
            snake.body[i[0]] = snake.body[i[0]-1];
            snake.body[i[1]] = snake.body[i[1]-1];
            
        }

        //console.log(snake.body[snake.body.length-1]);

        let resetRow = board.children;
        let resetCol = resetRow[lastPart[0]].children[lastPart[1]];
        
        colorDefault(resetCol);
    }*/
    
}

function snakeWarp(part)
{
    if(part[1]===30)
    {
        part[1]=0;
    }
    else if(part[1]===-1)
    {
        part[1]=29;
    }

    if(part[0]===30)
    {
        part[0]=0;
    }
    else if(part[0]===-1)
    {
        part[0]=29;
    }
}

function spawnApple()
{
    gameState.foodPresent =true;

    //select a random cell to put the apple in
    let appleR =Math.floor(Math.random()*30);

    gameState.food[0] = appleR;

    let appleC = Math.floor(Math.floor(Math.random()*30))

    gameState.food[1] =appleC;

    //check to see if the snake is alredy there
    for(let i=0; i<snake.body.length;i++)
    {
        let head = snake.body[i];
        

       if(head[0]===appleR && head[1]===appleC)
        {
            spawnApple();
        }

    }

    let aRow = board.children;
    let aCol = aRow[appleR].children[appleC];
    aCol.style.backgroundColor ="#D80C0C";

    //add food location
    gameState.food[0]= appleR;
    gameState.food[1]= appleC;

}

function eatApple()
{
    //get score element
    let scoreLabel = document.querySelector("#score");

    //check to see if the head and the apple overlap;
    let head = snake.body[0];
    let appleL = gameState.food;

    if(head[0]===appleL[0] && head[1]===appleL[1])
    {
        gameState.score +=1;
        scoreLabel.innerText = gameState.score;
        spawnApple();
        addBody();
    }
}

function addBody()
{
    //add body to the snake
    let sBody = snake.body[snake.body.length-1];
    
    let newPartC =0;
    let newPartR =0;

    if(snake.nextDirection[0]===-1)
    {
        //place below

        newPartR = sBody[0]+1;
        
        snake.body.push([newPartR,sBody[1]]);

        if(snake.body[snake.body.length-1[0]]===30 ||snake.body[snake.body.length-1[0]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }
        
    }
    else if(snake.nextDirection[0]===1)
    {
        //place above
        newPartR = sBody[0]-1;

        snake.body.push([newPartR,sBody[1]]);

        if(snake.body[snake.body.length-1[0]]===30 ||snake.body[snake.body.length-1[0]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }

    }
    else if(snake.nextDirection[1]===-1)
    {
        //place left
        newPartC = sBody[1]+1;

        snake.body.push([sBody[0],newPartC]);

        if(snake.body[snake.body.length-1[1]]===30 ||snake.body[snake.body.length-1[1]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }

    }
    else if(snake.nextDirection=sBody[1]===1)
    {
        //place right
        newPartC =sBody[1]-1;

        snake.body.push([sBody[0],newPartC]);

        if(snake.body[snake.body.length-1[1]]===30 ||snake.body[snake.body.length-1[1]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }
    }

    console.log(newPartR +" "+newPartC);

    let bodyR = board.children;
    let bodyC = bodyR[sBody[0]].children[sBody[1]];
    
    bodyC.style.backgroundColor ="green";
    console.log(bodyC);
    gameState.start=false;
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

//start button pressed
let startButton = document.querySelector("#start");
startButton.addEventListener("click",startGame);

//arrow keys
document.onkeydown = function(ev)
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
