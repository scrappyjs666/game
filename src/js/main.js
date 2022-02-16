import '../styles/style.css'
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

console.log(circlesArray);

function animate () {
  requestAnimationFrame(animate);
  
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].draw();
  }
}

animate();

//js hero scripts
const btnplay = document.querySelector('.welcome-field__button');
const welcomefield = document.querySelector('.welcome-field');
btnplay.addEventListener('click', () => {
  welcomefield.remove();
  function createbulletimg() {
    let bulletimg = document.createElement('img');
    bulletimg.className = 'ammo__amount';
    bulletimg.setAttribute('src', 'images/bullet.png');
    ammo.append(bulletimg);
  }
  for(let i = 0; i <=9; i ++) {
    setTimeout(createbulletimg, 700 * i);
  }
})

//game field

const player = document.querySelector('#player');
const gamefield = document.querySelector('.game-field');
const ammo = document.querySelector('.ammo');
const ammoAmount = document.querySelectorAll('.ammo__amount');
const modalammoBtn = document.querySelector('.modal-ammo__btn');


//control for game
document.addEventListener('keydown', movedirection);

function movedirection(event) {
  if(event.key === 'w' || event.key === 'W' || event.key === 'Ц'|| event.key === 'ц' || event.keyCode === 38) {
    player.style.top = player.offsetTop - 15 + 'px';
  }  
  if(event.key === 's' || event.key === 'S' || event.key === 'Ы'|| event.key === 'ы' || event.keyCode === 40) {
    player.style.top = player.offsetTop + 15 + 'px';
  }
  if(event.key === 'a' || event.key === 'A' || event.key === 'ф'|| event.key === 'Ф'|| event.keyCode === 37) {
    player.style.left = player.offsetLeft - 15 + 'px';
  }
  if(event.key === 'd' || event.key === 'D' || event.key === 'в'|| event.key === 'В'||event.keyCode === 39) {
    player.style.left = player.offsetLeft + 15 + 'px';
  }
  if (event.keyCode === 32) { 
    setTimeout(createBullet, 500);
    deleteAmmonimg();
  }  
}

//delete modal window (ammoOFF)
modalammoBtn.addEventListener('click', () => {
  modalammoBtn.parentNode.parentNode.removeChild(modalammoBtn.parentNode);
})


function deleteAmmonimg() {
  const ammoAmount = document.querySelectorAll('.ammo__amount');
  ammoAmount[ammoAmount.length - 1].remove();
  if(ammoAmount.length === 1) {
    messageAmmountOff();
  }
} 


function messageAmmountOff() {
  const newtextammo = document.createElement('div');
  newtextammo.innerHTML = 'Пули закончились, я тебя предупреждал!';
  newtextammo.className = 'messageAmmountOff';

  const newtextammoBtn = document.createElement('img');
  newtextammoBtn.setAttribute('src', 'images/btnimg.png');
  newtextammoBtn.setAttribute('draggable', "false");
  newtextammoBtn.className = 'messageAmmountBtn';
  newtextammo.appendChild(newtextammoBtn);
  ammo.appendChild(newtextammo);
  newtextammoBtn.addEventListener('click', () => {
    newtextammoBtn.parentNode.parentNode.removeChild(newtextammoBtn.parentNode);
  })
}

//create bullet function 
function createBullet() {
  const ammoAmount = document.querySelectorAll('.ammo__amount');
  if(ammoAmount.length >= 1){
  let bullet = document.createElement('div');
  bullet.className = 'bullet';
  bullet.style.top = player.offsetTop + 50 + 'px';
  bullet.style.left = player.offsetLeft + 150 + 'px';
  gamefield.appendChild(bullet);
  isShot(bullet);
  let timer = setInterval(function(){
    bullet.style.left = bullet.offsetLeft + 25 + 'px';
    bullet.style.top = bullet.offsettop + 100 + 'px';
    if(bullet.offsetLeft > gamefield.clientWidth){
      bullet.remove();
    }
  },50);
  }
}


//random enemymodelIMG
const enemyimgArray = [
  'images/enemy1.png',
  'images/enemy2.png',
  'images/enemy3.png',
  'images/enemy4.png',
  'images/enemy5.png',
  'images/enemy7.png',
]
const enemyIndex = randomInteger(1, enemyimgArray.length - 1);
let enemyimgrandom = enemyimgArray[enemyIndex];

//create enemy function
function createEnemy() {
  let enemy = document.createElement('img');
  enemy.setAttribute('src', enemyimgrandom);
  enemy.className = 'enemy';
  enemy.style.top = randomEnemyTopresult + '%';
  gamefield.appendChild(enemy);
  
  let timerID = setInterval(() =>{
  enemy.style.left = enemy.offsetLeft - randomSpeedresult + 'px';
  }, 100);
  enemy.dataset.timer = timerID;
}



//function for random acceleration enemy model
let randomSpeedresult = randomSpeed(5, 9);
function randomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

let randomEnemyTopresult = randomEnemyTop(5, 87);
function randomEnemyTop(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
  
  createEnemy();


function isShot(bullet) {
  let enemy = document.querySelector('.enemy');
  let bulletTop = bullet.offsetTop;
  let bulletBottom = bullet.offsetTop + bullet.offsetHeight;
  let bulletLeft = bullet.offsetLeft;
  let enemyTop = enemy.offsetTop;
  let enemyBottom = enemy.offsetTop + enemy.offsetHeight;
  let enemyLeft = enemy.offsetLeft;
  let enemyY = enemy.offsetWidth;
  let bulletY = bullet.offsetWidth;
  console.log(enemyY);
    if(bulletY === enemyY) {
      enemy.setAttribute('src', 'images/boom.gif');
      setTimeout(() => {
        enemy.remove();
      }, 1000);
    }
} 

