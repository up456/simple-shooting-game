"use strict";

import Enemy from "./Enemy.js";
import Game from "./Game.js";

class Bullet {
  static bulletList = [];
  static explosionList = [];

  constructor(spaceshipX, spaceshipY) {
    this.x = spaceshipX + 12.5;
    this.y = spaceshipY;
    this.alive = true;
    Bullet.bulletList.push(this);
  }

  update() {
    this.y -= 7; // 총알 속도
  }

  checkHit() {
    for (let i = 0; i < Enemy.enemyList.length; i++) {
      if (
        this.y <= Enemy.enemyList[i].y &&
        this.y > 0 &&
        this.x >= Enemy.enemyList[i].x &&
        this.x <= Enemy.enemyList[i].x + 40
      ) {
        Game.score++;
        this.alive = false;
        Bullet.explosionList.push({
          x: Enemy.enemyList[i].x,
          y: Enemy.enemyList[i].y,
        });
        Enemy.enemyList.splice(i, 1);
      }
    }
  }
}

export default Bullet;
