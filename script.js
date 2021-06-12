//----------------------
//  repeticion de clase + some change:
//----------------------

let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#E8AB94"

// getting the paintbrush
let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
let gameOver = false; // to cancel the animation in some point 
let intervalId = null;
// variavles for circle
let circleX = 100, circleY = 80, radius = 20
let incrX = 2, incrY = 2

//Score
let score = 0;

// variavles for paddle
let paddleX = 200, paddleHeigth = 20, paddleWidth = 200;
let isLeft = false, isRigth = false;

//Audio
let startAudio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1623305320/Horizon_Zero_Dawn_OST_-_Years_Of_Training_badkhk.mp3')
let gameOverAudio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1615874740/aom/home_bhfqfk.mp3')


function drawCircle() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(circleX, circleY, radius, 0, 2*Math.PI);
    ctx.fill();   
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddleX, canvas.height - paddleHeigth, paddleWidth, paddleHeigth);
    ctx.closePath();
}

function collision() {
     //collision
    //rigth
    if (circleX + radius > canvas.width){
        incrX--
    }

    //bottom
    if (circleY + radius > canvas.height - paddleHeigth){
        if(circleX < paddleX + paddleWidth && circleX > paddleX){
            incrY = -incrY
            score++
        }else{
            gameOver = true;
        }
    }
    //left
    if (circleX - radius < 0){
        incrX = -incrX
    }
    //up
    if (circleY - radius < 0){
        incrY = -incrY
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'white';
    ctx.font = '54px Roboto'
    ctx.fillText(`Score: ${score}`, 100, 50)

    // Draw a circle and movement
    drawCircle()
     circleX = circleX + incrX
     circleY = circleY + incrY

     // Draw a paddle and movement
     drawPaddle()

     if( isRigth && paddleX + paddleWidth < canvas.width) {
        paddleX = paddleX + 10
     }
     if(isLeft && paddleX > 0) {
        paddleX = paddleX - 10
     }

     //collision
     collision()

    if(gameOver) {  // everything in the game is happening in this block of code
        cancelAnimationFrame( intervalId )
        canvas.style.display = 'none'
        startBtn.style.display = 'none'
        restartBtn.style.display = 'block'
        gameOverAudio.play()
        startAudio.pause()
        gameOverAudio.volume = 0.5
    }else{
        requestAnimationFrame( animate ) // this is an example of recursive function
    }
}

function start(){
    canvas.style.display = 'block'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    animate()
    startAudio.play()
    gameOverAudio.pause()
    startAudio.volume = 0.1
} 

//Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    
    // just so that we can build the game faster
    // you wont do this in real games
    //start()

    document.addEventListener('keydown', (event) =>{
        if (event.code === 'ArrowRight'){
            isRigth = true;
            isLeft = false;
            //paddleX = paddleX + 10;  ==> the condition have to be in animate in order to be smooth!!
        }else if(event.code === 'ArrowLeft'){

            isRigth = false;
            isLeft = true;
            //paddleX = paddleX - 10;  ==> the condition have to be in animate in order to be smooth!!
        }
    })

    document.addEventListener('keyup', () => {
        isLeft = false;
        isRigth = false;
    })

    startBtn.addEventListener('click', () => {
        start()
    })

    restartBtn.addEventListener('click', () => {
        // do something when the user clicks the restart button
        // reset the values in your game    
        gameOver = false;
        circleX = 50;
        circleY = 50;
        score = 0;
        start()
    })
})