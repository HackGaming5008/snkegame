//  Game cosntents &  variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 8;
let score = 0;
let lastPrintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPrintTime) / 1000 < 1/speed){
        return;
    }
    lastPrintTime = ctime;
    gameEngine();  
}

function isCollide(snake) {
    // If you bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into the walls
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    
}

function gameEngine() {
    // Part 1: Updating the snake arry and Food 
    if (isCollide(snakeArr)){
        gameOverSound.play();
        // musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        score = 0; 
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>bestscoreval){
            bestscoreval = score;
            localStorage.setItem('bestscore', JSON.stringify(bestscoreval));
            bestScoreBox.innerHTML = "Best Score: " + bestscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
        if(food.y === snakeArr[0].y && food.x === snakeArr[0].x){
            console.log("working")
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
        }
    }

    //Moving the sanke
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){
            snakeElement.classList.add('head')
        }
        else{
        snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//Main logic starts here
let bestscore = localStorage.getItem('bestscore');
if (bestscore === null){
    bestscoreval = 0;
    localStorage.setItem('bestscore', JSON.stringify(bestscoreval));
}
else{
    bestscoreval = JSON.parse(bestscore);
    bestScoreBox.innerHTML = "Best Score: " + bestscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
