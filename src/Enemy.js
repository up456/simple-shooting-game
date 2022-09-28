"use strict";

import Game from "./Game.js";

class Enemy {
  static enemyList = [];

  constructor(canvasWidth, canvasHeight) {
    this.x = generateRandomValue(0, canvasWidth - 50);
    this.y = 0;
    this.canvasHeight = canvasHeight;
    Enemy.enemyList.push(this);
  }

  update() {
    this.y += 2; // 적군 속도

    if (this.y >= this.canvasHeight - 50) {
      Game.gameOver = true;
    }
  }
}

export default Enemy;

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
