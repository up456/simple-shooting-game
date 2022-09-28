'use strict';

class Game {
  static gameOver = false;
  static score = 0;

  createRetryBtn() {
    let button = document.createElement('button');
    button.width = 200;
    button.height = 80;
    button.innerText = '다시하기';
    button.style.cssText = `
        font-size: 25px;
        color: white;
        margin-left: 20px;
        cursor: pointer;
        background: black;
        position: fixed;
        top: 410px;
        left: 50%;
        transform: translateX(-70%);
    `;
    document.body.appendChild(button);

    button.addEventListener('click', function () {
      location.reload();
    });
  }
}

export default Game;
