//  Game cosntents &  variables
let speed = 8;
let score = 0;



function gameEngine() {
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        if(score>bestscoreval){
            bestscoreval = score;
            localStorage.setItem('bestscore', JSON.stringify(bestscoreval));
            bestScoreBox.innerHTML = "Best Score: " + bestscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
    }
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
