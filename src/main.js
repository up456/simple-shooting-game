"use strict";

import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";
import Game from "./Game.js";
import Spaceship from "./Spaceship.js";

// 캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
canvas.style.cssText = `
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
`;
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,
  spaceshipImage,
  bulletImage,
  enemyImage,
  gameOverImage,
  explosionImage;

// 우주선 생성
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;
let spaceship = new Spaceship(spaceshipX, spaceshipY);
// 게임 생성
let g = new Game();

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/bg.gif";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.png";

  explosionImage = new Image();
  explosionImage.src = "images/explosion.png";
}

// 적군 생성
function createEnemy() {
  const interval = setInterval(() => {
    let e = new Enemy(canvas.width, canvas.height);
  }, 1000);
}
// 총알 생성
function createBullet() {
  let b = new Bullet(spaceship.x, spaceship.y);
}

// 키입력 등록하기
let keysDown = {};
function setupKeyboardListnner() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];

    if (event.key === " ") {
      createBullet(); // 총알 생성
    }
  });
}

function update() {
  // 우주선의 움직임
  if ("ArrowRight" in keysDown) {
    if (spaceship.x + 60 < canvas.width) {
      spaceship.addX(5);
    }
  }
  if ("ArrowLeft" in keysDown) {
    if (spaceship.x > 0) {
      spaceship.addX(-5);
    }
  }
  if ("ArrowDown" in keysDown) {
    if (spaceship.y + 60 < canvas.height) {
      spaceship.addY(5);
    }
  }
  if ("ArrowUp" in keysDown) {
    if (spaceship.y > 0) {
      spaceship.addY(-5);
    }
  }

  // 총알의 움직임
  for (let i = 0; i < Bullet.bulletList?.length; i++) {
    if (Bullet.bulletList[i].alive) {
      Bullet.bulletList[i].update();
      Bullet.bulletList[i].checkHit();
    }
  }
  // 적군의 움직임
  for (let i = 0; i < Enemy.enemyList?.length; i++) {
    Enemy.enemyList[i].update();
  }
}

function render() {
  // 배경 그리기
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // 우주선 그리기
  ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y);
  // 스코어 그리기
  ctx.fillText(`Score:${Game.score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  // 총알 그리기
  for (let i = 0; i < Bullet.bulletList?.length; i++) {
    if (Bullet.bulletList[i].alive) {
      ctx.drawImage(
        bulletImage,
        Bullet.bulletList[i].x,
        Bullet.bulletList[i].y
      );
    }
  }
  // 적군 그리기
  for (let i = 0; i < Enemy.enemyList?.length; i++) {
    ctx.drawImage(enemyImage, Enemy.enemyList[i].x, Enemy.enemyList[i].y);
  }
  // 폭발 그리기
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
createEnemy();
setupKeyboardListnner();
main();

// backgroundImage.addEventListener("load", () => {
//   ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
// });

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 300, 300);
