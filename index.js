//get startbutton
let startButton = document.querySelector("#start");
//get game board
let board = null;
let row = null;

let snake = {
    body:[], //array of arrays
    nextDirection:"up",
    speed: 1
}

let gameState ={
    food:[],
    foodPresent:false,
    snake: snake,
    score:0,
    highScore:0,
    start:false,
    secondsOne:0,
    secondsTen:0,
    minutes:0
}


//update the game every 30 frames
let gameRunner = setInterval(tick, 250);

//timer
let ticker = setInterval(timer,1000);


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
    gameState.secondsOne=0;
    gameState.secondsTen=0;
    gameState.minutes=0;

    
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
                newCol.classList.add("dg");
            }
            else
            {
                newCol.classList.add("lg");
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

    col.classList.add("snake");
            
    //add head location to body array
    snake.body.push([14,14]);

}



//have the game update
function tick()
{
    if(gameState.start===true)
    {
                         
        //move body
        render();

        //create the apple
        if(gameState.foodPresent ===false)
        {
            spawnApple();
        }

        //check to see if the apple was eaten
        eatApple();

        if(document.getElementsByClassName("snake").length > snake.body.length)
        {
            let snakeClassList = document.getElementsByClassName("snake");
            let extraPart =snakeClassList[snakeClassList.length-1];
            extraPart.classList.remove("snake");
        }
    }
}
 

function render()
{
    removeSnake();
    moveSnake();
    drawSnake();
}


function moveSnake()
{
    let moveByR = 0;
    let moveByC = 0;
    let head = snake.body[0]

    if(snake.nextDirection ==="up")
    {
        moveByR =-1 *snake.speed;
    }
    else if(snake.nextDirection ==="down")
    {
        moveByR =1 *snake.speed;
    }
    else if(snake.nextDirection ==="left")
    {
        moveByC =-1 *snake.speed;
    }
    else if(snake.nextDirection ==="right")
    {
        moveByC =1 *snake.speed;
    }

    let nextHead =[head[0]+ moveByR, head[1]+moveByC];
    
        
    //check to see if the snake needs to warp
    snakeWarp(nextHead);
    
    snake.body.unshift(nextHead);
    snake.body.pop(snake.body[snake.length-1]);

    //check to see if the game ends
    snakeCollision();
}


function drawSnake()
{
    let sBody = snake.body;
    let table = board.children;
    
    for(let i=0; i< sBody.length; i++)
    {
        
        let bodyPart = sBody[i];
        
        let snakeCell = table[bodyPart[0]].children[bodyPart[1]];
        snakeCell.classList.add("snake");
    }
    
}

function removeSnake()
{
    let snakeBody = document.getElementsByClassName("snake");

    for(let i=0; i< snakeBody.length;i++)
    {
        let snakePart = snakeBody[i];
        snakePart.classList.remove("snake");
    }

}

function snakeCollision()
{
    let snakeHead = snake.body[0];
    for(let o =1; o<snake.body.length;o++)
    {   
        let snakePart = snake.body[o];
        
        if(snakeHead[0]=== snakePart[0] && snakeHead[1] === snakePart[1])
        {
            //game over
            gameState.start=false;
            board.remove();
            snake.body=[];
            snake.nextDirection ="up";
            gameState.foodPresent=false;
            gameState.food=[];

            //check to see if the high score needs updating
            if(gameState.score > gameState.highScore)
            {
                gameState.highScore =gameState.score
                let highS = document.querySelector("#highScoreV");
                highS.innerText = gameState.highScore;
                gameState.score=0;
                
            }

            gameState.score=0;
            
            restart();
        }
    }
}


function snakeWarp(part)
{
    if(part[1]>=30)
    {
        part[1]=0;
    }
    else if(part[1]<=-1)
    {
        part[1]=29;
    }

    if(part[0]>=30)
    {
        part[0]=0;
    }
    else if(part[0]<=-1)
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
    aCol.classList.add("food");

    //add food location
    gameState.food[0]= appleR;
    gameState.food[1]= appleC;

}

function eatApple()
{
    if(gameState.start ===true)
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

            let aRow = board.children;
            let aCol = aRow[appleL[0]].children[appleL[1]];
            aCol.classList.remove("food");

            addBody();
            spawnApple();
        }

    }
    
}

function addBody()
{
    //add body to the snake
    let sBody = snake.body[snake.body.length-1];
    
    let newPartC =0;
    let newPartR =0;
    let oldPartR = sBody[0];
    let oldPartC = sBody[1];


    if(snake.nextDirection==="up")
    {
        //place below
        newPartR = oldPartR+1;

        snake.body.push([newPartR,sBody[1]]);

        if(snake.body[snake.body.length-1[0]]===30 ||snake.body[snake.body.length-1[0]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }
        
    }
    else if(snake.nextDirection === "down")
    {
        //place above
        newPartR = oldPartR-1;

        snake.body.push([newPartR,sBody[1]]);

        if(snake.body[snake.body.length-1[0]]===30 ||snake.body[snake.body.length-1[0]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }

    }
    else if(snake.nextDirection === "right")
    {
        //place left
        newPartC = oldPartC+1;

        snake.body.push([sBody[0],newPartC]);

        if(snake.body[snake.body.length-1[1]]===30 ||snake.body[snake.body.length-1[1]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }

    }
    else if(snake.nextDirection ==="left")
    {
        //place right
        newPartC =oldPartC-1;

        snake.body.push([sBody[0],newPartC]);

        if(snake.body[snake.body.length-1[1]]===30 ||snake.body[snake.body.length-1[1]]===-1)
        {
            snakeWarp(snake.body[snake.body.length-1])
        }
    }
}

function restart()
{
    let startButton = document.createElement("button");
    startButton.innerText = "Restart!";
    startButton.setAttribute("id", "start");
    let gameDiv =document.querySelector("#gamePlace");;
    gameDiv.appendChild(startButton);

    clearInterval(gameRunner);
    clearInterval(ticker);
    
    startButton.addEventListener("click",function(ev)
    {
        gameState.foodPresent=false;
        let gameRunner = setInterval(tick, 250);
        let ticker = setInterval(timer,1000);
        startGame(ev);
    });
    

}

function timer()
{
    if(gameState.start===true)
    {
        let minute = document.querySelector("#minutes");
        let sec = document.querySelector("#secondsOne");
        let secTwo = document.querySelector("#secondsTen");
        
        gameState.secondsOne+=1;

        if(gameState.secondsOne===10)
        {
            gameState.secondsOne=0;
            gameState.secondsTen+=1;
        }

        if(gameState.secondsTen===6)
        {
            gameState.secondsTen=0;
            gameState.minutes+=1;
        }

        minute.innerText=gameState.minutes;
        sec.innerText=gameState.secondsOne;
        secTwo.innerText = gameState.secondsTen;
    }
    
}

//start button pressed
startButton.addEventListener("click",startGame);

//arrow keys
document.onkeydown = function(ev)
{
    switch (ev.keyCode)
    {
        case 37:
        case 65:
            //left arrow
            snake.nextDirection ="left";
            break;
        case 38:
        case 87:
            //up arrow
            snake.nextDirection = "up";
            break;
        case 39:
        case 68:
            //right arrow
            snake.nextDirection = "right";
            break;
        case 40:
        case 83:
            //down arrow
            snake.nextDirection = "down";
            break;
    }
}


