'use strict';

import Bullet from './Bullet.js';
import Enemy from './Enemy.js';
import Game from './Game.js';

// 캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement('canvas');
canvas.style.cssText = `
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
`;
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,
  spaceshipImage,
  bulletImage,
  enemyImage,
  gameOverImage,
  explosionImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

// let bulletList = [];
// let explosionList = [];

let g = new Game();

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = 'images/bg.gif';

  spaceshipImage = new Image();
  spaceshipImage.src = 'images/spaceship.png';

  bulletImage = new Image();
  bulletImage.src = 'images/bullet.png';

  enemyImage = new Image();
  enemyImage.src = 'images/enemy.png';

  gameOverImage = new Image();
  gameOverImage.src = 'images/gameOver.png';

  explosionImage = new Image();
  explosionImage.src = 'images/explosion.png';
}

let keysDown = {};
function setupKeyboardListnner() {
  document.addEventListener('keydown', function (event) {
    keysDown[event.key] = true;
  });
  document.addEventListener('keyup', function (event) {
    delete keysDown[event.key];

    if (event.key === ' ') {
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  let b = new Bullet(spaceshipX, spaceshipY);
}

function createEnemy() {
  const interval = setInterval(() => {
    let e = new Enemy(canvas.width, canvas.height);
  }, 1000);
}

function update() {
  // 우주선의 움직임
  if ('ArrowRight' in keysDown) {
    if (spaceshipX + 60 < canvas.width) {
      spaceshipX += 5;
    }
  }
  if ('ArrowLeft' in keysDown) {
    if (spaceshipX > 0) {
      spaceshipX -= 5;
    }
  }
  if ('ArrowDown' in keysDown) {
    if (spaceshipY + 60 < canvas.height) {
      spaceshipY += 5;
    }
  }
  if ('ArrowUp' in keysDown) {
    if (spaceshipY > 0) {
      spaceshipY -= 5;
    }
  }

  // 총알의 y좌표 업데이트
  for (let i = 0; i < Bullet.bulletList?.length; i++) {
    if (Bullet.bulletList[i].alive) {
      Bullet.bulletList[i].update();
      Bullet.bulletList[i].checkHit();
    }
  }
  for (let i = 0; i < Enemy.enemyList?.length; i++) {
    Enemy.enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${Game.score}`, 20, 20);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';

  for (let i = 0; i < Bullet.bulletList?.length; i++) {
    if (Bullet.bulletList[i].alive) {
      ctx.drawImage(
        bulletImage,
        Bullet.bulletList[i].x,
        Bullet.bulletList[i].y
      );
    }
  }

  for (let i = 0; i < Enemy.enemyList?.length; i++) {
    ctx.drawImage(enemyImage, Enemy.enemyList[i].x, Enemy.enemyList[i].y);
  }

  if (Bullet.explosionList?.length > 0) {
    let explosion = Bullet.explosionList.shift();
    ctx.drawImage(explosionImage, explosion.x, explosion.y);
  }
}

function main() {
  if (!Game.gameOver) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 0, 100, 400, 400);
    g.createRetryBtn();
  }
}

loadImage();
setupKeyboardListnner();
createEnemy();
main();

// backgroundImage.addEventListener("load", () => {
//   ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
// });

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 300, 300);
