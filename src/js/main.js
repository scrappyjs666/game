import '../styles/style.css'
import { gsap } from "gsap";

//bacground
const canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circ = document.querySelectorAll('Circle');


const c = canvas.getContext('2d');

class Circle {
  constructor(x, y, radius, dx, dy, color, shadowBlur, shadowColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.shadowBlur = shadowBlur;
    this.shadowColor = shadowColor;
  }
  draw() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.shadowBlur = this.shadowBlur;
  c.shadowColor = this.shadowColor;
  c.fill();
  c.stroke();

  this.update();
  }
  update() {
  if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }
  if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
    this.dy = -this.dy;
  }

  this.x += this.dx;
  this.y += this.dy;
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shadowArray = [
  '#D2E2F9',
  '#C8D6FC',
];

const colorsArray = [
  '#D2E2F9',
  '#C8D6FC',
  '#21337F',
  '#93ACF2',
  '#3458AE',
  '#7699E7',
  '#B6C9FB',
];

const circlesArray = [];

for (let i = 0; i <100; i++) {
  let radius = 2.2;
  let x = Math.random() * (window.innerHeight - radius * 2) + radius;
  let y = Math.random() * (window.innerWidth - radius * 2) + radius;

  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 2.5;
  
  const colorIndex = randomInteger(1, colorsArray.length - 1);
  const shadowIndex = randomInteger(1, shadowArray.length - 1);
  
  circlesArray.push(new Circle(x, y, radius, dx, dy, colorsArray[colorIndex], 15, shadowArray[shadowIndex]));
}


function animate () {
  requestAnimationFrame(animate);
  
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].draw();
  }
}

animate();

//main js
const btnwelcome = document.querySelector('.welcome-field__button');
const gamefield = document.querySelector('.game-field');
const settingfield = document.querySelector('.setting__field');
const btnsetting = document.querySelector('.setting-field__button ');
btnwelcome.addEventListener('click', () => {
  // welcomefield.remove();
  // settingfield.style.display = 'inline';
  welcomeBtnLeavePage();
})



//welcome field
const welcomefield = document.querySelector('.welcome-field');
const welcometitle = document.querySelector('.welcome-field__title');
const welcomedescr = document.querySelector('.welcome-field__descr');

const splitText = (el) => {
	el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
  return `<div class="word">` +
			m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
			`</div>`;
	});
	return el;
};

const splitwelcomedescr = splitText(welcomedescr);
const splitwelcometitle = splitText(welcometitle);

function random(min, max){
  return (Math.random() * (max - min)) + min;
}

window.onload = () => {
  setTimeout(() => {
  onloadWelcomTitle();
  onloadWelcomDescr();
  }, 5000);
}

function onloadWelcomTitle () {
  Array.from(splitwelcometitle.querySelectorAll('.letter')).forEach((el, idx) => {
	gsap.from(el, 2.5, {
		opacity: 0,
		scale: .1,
		x: random(-500, 500),
		y: random(-500, 500),
		z: random(-500, 500),
		delay: idx * 0.2,
		repeat: 0,
	})
});
}

function onloadWelcomDescr() {
  Array.from(splitwelcomedescr.querySelectorAll('.letter')).forEach((el, idx) => {
	gsap.from(el, .5, {
		opacity: 0,
		scale: .1,
		x: random(-500, 500),
		y: random(-500, 500),
		z: random(-500, 500),
		delay: idx * 0.02,
		repeat: 0,
	})
});

}

function welcomeBtnLeavePage() {
  gsap.to('.welcome-field__title', {delay: 0.5, duration: 2, ease: "bounce.out", x: 1500 });
  gsap.to('.welcome-field__descr', {delay: 1, duration: 2, ease: "bounce.out", x: -1500 });
  gsap.to('.welcome-field__button', {delay: 1, duration: 2, ease: "bounce.out", y: 1500 });
  gsap.to('.welcome-field', {opacity: 0, duration: 2.5});
  setTimeout(() => {
    gameOverfield.remove();
  }, 3000);
}

//game setting 
// GameSetting pop-up style
window.onload = () => {
  setTimeout(() => {
    gameSettingStyle();
  }, 1000);
}
function gameSettingStyle() {
  gsap.from('.setting__descr', {delay: 0.5, duration: 2, ease: "bounce.out", x: 1500 });
  gsap.from('.setting-controls__image', {delay: 0.5, duration: 2, ease: "bounce.out", x: -1500 });
  gsap.from('.setting-controls__spacebar', {delay: 0.5, duration: 2, ease: "bounce.out", x: 1500 });
  gsap.from('.setting-field__button ', {delay: 1, duration: 2, ease: "bounce.out", y: 1500 });
  gsap.from('.setting__field', {opacity: 0, duration: 2.5});
}
  
