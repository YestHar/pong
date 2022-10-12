const {body} = document;
const canvas = document.createElement('canvas')
const context = canvas.getContext("2d");
const isMobile = window.matchMedia('(max-width:600px)');
const screenWidth = window.screen.width;
const canvasPosition = screenWidth /2 - width / 2;
const gameOver = document.createElement('div');
const width =500;
const height = 550;

const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff=25;
let paddleBottomX=225;
let paddleTopX=225;
let playerMoved = false;
let paddleContent = false;

let ballX = 250;
let ballY=275;
const ballRadius = 5;

let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

let playerScpre = 0;
let computerScore = 0;
let winningScore=7;
let isGameOver = true;
let isNewGame = true;

if(isMobile.matches){
    speedY = -2;
    speedX = speedY;
    computerScore = 4;
} else{
    speedY = -1;
    speedX = speedY;
    computerSpeed = 3;
}


function createCanvas(){
    canvas.width = width;
    canvas.height = height;
    body.appendChild(canvas);
    renderCanvas();
};
function animate(){
    renderCanvas();
    ballMove();
    ballBounderies();
    gameOver();
    computerAI()
    if(!isGameOver){
        window.requestAnimationFrame(animate);
    }
}
function ballReset(){
    ballX = width/2;
    ballY = height/2;
    speedY = -3;
    paddleContent = false;
}
function computerAI(){
    if(playerMoved){
        if(paddleTopX + paddleDiff < ballX){
            paddleTopX += computerSpeed;
        } else {
            paddleTopX += computerSpeed;
        }
    }
}
function gameOvers(){
    if(playerScpre === winningScore || computerScore === winningScore){
        isGameOver = true;
        const winner = playerScpre === winningScore ? 
    }
}
function ballMove(){
    ballY += -speedY;
    if(playerMoved && paddleContent){
        ballX += speedX;
    }
}
function showGameOver(winner){
    canvas.hidden = true;
    gameOver.textContent = '';
    gameOver.classList.add('game-over-container');

    const title = document.createElement('h1');
    title.textContent = '${winner} Wins!';
    const playAgainBtn = document.createElement('button');
    playAgainBtn.getAttribute('onclick','startGame()');
    playAgainBtn.textContent = 'Play Again';

    gameOver.append(title,playAgainBtn);
    body.appendChild(gameOver);

}

function ballBounderies(){
    if(ballX < 0 && speedX < 0){
        speedX = -speedX;
    };
    if(ballX > width && speedX > 0){
        speedX = -speedX;
    };
    if(ballY > height-paddleDiff){
        if(ballX >paddleBottomX && ballX < paddleBottomX + paddleWidth){
            paddleContent = true;
            if(playerMoved){
                speedY -= 1;
                if(speedY < -5){
                    speedY = -5;
                    computerSpeed = 6;
                }
            }
            speedY = -speedY;
            trajectoryX = ballX - (paddleBottomX+paddleDiff);
            speedX = trajectoryX*0.3;
        } else if(ballY>height){
            ballReset();
            computerScore++
        }
    }
    if(ballY < paddleDiff){
    if(ballX >paddleTopX && ballX < paddleTopX + paddleWidth){
        paddleContent = true;
        if(playerMoved){
            speedY += 1;
            if(speedY < 5){
                speedY = 5;
            }
        }
        speedY = -speedY;
        trajectoryX = ballX - (paddleBottomX+paddleDiff);
        speedX = trajectoryX*0.3;
    } else if(ballY <0 ){
        ballReset();
        playerScpre++
    }
}

}



function renderCanvas(){
    context.fillStyle = 'black';
    context.fillRect(0,0,width,height);

    context.fillStyle = 'white';
    context.fillRect(paddleBottomX,height-20,paddleWidth,paddleHeight);
    context.fillRect(paddleTopX,10,paddleWidth,paddleHeight);
    context.beginPath();
    context.setLineDash([4]);
    context.moveTo(0, height/2);
    context.lineTo(width, height/2);
    context.strokeStyle='grey'
    context.stroke();

    context.beginPath();
    context.arc(ballX,ballY,ballRadius,2*Math.PI,false)
    context.fillStyle ='white';
    context.fill()

    context.font = '32px Courier New';
    context.fillText(playerScpre,20,canvas.height/2 + 50)
    context.fillText(computerScore,20,canvas.height/2 - 30)

};

function startGame(){
    if(isGameOver && !isNewGame){
        body.removeChild(gameOver);
        canvas.hidden = false;
    }
    isGameOver = false;
    isNewGame = false;
    playerScpre=0;
    computerScore = 0;
    createCanvas();
    animate();
    canvas.addEventListener('mousemove',(e)=>{
        playerMoved = true;
        paddleBottomX =  e.clientX - canvasPosition - paddleDiff;
        if(paddleBottomX < paddleDiff){
            paddleBottomX = 0;
        }
        if(paddleBottomX >width - paddleWidth){
            paddleBottomX = width - paddleWidth;
        }
        canvas.style.cursor = 'none';
    })
};

startGame()