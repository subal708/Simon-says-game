// Game state
let gameSeq = [];
let userSeq = [];
let level = 0;
let currentScore = 0;
let highestScore = 0;
let GameStart = false;

let btns = ["yellow", "red", "purple", "green"];

const startBtn = document.querySelector('.new');
const resetBtn = document.querySelector('.reset');

const levelText = document.querySelector('.level');
let highScore = document.querySelector(".highScore");
let currScore = document.querySelector(".currScore");

// START GAME
startBtn.addEventListener('click', function () {
    if (GameStart === false) {
        GameStart = true;
        currScore.innerText = "0";
        level = 0;              //ensure fresh start
        gameSeq = [];           //clear old sequence
        levelUp();
    }
});

//RESET GAME
resetBtn.addEventListener('click', reset);

// FLASH PAD
function gameFlashPad(pad) {
    pad.classList.add('flash');
    setTimeout(() => {
        pad.classList.remove('flash');
    }, 350);
}

//LEVEL UP (UNCHANGED)
function levelUp() {
    userSeq = [];
    level++;
    levelText.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    // console.log(gameSeq); // print the sequence
    gameFlashPad(randBtn);
}

//SCORE CALCULATION
function calcScore(level) {
    let score = 0;

    if (level <= 3) score = level * 2;
    else if (level <= 6) score = (3 * 2) + ((level - 3) * 4);
    else if (level <= 9) score = (3 * 2) + (3 * 4) + ((level - 6) * 6);
    else if (level <= 12) score = (3 * 2) + (3 * 4) + (3 * 6) + ((level - 9) * 8);
    else score = (3 * 2) + (3 * 4) + (3 * 6) + (3 * 8) + ((level - 12) * 10);

    return score;
}

//CHECK ANSWER
function checkAns(indx) {
    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length === gameSeq.length) {
            currentScore = calcScore(level);
            currScore.innerText = currentScore;
            setTimeout(levelUp, 1000);
        }
    } else {
        if (highestScore < currentScore) {
            highestScore = currentScore;
            highScore.innerText = highestScore;
        }

        levelText.innerText = "Game Over!! Play again!";
        startBtn.innerText = "Play Again";

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#dfe8f6";
        }, 150);

        playAgain();
        startBtn.disabled = false;
    }
}

//PAD CLICK
function btnPress() {
    if (!GameStart) return;   //prevent click before start

    let btn = this;
    let userColor = btn.id;  // declare variable
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".pad");
for (let pad of allBtns) {
    pad.addEventListener("click", btnPress);
}

//PLAY AGAIN
function playAgain() {
    GameStart = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    currentScore = 0;
}

//RESET GAME
function reset() {
    GameStart = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    highestScore = 0;
    currentScore = 0;

    currScore.innerText = "0";
    highScore.innerText = "0";
    levelText.innerText = 'Click "Start" to play the Game';
    startBtn.innerText = "Start";
}