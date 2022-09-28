"use strict";

class Game {
  static gameOver = false;
  static score = 0;

  createRetryBtn() {
    let button = document.createElement("button");
    button.width = 200;
    button.height = 80;
    button.innerText = "다시하기";
    button.style.cssText = `
        transform: translateY(-350px);
        font-size: 25px;
        margin-left: 20px;
    `;
    document.body.appendChild(button);

    button.addEventListener("click", function () {
      location.reload();
    });
  }
}

export default Game;
