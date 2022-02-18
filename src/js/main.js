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
const btnwelcome = document.querySelector('.welcome-field__button');
const gamefield = document.querySelector('.game-field');
const welcomefield = document.querySelector('.welcome-field');
const settingfield = document.querySelector('.setting__field');
const btnsetting = document.querySelector('.setting-field__button ');
btnwelcome.addEventListener('click', () => {
  welcomefield.remove();
  // settingfield.style.display = 'inline';
  createbulletimg();
  for(let i = 0; i <=9; i ++) {
    setTimeout(createbulletimg, 700 * i);
  }
})

btnsetting.addEventListener('click', () => {
  settingfield.remove();
  // gamefield.style.display = 'inline';
})

//game setting start

//game field

const player = document.querySelector('#player');
const ammo = document.querySelector('.ammo');
const ammoAmount = document.querySelectorAll('.ammo__amount');
const modalammoBtn = document.querySelector('.modal-ammo__btn');
const hitAudio = new Audio('sound/odinochnyiy-lazernyiy-vyistrel.mp3')
let enemy = null;
let bullet = null;
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

// imgbullet field create
function createbulletimg() {
    let bulletimg = document.createElement('img');
    bulletimg.className = 'ammo__amount';
    bulletimg.setAttribute('src', 'images/bullet.png');
    ammo.append(bulletimg);
  }

// delete modal window (ammoOFF)
modalammoBtn.addEventListener('click', () => {
  modalammoBtn.parentNode.parentNode.removeChild(modalammoBtn.parentNode);
})

// gamefield lose ammo = delete ammoimg
function deleteAmmonimg() {
  const ammoAmount = document.querySelectorAll('.ammo__amount');
  ammoAmount[ammoAmount.length - 1].remove();
  if(ammoAmount.length === 1) {
    messageAmmountOff();
  }
} 
// message for player ammoOFF
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

// const ammoAmount = document.querySelectorAll('.ammo__amount');
// if(ammoAmount.length >= 1){}


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
  let enemy = document.createElement('img');
  enemy.setAttribute('src', enemyimgrandom);
  enemy.className = 'enemy';
  enemy.style.top = randomEnemyTopresult + '%';
  gamefield.appendChild(enemy);
  enemyMove(enemy);
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
  let randomSpeedresult = randomSpeed(5, 9);
  setInterval(() => {
  enemy.style.left = enemy.offsetLeft - randomSpeedresult + 'px';
  }, 100); 
  // if(enemy.offsetLeft < gamefield.clientWidth) {
  //   enemy.remove();
  // }
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

function isShot(bullet) {
  let enemy = document.querySelector('.enemy');
  if(enemy != null) {
  let enemyTop = enemy.offsetTop;
  let bulletTop = bullet.offsetTop;
  
  let bulletBottom = bullet.offsetTop + bullet.offsetHeight;
  let enemyBottom = enemy.offsetTop + enemy.offsetHeight;

  let bulletLeft = bullet.offsetLeft + 2;
  let enemyLeft = enemy.offsetLeft + 2;

  if(bulletBottom <= enemyBottom &&  bulletLeft + bullet.offsetWidth >= enemyLeft && bulletLeft <= enemyLeft + enemy.offsetWidth && bulletTop >= enemyTop) {
    enemy.setAttribute('src', 'images/boom.gif');
    setTimeout(() => {
    enemy.remove();
    }, 1000);
    bullet.remove();
    clearInterval(interval);
  }
  }
}

gamefield.addEventListener('click', function(){
  createEnemy();
  setInterval(() => {
  createEnemy();
  }, 5000);
})