//GameSetting btn settingfield close
btnsetting.addEventListener('click', gameSettingBtnClose);
function gameSettingBtnClose() {
  // gamefield.style.display = 'grid';
  gsap.to('.setting__descr', {delay: 0.5, duration: 2, ease: "bounce.out", x: 1500 });
  gsap.to('.setting-controls__image', {delay: 0.5, duration: 2, ease: "bounce.out", x: -1500 });
  gsap.to('.setting-controls__spacebar', {delay: 0.5, duration: 2, ease: "bounce.out", x: 1500 });
  gsap.to('.setting-field__button ', {delay: 1, duration: 2, ease: "bounce.out", y: 1500 });
  gsap.to('.setting__field', {opacity: 0, duration: 2.5});
}



//game field
const startGame = document.querySelector('.game-field__startgame');
const timer = document.querySelector('.timer');
const player = document.querySelector('#player');
const ammo = document.querySelector('.ammo');
const ammoAmount = document.querySelectorAll('.ammo__amount');
const modalammoBtn = document.querySelector('.modal-ammo__btn');
const heartIMG = document.querySelectorAll('.game-field__heart');
const gameOverfield = document.querySelector('.gameOver-field');
const hitAudio = new Audio('sound/odinochnyiy-lazernyiy-vyistrel.mp3')

let lifes = 3;
let interval = null;

//start game

//control for game
document.addEventListener('keydown', movedirection);
function movedirection(event) {
  if(event.key === 'w' || event.key === 'W' || event.key === 'Ц'|| event.key === 'ц' || event.keyCode === 38) {
    player.style.top = player.offsetTop - 25 + 'px';
  }  
  if(event.key === 's' || event.key === 'S' || event.key === 'Ы'|| event.key === 'ы' || event.keyCode === 40) {
    player.style.top = player.offsetTop + 25 + 'px';
  }
  if(event.key === 'a' || event.key === 'A' || event.key === 'ф'|| event.key === 'Ф'|| event.keyCode === 37) {
    player.style.left = player.offsetLeft - 25 + 'px';
  }
  if(event.key === 'd' || event.key === 'D' || event.key === 'в'|| event.key === 'В'||event.keyCode === 39) {
    player.style.left = player.offsetLeft + 25 + 'px';
  }
  if (event.keyCode === 32) { 
    hitAudio.play();
    setTimeout(createBullet, 500);
    // deleteAmmonimg();
  }  
}

// delete modal window (gamefield)
modalammoBtn.addEventListener('click', () => {
  modalammoBtn.parentNode.parentNode.removeChild(modalammoBtn.parentNode);
})

  //random enemymodelIMG
const enemyimgArray = [
  'images/enemy1.png',
  'images/enemy2.png',
  'images/enemy3.png',
  'images/enemy4.png',
  'images/enemy5.png',
  'images/enemy7.png',
]


//random acceleration enemy model
function randomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

