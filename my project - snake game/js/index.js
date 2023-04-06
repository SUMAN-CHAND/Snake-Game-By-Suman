//game constant & variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score = 0;
let speed = 8;
let lastPrintTime = 0;
let snakeArr = [{ x: 13, y: 15 }
]
let food = { x: 6, y: 7 };
//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return;

    }
    lastPrintTime = ctime;
    // console.log(ctime);

    gameEngine();
}
function iscollied(snake) {
    //when you bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
           return true;
       }   
    }
    //if you bump into the wall
    if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0 ){
        return true;
    }
}
function gameEngine() {
    //part 1 : updateing the sanke array & Food
    if (iscollied(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Any Key To Play Again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
    //If you have eaten the food, increment the score and regenarate the food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Hiscore :"+ hiscoreval;

        }
        scoreBox.innerHTML=("Score : "+ score);
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moveing the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //part 2 : Render the snake and food
    // Render the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Render the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Game logic start here
musicSound.play();

let hiscore= localStorage.getItem("hiscore");
if(hiscore===null){ 
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore :"+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});