//random enemy respawn position (top)
function randomEnemyTop(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//create enemy 
function createEnemy() {
  const enemyIndex = randomInteger(1, enemyimgArray.length - 1);
  let enemyimgrandom = enemyimgArray[enemyIndex];
  let randomEnemyTopresult = randomEnemyTop(5, 87);
  let enemy = document.createElement('img')
  let enemyLeft = enemy.offsetLeft - 2;
  enemy.setAttribute('src', enemyimgrandom);
  enemy.className = 'enemy';
  enemy.style.top = randomEnemyTopresult + '%';
  gamefield.appendChild(enemy);
  enemyMove(enemy);
  let removeTimer = setInterval(() => {
    if(
    enemy.offsetLeft + enemy.width < 99 && lifes > 0 || enemy.offsetTop > player.offsetTop && enemy.offsetTop < player.offsetTop + player.height && enemy.offsetLeft <= player.offsetLeft ) 
    {
    lifes--;
    removeheartImg();
    removeEnemy(enemy, 500);
    clearInterval(removeTimer);
    }
  }, 500);
}

// deleteheartImg
function removeheartImg() {
  const heartIMG = document.querySelectorAll('.game-field__heart');
  heartIMG[heartIMG.length - 1].remove();
}

//removeEnemy if enemy < gamefield
function removeEnemy(enemy, time) {
  enemy.setAttribute('src', 'images/boom.gif');
  setTimeout(() => {
  enemy.remove(); 
  }, time);
}

//create bullet function 
function createBullet() {
  let bullet = document.createElement('div');
  bullet.className = 'bullet';
  bullet.style.top = player.offsetTop + 50 + 'px';
  bullet.style.left = player.offsetLeft + 150 + 'px';
  gamefield.appendChild(bullet);
  bulletMove(bullet);
}

//create enemyMove 
function enemyMove(enemy){
  let randomSpeedresult = randomSpeed(15, 19);
  setInterval(() => {
  enemy.style.left = enemy.offsetLeft - randomSpeedresult + 'px';
  }, 100); 
}

//bulletmove and remove bullet if bullet >= gamefield
function bulletMove(bullet){
  let timer = setInterval(() => {
  bullet.style.left = bullet.offsetLeft + 25 + 'px';
  isShot(bullet);
  if(bullet.offsetLeft > gamefield.clientWidth){
  bullet.remove();
  clearInterval(timer);
    }
  },30);
}

//if shot=enemy enemyRemove
function isShot(bullet) {
  let enemy = document.querySelector('.enemy');
  if(enemy != null) {
  let enemyTop = enemy.offsetTop;
  let bulletTop = bullet.offsetTop;
  
  let bulletBottom = bullet.offsetTop + bullet.offsetHeight;
  let enemyBottom = enemy.offsetTop + enemy.offsetHeight;

  let bulletLeft = bullet.offsetLeft + 2;
  let enemyLeft = enemy.offsetLeft + 2;
  let gamefieldLeft = gamefield.offsetLeft;
  if(bulletBottom <= enemyBottom &&  bulletLeft + bullet.offsetWidth >= enemyLeft && bulletLeft <= enemyLeft + enemy.offsetWidth && bulletTop >= enemyTop) {
    removeEnemy(enemy, 700);
    bullet.remove();
    clearInterval(interval);
  }
  }
}

//click for a  startGame
startGame.addEventListener('click', function(){
  startGame.style.display = 'none';
  // gameEND();
  setTimeout(() => {
  createEnemy();
  }, 1000);
  let enemyTimer = setInterval(() => {
  const heartIMG = document.querySelectorAll('.game-field__heart');
  if(lifes < 1) {
    const b1 = document.querySelectorAll('.enemy');
    b1.forEach(enemy => enemy.remove());
    gamveOverResult();
    clearInterval(enemyTimer);
  }
  createEnemy();
  }, 7000 );
})

//gameEND(Lose)
function gameEND() {
  let gameENDtimer = setInterval(() => {
  if(lifes < 1) {
    gamefield.style.display = 'none';
    gameOverfield.style.display = 'grid';
    gameOverStyles();
    clearInterval(gameENDtimer);
  }
  }, 100);
}

// game timer (result)
const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const millisecondElement = document.querySelector('.milliseconds');

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let intervalTimer

startGame.addEventListener('click', () => {
  clearInterval(intervalTimer);
  intervalTimer = setInterval(startTimer, 10);
});

function startTimer() {
  millisecond++;
  if(millisecond < 9)  {
    millisecondElement.innerText = "0" + millisecond;
  }
  if(millisecond > 0) {
    millisecondElement.innerText = millisecond;
  }
  if(millisecond> 99) {
    second++;
    secondElement.innerText = '0' + second;
    millisecond = 0;
    millisecondElement.innerText = '0' + millisecond;
  }
  if(second < 9) {
    secondElement.innerText = '0' + second;
  }
  if(second > 9) {
    secondElement.innerText = second;
  }
  if(second > 59) {
    minute++;
    minuteElement.innerText = '0' + minute;
    second = 0;
    secondElement.innerText = '0' + second;
  }
  if(minute > 9) {
    minuteElement.innerText = minute;
  }
  if(hour > 9) {
    hourElement.innerText = minute;
  }
}

//gameOver field

// resetTimer game if gameOver
// resetButton.addEventListener('click', () =>{
//   hour = 0;
//   minute = 0;
//   second = 0;
//   millisecond = 0;
//   hourElement.textContent = '00';
//   minuteElement.textContent = '00';
//   secondElement.textContent = '00';
//   millisecondElement.textContent = '00';
// })

const gameOverResult = document.querySelector('.gameOver__result');
const gameOverGameClose = document.querySelector('.gameOver__GameClose');
// const gameOverText = document.querySelector('.gameOver__text');
function gamveOverResult() {
  gameOverResult.innerText = `YOUR SCORE: ${hourElement.textContent}:${minuteElement.textContent}:${secondElement.textContent}:${millisecond}`;
}

//Gameover pop-up style
function gameOverStyles() {
  gsap.from('.inviteInterview', {duration: 4, delay:0.7, ease: "slow(0.7, 0.7, false)", y: -1500 });
  gsap.from('.gameOver__text', {duration: 3.5, delay:0.6, ease: "slow(0.7, 0.7, false)", y: -1500 });
  gsap.from('.gameOver__result', {duration: 3, delay: 0.5 , ease: "slow(0.7, 0.7, false)", y: -1500 });
  gsap.from('.gameOver__repeat', {duration: 2.5, delay:0.4, ease: "slow(0.7, 0.7, false)", y: -1500 });
  gsap.from('.gameOver__buttons', { opacity: 0 , duration: 4, delay: 2});
}

//gameOver btn gameClose
gameOverGameClose.addEventListener('click', gameOverBtnCloseStyle);
function gameOverBtnCloseStyle() {
  gsap.to('.inviteInterview', {delay: 2, duration: 3.5, ease: "bounce.out", y: 1500 });
  gsap.to('.gameOver__text', {delay:1.6, duration: 3, ease: "bounce.out", y: 1500 });
  gsap.to('.gameOver__result', {delay: 1.2, duration: 2.5, ease: "bounce.out", y: 1500 });
  gsap.to('.gameOver__repeat', {delay:0.8, duration: 2, ease: "bounce.out", y: 1500 });
  gsap.to('.gameOver__buttons', {delay:0.4, duration: 1.5, ease: "bounce.out", y: 1500 });
  gsap.to('.gameOver-field', {opacity: 0, duration: 1.5});
  setTimeout(() => {
    gameOverfield.remove();
  }, 2000);
}


